package com.inventario.modules.compras.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.ProductoVariante;
import com.inventario.modules.catalogo.repository.ProductoVarianteRepository;
import com.inventario.modules.compras.dto.CompraRequestDto;
import com.inventario.modules.compras.dto.DetalleCompraRequestDto;
import com.inventario.modules.compras.model.Compra;
import com.inventario.modules.compras.model.DetalleCompra;
import com.inventario.modules.compras.model.EstadoCompra;
import com.inventario.modules.compras.model.Proveedor;
import com.inventario.modules.compras.repository.CompraRepository;
import com.inventario.modules.compras.repository.ProveedorRepository;
import com.inventario.modules.compras.service.CompraService;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.sistema.service.BitacoraService;
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
public class CompraServiceImpl implements CompraService {

    private final CompraRepository compraRepository;
    private final ProductoVarianteRepository varianteRepository;
    private final ProveedorRepository proveedorRepository;
    private final UsuarioRepository usuarioRepository;
    private final MovimientoStockRepository movimientoStockRepository;
    private final BitacoraService bitacoraService;

    @Override
    @Transactional(readOnly = true)
    public List<Compra> findAll() {
        return compraRepository.findTop50ByOrderByFechaCreacionDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public Compra findById(Long id) {
        return compraRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Compra no encontrada con ID: " + id));
    }

    @Override
    @Transactional
    public Compra registrarCompra(CompraRequestDto request) {
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + request.getIdUsuario()));

        Proveedor proveedor = proveedorRepository.findById(request.getIdProveedor())
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con ID: " + request.getIdProveedor()));

        Compra compra = Compra.builder()
                .usuario(usuario)
                .proveedor(proveedor)
                .fecha(LocalDate.now())
                .hora(LocalTime.now())
                .estado(EstadoCompra.RECIBIDA)
                .observaciones(request.getObservaciones())
                .detalles(new ArrayList<>())
                .build();

        BigDecimal totalCompra = BigDecimal.ZERO;

        for (DetalleCompraRequestDto item : request.getDetalles()) {
            ProductoVariante variante = varianteRepository.findById(item.getIdVariante())
                    .orElseThrow(() -> new ResourceNotFoundException("Variante no encontrada con ID: " + item.getIdVariante()));

            BigDecimal subtotal = item.getPrecioCompra().multiply(BigDecimal.valueOf(item.getCantidad()));
            totalCompra = totalCompra.add(subtotal);

            int stockAntes = variante.getStockActual();
            int stockDespues = stockAntes + item.getCantidad();
            variante.setStockActual(stockDespues);
            variante.getProducto().setPrecioCompra(item.getPrecioCompra());
            varianteRepository.save(variante);

            MovimientoStock movimiento = MovimientoStock.builder()
                    .variante(variante)
                    .usuario(usuario)
                    .tipo(TipoMovimiento.COMPRA)
                    .cantidad(item.getCantidad())
                    .stockAntes(stockAntes)
                    .stockDespues(stockDespues)
                    .motivo("Compra a proveedor " + proveedor.getNombre())
                    .build();
            movimientoStockRepository.save(movimiento);

            DetalleCompra detalle = DetalleCompra.builder()
                    .compra(compra)
                    .variante(variante)
                    .cantidad(item.getCantidad())
                    .precioCompra(item.getPrecioCompra())
                    .subtotal(subtotal)
                    .build();

            compra.getDetalles().add(detalle);
        }

        compra.setTotal(totalCompra);
        Compra savedCompra = compraRepository.save(compra);

        bitacoraService.registrar(
                usuario,
                "REGISTRAR_COMPRA",
                "compras",
                savedCompra.getIdCompra(),
                "Compra #" + savedCompra.getIdCompra() + " a proveedor " + proveedor.getNombre() + " por $" + savedCompra.getTotal(),
                "127.0.0.1"
        );

        return savedCompra;
    }

    @Override
    @Transactional
    public Compra cambiarEstado(Long id, EstadoCompra nuevoEstado, Long idUsuario) {
        Compra compra = findById(id);

        if (Boolean.TRUE.equals(compra.getEstadoModificado())) {
            throw new BadRequestException("El estado de la Compra #" + id + " ya fue modificado previamente (" + compra.getEstado() + ") y se encuentra bloqueado.");
        }

        if (compra.getEstado() == nuevoEstado) {
            throw new BadRequestException("La compra ya se encuentra en estado " + nuevoEstado);
        }

        EstadoCompra estadoAnterior = compra.getEstado();
        Usuario usuarioAccion = (idUsuario != null)
                ? usuarioRepository.findById(idUsuario).orElse(compra.getUsuario())
                : compra.getUsuario();

        // Transición a CANCELADA: descontar el stock recibido previamente
        if (nuevoEstado == EstadoCompra.CANCELADA) {
            for (DetalleCompra d : compra.getDetalles()) {
                ProductoVariante prod = d.getVariante();
                int stockAntes = prod.getStockActual();
                int stockDespues = Math.max(0, stockAntes - d.getCantidad());
                prod.setStockActual(stockDespues);
                varianteRepository.save(prod);

                MovimientoStock movimiento = MovimientoStock.builder()
                        .variante(prod)
                        .usuario(usuarioAccion)
                        .tipo(TipoMovimiento.SALIDA)
                        .cantidad(d.getCantidad())
                        .stockAntes(stockAntes)
                        .stockDespues(stockDespues)
                        .motivo("Cancelación de compra #" + compra.getIdCompra())
                        .build();
                movimientoStockRepository.save(movimiento);
            }
        }
        // Transición de CANCELADA a RECIBIDA: reincorporar stock de la compra
        else if (estadoAnterior == EstadoCompra.CANCELADA && nuevoEstado == EstadoCompra.RECIBIDA) {
            for (DetalleCompra d : compra.getDetalles()) {
                ProductoVariante prod = d.getVariante();
                int stockAntes = prod.getStockActual();
                int stockDespues = stockAntes + d.getCantidad();
                prod.setStockActual(stockDespues);
                varianteRepository.save(prod);

                MovimientoStock movimiento = MovimientoStock.builder()
                        .variante(prod)
                        .usuario(usuarioAccion)
                        .tipo(TipoMovimiento.COMPRA)
                        .cantidad(d.getCantidad())
                        .stockAntes(stockAntes)
                        .stockDespues(stockDespues)
                        .motivo("Reactivación de compra #" + compra.getIdCompra())
                        .build();
                movimientoStockRepository.save(movimiento);
            }
        }

        compra.setEstado(nuevoEstado);
        compra.setEstadoModificado(true);
        Compra savedCompra = compraRepository.save(compra);

        bitacoraService.registrar(
                usuarioAccion,
                "CAMBIO_ESTADO_COMPRA",
                "compras",
                savedCompra.getIdCompra(),
                "Estado de Compra #" + savedCompra.getIdCompra() + " cambiado de " + estadoAnterior + " a " + nuevoEstado + " (Bloqueo de cambio único activado)",
                "127.0.0.1"
        );

        return savedCompra;
    }
}

