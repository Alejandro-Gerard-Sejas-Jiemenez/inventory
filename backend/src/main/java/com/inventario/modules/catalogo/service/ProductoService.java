package com.inventario.modules.catalogo.service;


import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    List<Producto> findByModelo(Long idModelo);
    List<Producto> search(String query);
    List<Producto> findLowStock();
    Producto create(ProductoRequestDto request);
    Producto update(Long id, ProductoRequestDto request);
    void delete(Long id);
}
