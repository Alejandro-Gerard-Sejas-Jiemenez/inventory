package com.inventario.modules.ventas;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.Producto;
import com.inventario.modules.catalogo.repository.ProductoRepository;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.model.RolUsuario;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.ventas.dto.DetalleVentaRequestDto;
import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.modules.ventas.model.Cliente;
import com.inventario.modules.ventas.model.EstadoVenta;
import com.inventario.modules.ventas.model.MetodoPago;
import com.inventario.modules.ventas.model.Venta;
import com.inventario.modules.ventas.repository.ClienteRepository;
import com.inventario.modules.ventas.service.VentaService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class VentaServiceTest {

    @Autowired
    private VentaService ventaService;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private MovimientoStockRepository movimientoStockRepository;

    private Usuario usuarioTest;
    private Cliente clienteTest;
    private Producto productoTest;

    @BeforeEach
    void setUp() {
        usuarioTest = usuarioRepository.save(Usuario.builder()
                .nombre("Vendedor Test")
                .email("vendedor.test@inventario.com")
                .password("123456")
                .rol(RolUsuario.VENDEDOR)
                .activo(true)
                .build());

        clienteTest = clienteRepository.save(Cliente.builder()
                .nombre("Cliente Test")
                .email("cliente.test@empresa.com")
                .activo(true)
                .build());

        productoTest = productoService.create(ProductoRequestDto.builder()
                .sku("SKU-VENTA-TEST")
                .nombre("Monitor 27 Pulgadas")
                .stockActual(20)
                .stockMinimo(5)
                .precioCompra(new BigDecimal("180.00"))
                .precioUnitario(new BigDecimal("250.00"))
                .activo(true)
                .build());
    }

    @Test
    @DisplayName("Debe registrar una venta, calcular el total y descontar el stock")
    void testRegistrarVenta() {
        VentaRequestDto ventaDto = VentaRequestDto.builder()
                .idUsuario(usuarioTest.getIdUsuario())
                .idCliente(clienteTest.getIdCliente())
                .metodoPago(MetodoPago.TRANSFERENCIA)
                .observaciones("Venta de prueba unitaria")
                .detalles(List.of(
                        DetalleVentaRequestDto.builder()
                                .idProducto(productoTest.getIdProducto())
                                .cantidad(3)
                                .precioUnitario(new BigDecimal("250.00"))
                                .build()
                ))
                .build();

        Venta venta = ventaService.registrarVenta(ventaDto);

        assertNotNull(venta.getIdVenta());
        assertEquals(0, new BigDecimal("750.00").compareTo(venta.getTotal()));
        assertEquals(EstadoVenta.COMPLETADA, venta.getEstado());

        // Verificar que el stock se descontó (20 - 3 = 17)
        Producto prodActualizado = productoRepository.findById(productoTest.getIdProducto()).orElseThrow();
        assertEquals(17, prodActualizado.getStockActual());

        // Verificar registro de auditoría en movimientos
        List<MovimientoStock> movimientos = movimientoStockRepository.findByProductoIdProductoOrderByFechaHoraDesc(productoTest.getIdProducto());
        assertFalse(movimientos.isEmpty());
        assertEquals(TipoMovimiento.VENTA, movimientos.get(0).getTipo());
        assertEquals(3, movimientos.get(0).getCantidad());
    }
}
