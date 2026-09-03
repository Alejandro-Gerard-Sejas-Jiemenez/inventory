package com.inventario.modules.compras.service.impl;

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
            // Actualizar el precio de compra del producto padre? o de la variante?
            // Dejemos el update de precio de compra en el producto padre para despues si es necesario
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
}
