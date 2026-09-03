package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByActivoTrue();
    List<Producto> findByMaterialIdMaterial(Long idMaterial);
    List<Producto> findDistinctByVariantesModeloIdModelo(Long idModelo);

    @Query("SELECT DISTINCT p FROM Producto p LEFT JOIN p.variantes v WHERE p.activo = true AND (LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(v.sku) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Producto> searchByNombreOrSku(String query);

    @Query("SELECT DISTINCT p FROM Producto p JOIN p.variantes v WHERE p.activo = true AND v.stockActual <= v.stockMinimo")
    List<Producto> findProductosConBajoStock();

    @Query("SELECT COUNT(v) FROM ProductoVariante v WHERE v.producto.activo = true AND v.stockActual <= v.stockMinimo")
    long countProductosConBajoStock();

    @Query("SELECT COALESCE(SUM(v.stockActual * p.precioUnitario), 0) FROM ProductoVariante v JOIN v.producto p WHERE p.activo = true AND v.activo = true")
    Double calculateValorTotalInventario();
}
