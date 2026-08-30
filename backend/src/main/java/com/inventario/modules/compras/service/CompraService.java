package com.inventario.modules.compras.service;


import com.inventario.modules.compras.dto.CompraRequestDto;
import com.inventario.modules.compras.model.Compra;
import java.util.List;

public interface CompraService {
    List<Compra> findAll();
    Compra findById(Long id);
    Compra registrarCompra(CompraRequestDto request);
}
