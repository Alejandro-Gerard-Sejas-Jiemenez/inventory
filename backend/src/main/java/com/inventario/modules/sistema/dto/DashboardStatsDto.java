package com.inventario.modules.sistema.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDto {
    private long totalProductos;
    private long totalModelos;
    private long totalProveedores;
    private long totalClientes;
    private long totalVentas;
    private long productosBajoStock;
    private double valorTotalInventario;
    private double totalVentasMonto;
    private long totalMovimientos;
}
