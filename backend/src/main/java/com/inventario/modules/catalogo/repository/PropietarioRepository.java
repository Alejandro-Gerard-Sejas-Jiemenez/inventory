package com.inventario.modules.catalogo.repository;

import com.inventario.modules.catalogo.model.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropietarioRepository extends JpaRepository<Propietario, Long> {
    List<Propietario> findByActivoTrue();
    Optional<Propietario> findByNombreIgnoreCase(String nombre);
}
