package com.inventario.modules.ventas.repository;

import com.inventario.modules.ventas.model.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Long> {
    List<DetalleVenta> findByVentaIdVenta(Long idVenta);
    List<DetalleVenta> findByProductoIdProducto(Long idProducto);
}
