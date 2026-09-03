package com.inventario.modules.ventas;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.*;
import com.inventario.modules.catalogo.repository.*;
import com.inventario.modules.catalogo.service.ProductoService;
import com.inventario.modules.inventario.model.MovimientoStock;
import com.inventario.modules.inventario.model.TipoMovimiento;
import com.inventario.modules.inventario.repository.MovimientoStockRepository;
import com.inventario.modules.sistema.model.Rol;
import com.inventario.modules.sistema.model.Usuario;
import com.inventario.modules.sistema.repository.RolRepository;
import com.inventario.modules.sistema.repository.UsuarioRepository;
import com.inventario.modules.ventas.dto.DetalleVentaRequestDto;
import com.inventario.modules.ventas.dto.VentaRequestDto;
import com.inventario.utils.TestMockDataFactory;
import com.inventario.modules.ventas.model.EstadoVenta;
import com.inventario.modules.ventas.model.MetodoPago;
import com.inventario.modules.ventas.model.Venta;
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
    private ProductoVarianteRepository productoVarianteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private MarcaRepository marcaRepository;
    @Autowired
    private ModeloRepository modeloRepository;
    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private MovimientoStockRepository movimientoStockRepository;

    private Usuario usuarioTest;
    private Rol rolTest;
    private Producto productoTest;
    private ProductoVariante varianteTest;

    @BeforeEach
    void setUp() {
        rolTest = rolRepository.save(TestMockDataFactory.crearRolVendedor());
        usuarioTest = usuarioRepository.save(TestMockDataFactory.crearUsuarioVendedor(rolTest));

        Categoria cat = categoriaRepository.save(Categoria.builder().nombre("Cat").build());
        Material mat = materialRepository.save(Material.builder().nombre("Mat").build());
        Marca marca = marcaRepository.save(Marca.builder().nombre("Marca").build());
        Modelo mod = modeloRepository.save(Modelo.builder().nombre("Mod").marca(marca).build());
        Color col = colorRepository.save(Color.builder().nombre("Col").codigoHex("#000").build());

        productoTest = productoService.create(TestMockDataFactory.crearProductoTest(cat.getIdCategoria(), mat.getIdMaterial(), mod.getIdModelo(), col.getIdColor()));
        varianteTest = productoTest.getVariantes().get(0);
    }

    @Test
    @DisplayName("Debe registrar una venta, calcular el total y descontar el stock")
    void testRegistrarVenta() {
        VentaRequestDto ventaDto = VentaRequestDto.builder()
                .idUsuario(usuarioTest.getIdUsuario())
                .metodoPago(MetodoPago.TRANSFERENCIA)
                .observaciones("Venta de prueba unitaria")
                .detalles(List.of(
                        DetalleVentaRequestDto.builder()
                                .idVariante(varianteTest.getIdVariante())
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
        ProductoVariante varActualizada = productoVarianteRepository.findById(varianteTest.getIdVariante()).orElseThrow();
        assertEquals(17, varActualizada.getStockActual());

        // Verificar registro de auditoría en movimientos
        List<MovimientoStock> movimientos = movimientoStockRepository.findByVarianteIdVarianteOrderByFechaHoraDesc(varianteTest.getIdVariante());
        assertFalse(movimientos.isEmpty());
        // El primer movimiento podría ser el registro inicial (ENTRADA) o la VENTA, como los ordenamos por fecha, el último debe ser la VENTA.
        assertTrue(movimientos.stream().anyMatch(m -> m.getTipo() == TipoMovimiento.VENTA && m.getCantidad() == 3));
    }
}
