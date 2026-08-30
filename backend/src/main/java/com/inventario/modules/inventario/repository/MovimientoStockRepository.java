package com.inventario.modules.inventario.repository;

import com.inventario.modules.inventario.model.MovimientoStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovimientoStockRepository extends JpaRepository<MovimientoStock, Long> {
    List<MovimientoStock> findByProductoIdProductoOrderByFechaHoraDesc(Long idProducto);
    List<MovimientoStock> findTop50ByOrderByFechaHoraDesc();
}
