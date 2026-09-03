package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.ProductoVariante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ProductoVarianteRepository extends JpaRepository<ProductoVariante, Long> {
    Optional<ProductoVariante> findBySku(String sku);
    boolean existsBySku(String sku);
    List<ProductoVariante> findByProducto_IdProducto(Long idProducto);
}
