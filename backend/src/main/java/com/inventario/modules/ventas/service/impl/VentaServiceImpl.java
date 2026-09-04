package com.inventario.modules.ventas.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.ProductoVariante;
import com.inventario.modules.catalogo.repository.ProductoVarianteRepository;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.sistema.service.BitacoraService;
import com.inventario.modules.ventas.dto.DetalleVentaRequestDto;
import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.modules.ventas.model.DetalleVenta;
import com.inventario.modules.ventas.model.EstadoVenta;
import com.inventario.modules.ventas.model.MetodoPago;
import com.inventario.modules.ventas.model.Venta;
import com.inventario.modules.ventas.repository.VentaRepository;
import com.inventario.modules.ventas.service.VentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaServiceImpl implements VentaService {

    private final VentaRepository ventaRepository;
    private final ProductoVarianteRepository varianteRepository;
    private final UsuarioRepository usuarioRepository;
    private final MovimientoStockRepository movimientoStockRepository;
    private final BitacoraService bitacoraService;

    @Override
    @Transactional(readOnly = true)
    public List<Venta> findAll() {
        return ventaRepository.findTop50ByOrderByFechaCreacionDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Venta findById(Long id) {
        return ventaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + id));
    }

    @Override
    @Transactional
    public Venta registrarVenta(VentaRequestDto request) {
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario vendedor no encontrado con ID: " + request.getIdUsuario()));

        Venta venta = Venta.builder()
                .usuario(usuario)
                .fecha(LocalDate.now())
                .hora(LocalTime.now())
                .estado(EstadoVenta.COMPLETADA)
                .metodoPago(request.getMetodoPago() != null ? request.getMetodoPago() : MetodoPago.EFECTIVO)
                .observaciones(request.getObservaciones())
                .detalles(new ArrayList<>())
                .build();

        BigDecimal totalVenta = BigDecimal.ZERO;

        for (DetalleVentaRequestDto item : request.getDetalles()) {
            ProductoVariante variante = varianteRepository.findById(item.getIdVariante())
                    .orElseThrow(() -> new ResourceNotFoundException("Variante no encontrada con ID: " + item.getIdVariante()));

            if (variante.getStockActual() < item.getCantidad()) {
                throw new BadRequestException("Stock insuficiente para '" + variante.getProducto().getNombre() + "'. Stock actual: " + variante.getStockActual() + ", solicitado: " + item.getCantidad());
            }

            BigDecimal precioUnitario = item.getPrecioUnitario();
            if (precioUnitario == null) {
                if ("MAYOREO".equalsIgnoreCase(item.getTipoPrecio()) 
                        && variante.getProducto().getPrecioMayoreo() != null 
                        && variante.getProducto().getPrecioMayoreo().compareTo(BigDecimal.ZERO) > 0) {
                    precioUnitario = variante.getProducto().getPrecioMayoreo();
                } else {
                    precioUnitario = variante.getProducto().getPrecioUnitario();
                }
            }

            BigDecimal subtotal = precioUnitario.multiply(BigDecimal.valueOf(item.getCantidad()));
            totalVenta = totalVenta.add(subtotal);

            // Descontar stock
            int stockAntes = variante.getStockActual();
            int stockDespues = stockAntes - item.getCantidad();
            variante.setStockActual(stockDespues);
            varianteRepository.save(variante);

            // Registrar movimiento de auditoría
            MovimientoStock movimiento = MovimientoStock.builder()
                    .variante(variante)
                    .usuario(usuario)
                    .tipo(TipoMovimiento.VENTA)
                    .cantidad(item.getCantidad())
                    .stockAntes(stockAntes)
                    .stockDespues(stockDespues)
                    .motivo("Venta realizada a cliente General")
                    .build();
            movimientoStockRepository.save(movimiento);

            // Añadir detalle a la venta
            DetalleVenta detalle = DetalleVenta.builder()
                    .venta(venta)
                    .variante(variante)
                    .cantidad(item.getCantidad())
                    .precioUnitario(precioUnitario)
                    .subtotal(subtotal)
                    .tipoPrecio(item.getTipoPrecio() != null ? item.getTipoPrecio() : "UNITARIO")
                    .build();

            venta.getDetalles().add(detalle);
        }

        venta.setTotal(totalVenta);
        Venta savedVenta = ventaRepository.save(venta);

        // Registro en Bitácora
        bitacoraService.registrar(
                usuario,
                "REGISTRAR_VENTA",
                "ventas",
                savedVenta.getIdVenta(),
                "Venta #" + savedVenta.getIdVenta() + " registrada por total de $" + savedVenta.getTotal(),
                "127.0.0.1"
        );

        return savedVenta;
    }

    @Override
    @Transactional
    public void cancelarVenta(Long id) {
        cambiarEstado(id, EstadoVenta.CANCELADA, null);
    }

    @Override
    @Transactional
    public Venta cambiarEstado(Long id, EstadoVenta nuevoEstado, Long idUsuario) {
        Venta venta = findById(id);

        if (Boolean.TRUE.equals(venta.getEstadoModificado())) {
            throw new BadRequestException("El estado de la Venta #" + id + " ya fue modificado previamente (" + venta.getEstado() + ") y se encuentra bloqueado.");
        }

        if (venta.getEstado() == nuevoEstado) {
            throw new BadRequestException("La venta ya se encuentra en estado " + nuevoEstado);
        }

        EstadoVenta estadoAnterior = venta.getEstado();
        Usuario usuarioAccion = (idUsuario != null) 
                ? usuarioRepository.findById(idUsuario).orElse(venta.getUsuario())
                : venta.getUsuario();

        // Transición a CANCELADA: devolver stock
        if (nuevoEstado == EstadoVenta.CANCELADA) {
            for (DetalleVenta d : venta.getDetalles()) {
                ProductoVariante prod = d.getVariante();
                int stockAntes = prod.getStockActual();
                int stockDespues = stockAntes + d.getCantidad();
                prod.setStockActual(stockDespues);
                varianteRepository.save(prod);

                MovimientoStock movimiento = MovimientoStock.builder()
                        .variante(prod)
                        .usuario(usuarioAccion)
                        .tipo(TipoMovimiento.DEVOLUCION)
                        .cantidad(d.getCantidad())
                        .stockAntes(stockAntes)
                        .stockDespues(stockDespues)
                        .motivo("Cancelación de venta #" + venta.getIdVenta())
                        .build();
                movimientoStockRepository.save(movimiento);
            }
        }
        // Transición de CANCELADA a COMPLETADA: volver a descontar stock
        else if (estadoAnterior == EstadoVenta.CANCELADA && nuevoEstado == EstadoVenta.COMPLETADA) {
            for (DetalleVenta d : venta.getDetalles()) {
                ProductoVariante prod = d.getVariante();
                if (prod.getStockActual() < d.getCantidad()) {
                    throw new BadRequestException("Stock insuficiente para reactivar la venta #" + venta.getIdVenta() + ". Disponible: " + prod.getStockActual() + ", Requerido: " + d.getCantidad());
                }
                int stockAntes = prod.getStockActual();
                int stockDespues = stockAntes - d.getCantidad();
                prod.setStockActual(stockDespues);
                varianteRepository.save(prod);

                MovimientoStock movimiento = MovimientoStock.builder()
                        .variante(prod)
                        .usuario(usuarioAccion)
                        .tipo(TipoMovimiento.VENTA)
                        .cantidad(d.getCantidad())
                        .stockAntes(stockAntes)
                        .stockDespues(stockDespues)
                        .motivo("Reactivación de venta #" + venta.getIdVenta())
                        .build();
                movimientoStockRepository.save(movimiento);
            }
        }

        venta.setEstado(nuevoEstado);
        venta.setEstadoModificado(true);
        Venta savedVenta = ventaRepository.save(venta);

        bitacoraService.registrar(
                usuarioAccion,
                "CAMBIO_ESTADO_VENTA",
                "ventas",
                savedVenta.getIdVenta(),
                "Estado de Venta #" + savedVenta.getIdVenta() + " cambiado de " + estadoAnterior + " a " + nuevoEstado + " (Bloqueo de cambio único activado)",
                "127.0.0.1"
        );

        return savedVenta;
    }
}

