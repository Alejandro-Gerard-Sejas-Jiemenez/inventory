package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.ImagenProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagenProductoRepository extends JpaRepository<ImagenProducto, Long> {
    List<ImagenProducto> findByProductoIdProductoOrderByOrdenAsc(Long idProducto);
}
