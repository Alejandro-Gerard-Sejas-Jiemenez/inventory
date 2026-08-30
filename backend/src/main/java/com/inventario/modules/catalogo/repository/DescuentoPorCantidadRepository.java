package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.DescuentoPorCantidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DescuentoPorCantidadRepository extends JpaRepository<DescuentoPorCantidad, Long> {
    List<DescuentoPorCantidad> findByProductoIdProductoAndActivoTrueOrderByPrioridadDesc(Long idProducto);
}
