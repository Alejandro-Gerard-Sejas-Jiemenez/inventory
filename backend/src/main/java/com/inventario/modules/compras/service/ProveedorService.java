package com.inventario.modules.compras.service;


import com.inventario.modules.compras.model.Proveedor;
import java.util.List;

public interface ProveedorService {
    List<Proveedor> findAll();
    Proveedor findById(Long id);
    Proveedor create(Proveedor proveedor);
    Proveedor update(Long id, Proveedor proveedor);
    void delete(Long id);
}
