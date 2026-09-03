package com.inventario.modules.catalogo.service;


import com.inventario.modules.catalogo.model.Material;
import java.util.List;

public interface MaterialService {
    List<Material> findAll();
    Material findById(Long id);
    Material create(Material material);
    Material update(Long id, Material material);
    void delete(Long id);
    void restaurar(Long id);
}
