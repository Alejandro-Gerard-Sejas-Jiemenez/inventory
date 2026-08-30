package com.inventario.modules.catalogo.service;

import com.inventario.modules.catalogo.model.Categoria;

import java.util.List;

public interface CategoriaService {
    List<Categoria> listarTodas();
    Categoria obtenerPorId(Long id);
    Categoria guardar(Categoria categoria);
    void eliminar(Long id);
}
