package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findBySkuIgnoreCase(String sku);
    boolean existsBySkuIgnoreCase(String sku);
    boolean existsBySkuIgnoreCaseAndIdProductoNot(String sku, Long idProducto);

    List<Producto> findByActivoTrue();
    List<Producto> findByModeloIdModelo(Long idModelo);
    List<Producto> findByMaterialIdMaterial(Long idMaterial);
    List<Producto> findByColorIdColor(Long idColor);

    @Query("SELECT p FROM Producto p WHERE p.activo = true AND (LOWER(p.nombre) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Producto> searchByNombreOrSku(String query);

    @Query("SELECT p FROM Producto p WHERE p.activo = true AND p.stockActual <= p.stockMinimo")
    List<Producto> findProductosConBajoStock();

    @Query("SELECT COUNT(p) FROM Producto p WHERE p.activo = true AND p.stockActual <= p.stockMinimo")
    long countProductosConBajoStock();

    @Query("SELECT COALESCE(SUM(p.stockActual * p.precioUnitario), 0) FROM Producto p WHERE p.activo = true")
    Double calculateValorTotalInventario();
}
