package com.inventario.modules.catalogo.service;


import com.inventario.modules.catalogo.model.Color;
import java.util.List;

public interface ColorService {
    List<Color> findAll();
    Color findById(Long id);
    Color create(Color color);
    Color update(Long id, Color color);
    void delete(Long id);
    void restaurar(Long id);
}
