package com.inventario.modules.compras.repository;

import com.inventario.modules.compras.model.Compra;
import com.inventario.modules.compras.model.EstadoCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByProveedorIdProveedor(Long idProveedor);
    List<Compra> findByUsuarioIdUsuario(Long idUsuario);
    List<Compra> findByEstado(EstadoCompra estado);
    List<Compra> findTop50ByOrderByFechaCreacionDesc();
}
