package com.inventario.modules.catalogo.service;

import com.inventario.modules.catalogo.model.Propietario;
import java.util.List;

public interface PropietarioService {
    List<Propietario> findAll();
    List<Propietario> findAllActivos();
    Propietario findById(Long id);
    Propietario save(Propietario propietario);
    Propietario update(Long id, Propietario propietario);
    void delete(Long id); // Logical delete
    void restaurar(Long id); // Logical restore
}
