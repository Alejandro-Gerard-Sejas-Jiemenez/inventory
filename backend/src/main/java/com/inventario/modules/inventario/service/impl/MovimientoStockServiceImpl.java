package com.inventario.modules.inventario.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.Producto;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.inventario.dto.MovimientoStockRequestDto;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.inventario.service.MovimientoStockService;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoStockServiceImpl implements MovimientoStockService {

    private final MovimientoStockRepository movimientoStockRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoStock> findAll() {
        return movimientoStockRepository.findTop50ByOrderByFechaHoraDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoStock> findByProducto(Long idProducto) {
        return movimientoStockRepository.findByProductoIdProductoOrderByFechaHoraDesc(idProducto);
    }

    @Override
    @Transactional
    public MovimientoStock registrarMovimiento(MovimientoStockRequestDto request) {
        Producto producto = productoRepository.findById(request.getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + request.getIdProducto()));

        Usuario usuario = null;
        if (request.getIdUsuario() != null) {
            usuario = usuarioRepository.findById(request.getIdUsuario()).orElse(null);
        }

        int stockAntes = producto.getStockActual();
        int stockDespues = stockAntes;

        if (request.getTipo() == TipoMovimiento.ENTRADA) {
            stockDespues = stockAntes + request.getCantidad();
        } else if (request.getTipo() == TipoMovimiento.SALIDA) {
            if (stockAntes < request.getCantidad()) {
                throw new BadRequestException("Stock insuficiente. Stock actual: " + stockAntes + ", solicitado: " + request.getCantidad());
            }
            stockDespues = stockAntes - request.getCantidad();
        } else if (request.getTipo() == TipoMovimiento.AJUSTE) {
            stockDespues = request.getCantidad();
        }

        producto.setStockActual(stockDespues);
        productoRepository.save(producto);

        MovimientoStock movimiento = MovimientoStock.builder()
                .producto(producto)
                .usuario(usuario)
                .tipo(request.getTipo())
                .cantidad(request.getCantidad())
                .stockAntes(stockAntes)
                .stockDespues(stockDespues)
                .motivo(request.getMotivo() != null && !request.getMotivo().isBlank() ? request.getMotivo() : "Movimiento manual de " + request.getTipo())
                .build();

        return movimientoStockRepository.save(movimiento);
    }
}
