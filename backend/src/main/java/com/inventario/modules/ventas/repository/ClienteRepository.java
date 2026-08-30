package com.inventario.modules.ventas.repository;

import com.inventario.modules.ventas.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    List<Cliente> findByActivoTrue();
    Optional<Cliente> findByEmailIgnoreCase(String email);
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
}
