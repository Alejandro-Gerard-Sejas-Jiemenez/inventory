package com.inventario.modules.inventario.service.impl;

import com.inventario.core.exception.BadRequestException;
import com.inventario.core.exception.ResourceNotFoundException;
import com.inventario.modules.catalogo.model.ProductoVariante;
import com.inventario.modules.catalogo.repository.ProductoVarianteRepository;
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
    private final ProductoVarianteRepository varianteRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoStock> findAll() {
        return movimientoStockRepository.findTop50ByOrderByFechaHoraDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<MovimientoStock> findByVariante(Long idVariante) {
        return movimientoStockRepository.findByVarianteIdVarianteOrderByFechaHoraDesc(idVariante);
    }

    @Override
    @Transactional
    public MovimientoStock registrarMovimiento(MovimientoStockRequestDto request) {
        ProductoVariante variante = varianteRepository.findById(request.getIdVariante())
                .orElseThrow(() -> new ResourceNotFoundException("Variante no encontrada con ID: " + request.getIdVariante()));

        Usuario usuario = null;
        if (request.getIdUsuario() != null) {
            usuario = usuarioRepository.findById(request.getIdUsuario()).orElse(null);
        }

        int stockAntes = variante.getStockActual();
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

        variante.setStockActual(stockDespues);
        varianteRepository.save(variante);

        MovimientoStock movimiento = MovimientoStock.builder()
                .variante(variante)
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
