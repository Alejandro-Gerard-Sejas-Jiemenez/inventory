package com.inventario.modules.sistema.service.impl;

import com.inventario.modules.catalogo.repository.ModeloRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.compras.repository.ProveedorRepository;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.dto.DashboardStatsDto;
import com.inventario.modules.sistema.service.DashboardService;
import com.inventario.modules.ventas.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProductoRepository productoRepository;
    private final ModeloRepository modeloRepository;
    private final ProveedorRepository proveedorRepository;
    private final VentaRepository ventaRepository;
    private final MovimientoStockRepository movimientoStockRepository;

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDto getStats() {
        long totalProductos = productoRepository.count();
        long totalModelos = modeloRepository.count();
        long totalProveedores = proveedorRepository.count();
        long totalVentas = ventaRepository.count();
        long productosBajoStock = productoRepository.countProductosConBajoStock();
        Double valorTotal = productoRepository.calculateValorTotalInventario();
        Double totalVentasMonto = ventaRepository.calculateTotalVentasCompletadas();
        long totalMovimientos = movimientoStockRepository.count();

        return DashboardStatsDto.builder()
                .totalProductos(totalProductos)
                .totalModelos(totalModelos)
                .totalProveedores(totalProveedores)
                .totalVentas(totalVentas)
                .productosBajoStock(productosBajoStock)
                .valorTotalInventario(valorTotal != null ? valorTotal : 0.0)
                .totalVentasMonto(totalVentasMonto != null ? totalVentasMonto : 0.0)
                .totalMovimientos(totalMovimientos)
                .build();
    }
}
