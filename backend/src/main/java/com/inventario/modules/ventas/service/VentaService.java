package com.inventario.modules.ventas.service;


import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.modules.ventas.model.Venta;
import java.util.List;

public interface VentaService {
    List<Venta> findAll();
    Venta findById(Long id);
    Venta registrarVenta(VentaRequestDto request);
    void cancelarVenta(Long id);
}
