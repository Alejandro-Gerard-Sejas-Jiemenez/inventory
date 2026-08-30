package com.inventario.modules.sistema.repository;

import com.inventario.modules.sistema.model.Bitacora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BitacoraRepository extends JpaRepository<Bitacora, Long> {
    List<Bitacora> findTop100ByOrderByFechaHoraDesc();
    List<Bitacora> findByTablaAfectada(String tablaAfectada);
}
