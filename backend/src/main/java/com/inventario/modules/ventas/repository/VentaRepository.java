package com.inventario.modules.ventas.repository;

import com.inventario.modules.ventas.model.EstadoVenta;
import com.inventario.modules.ventas.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByUsuarioIdUsuario(Long idUsuario);
    List<Venta> findByEstado(EstadoVenta estado);
    List<Venta> findByFechaBetweenOrderByFechaDescHoraDesc(LocalDate inicio, LocalDate fin);
    List<Venta> findTop50ByOrderByFechaCreacionDesc();

    @Query("SELECT COALESCE(SUM(v.total), 0) FROM Venta v WHERE v.estado = 'COMPLETADA'")
    Double calculateTotalVentasCompletadas();
}
