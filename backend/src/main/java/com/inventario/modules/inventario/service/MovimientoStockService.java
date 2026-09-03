package com.inventario.modules.inventario.service;


import com.inventario.modules.inventario.dto.MovimientoStockRequestDto;
import com.inventario.modules.inventario.model.MovimientoStock;
import java.util.List;

public interface MovimientoStockService {
    List<MovimientoStock> findAll();
    List<MovimientoStock> findByVariante(Long idVariante);
    MovimientoStock registrarMovimiento(MovimientoStockRequestDto request);
}
