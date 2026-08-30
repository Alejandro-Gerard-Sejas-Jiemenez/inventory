package com.inventario.modules.catalogo.service;

import com.inventario.modules.catalogo.model.Marca;

import java.util.List;

public interface MarcaService {
    List<Marca> listarTodas();
    Marca obtenerPorId(Long id);
    Marca guardar(Marca marca);
    void eliminar(Long id);
}
