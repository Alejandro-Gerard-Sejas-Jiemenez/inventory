package com.inventario.modules.ventas.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Producto;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.sistema.service.BitacoraService;
import com.inventario.modules.ventas.dto.DetalleVentaRequestDto;
import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.modules.ventas.model.Cliente;
import com.inventario.modules.ventas.model.DetalleVenta;
import com.inventario.modules.ventas.model.EstadoVenta;
import com.inventario.modules.ventas.model.MetodoPago;
import com.inventario.modules.ventas.model.Venta;
import com.inventario.modules.ventas.repository.ClienteRepository;
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
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
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

        Cliente cliente = null;
        if (request.getIdCliente() != null) {
            cliente = clienteRepository.findById(request.getIdCliente())
                    .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con ID: " + request.getIdCliente()));
        }

        Venta venta = Venta.builder()
                .usuario(usuario)
                .cliente(cliente)
                .fecha(LocalDate.now())
                .hora(LocalTime.now())
                .estado(EstadoVenta.COMPLETADA)
                .metodoPago(request.getMetodoPago() != null ? request.getMetodoPago() : MetodoPago.EFECTIVO)
                .observaciones(request.getObservaciones())
                .detalles(new ArrayList<>())
                .build();

        BigDecimal totalVenta = BigDecimal.ZERO;

        for (DetalleVentaRequestDto item : request.getDetalles()) {
            Producto producto = productoRepository.findById(item.getIdProducto())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + item.getIdProducto()));

            if (producto.getStockActual() < item.getCantidad()) {
                throw new BadRequestException("Stock insuficiente para '" + producto.getNombre() + "'. Stock actual: " + producto.getStockActual() + ", solicitado: " + item.getCantidad());
            }

            BigDecimal precioUnitario = item.getPrecioUnitario() != null
                    ? item.getPrecioUnitario()
                    : producto.getPrecioUnitario();

            BigDecimal subtotal = precioUnitario.multiply(BigDecimal.valueOf(item.getCantidad()));
            totalVenta = totalVenta.add(subtotal);

            // Descontar stock del producto
            int stockAntes = producto.getStockActual();
            int stockDespues = stockAntes - item.getCantidad();
            producto.setStockActual(stockDespues);
            productoRepository.save(producto);

            // Registrar movimiento de auditoría
            MovimientoStock movimiento = MovimientoStock.builder()
                    .producto(producto)
                    .usuario(usuario)
                    .tipo(TipoMovimiento.VENTA)
                    .cantidad(item.getCantidad())
                    .stockAntes(stockAntes)
                    .stockDespues(stockDespues)
                    .motivo("Venta realizada a cliente " + (cliente != null ? cliente.getNombre() : "General"))
                    .build();
            movimientoStockRepository.save(movimiento);

            // Añadir detalle a la venta
            DetalleVenta detalle = DetalleVenta.builder()
                    .venta(venta)
                    .producto(producto)
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
        Venta venta = findById(id);
        if (venta.getEstado() == EstadoVenta.CANCELADA) {
            throw new BadRequestException("La venta ya se encuentra cancelada");
        }

        // Devolver stock de cada producto
        for (DetalleVenta d : venta.getDetalles()) {
            Producto prod = d.getProducto();
            int stockAntes = prod.getStockActual();
            int stockDespues = stockAntes + d.getCantidad();
            prod.setStockActual(stockDespues);
            productoRepository.save(prod);

            MovimientoStock movimiento = MovimientoStock.builder()
                    .producto(prod)
                    .usuario(venta.getUsuario())
                    .tipo(TipoMovimiento.DEVOLUCION)
                    .cantidad(d.getCantidad())
                    .stockAntes(stockAntes)
                    .stockDespues(stockDespues)
                    .motivo("Cancelación de venta #" + venta.getIdVenta())
                    .build();
            movimientoStockRepository.save(movimiento);
        }

        venta.setEstado(EstadoVenta.CANCELADA);
        ventaRepository.save(venta);

        bitacoraService.registrar(
                venta.getUsuario(),
                "CANCELAR_VENTA",
                "ventas",
                venta.getIdVenta(),
                "Venta #" + venta.getIdVenta() + " fue cancelada y el stock fue reincorporado",
                "127.0.0.1"
        );
    }
}
