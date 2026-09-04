package com.inventario.modules.compras.service;

import com.inventario.modules.compras.dto.CompraRequestDto;
import com.inventario.modules.compras.model.Compra;
import com.inventario.modules.compras.model.EstadoCompra;
import java.util.List;

public interface CompraService {
    List<Compra> findAll();
    Compra findById(Long id);
    Compra registrarCompra(CompraRequestDto request);
    Compra cambiarEstado(Long id, EstadoCompra nuevoEstado, Long idUsuario);
}

