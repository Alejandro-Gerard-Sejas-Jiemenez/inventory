package com.inventario.modules.catalogo.service;


import com.inventario.modules.catalogo.model.Modelo;
import java.util.List;

public interface ModeloService {
    List<Modelo> findAll();
    Modelo findById(Long id);
    Modelo create(Modelo modelo);
    Modelo update(Long id, Modelo modelo);
    void delete(Long id);
}
