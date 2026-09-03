package com.inventario.modules.catalogo;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.dto.ProductoVarianteDto;
import com.inventario.modules.catalogo.model.*;
import com.inventario.modules.catalogo.repository.*;
import com.inventario.modules.catalogo.service.ProductoService;
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
class ProductoServiceTest {

    @Autowired
    private ProductoService productoService;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ModeloRepository modeloRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ColorRepository colorRepository;

    private Marca marcaTest;
    private Categoria categoriaTest;
    private Modelo modeloTest;
    private Material materialTest;
    private Color colorTest;

    @BeforeEach
    void setUp() {
        marcaTest = marcaRepository.save(Marca.builder()
                .nombre("Marca Test")
                .build());

        categoriaTest = categoriaRepository.save(Categoria.builder()
                .nombre("Categoria Test")
                .descripcion("Categoria de prueba")
                .build());

        modeloTest = modeloRepository.save(Modelo.builder()
                .nombre("Modelo Test")
                .marca(marcaTest)
                .activo(true)
                .build());

        materialTest = materialRepository.save(Material.builder()
                .nombre("Material Test")
                .activo(true)
                .build());

        colorTest = colorRepository.save(Color.builder()
                .nombre("Color Test")
                .codigoHex("#123456")
                .activo(true)
                .build());
    }

    @Test
    @DisplayName("Debe crear un producto correctamente con sus relaciones")
    void testCrearProducto() {
        ProductoRequestDto dto = ProductoRequestDto.builder()
                .nombre("Producto de Prueba")
                .descripcion("Descripción de prueba")
                .idCategoria(categoriaTest.getIdCategoria())
                .idMaterial(materialTest.getIdMaterial())
                .precioCompra(new BigDecimal("100.00"))
                .precioUnitario(new BigDecimal("150.00"))
                .activo(true)
                .variantes(List.of(
                        ProductoVarianteDto.builder()
                                .sku("TEST-SKU-001")
                                .idModelo(modeloTest.getIdModelo())
                                .idColor(colorTest.getIdColor())
                                .stockActual(15)
                                .stockMinimo(5)
                                .build()
                ))
                .build();

        Producto creado = productoService.create(dto);

        assertNotNull(creado.getIdProducto());
        assertEquals(1, creado.getVariantes().size());
        assertEquals("TEST-SKU-001", creado.getVariantes().get(0).getSku());
        assertEquals(15, creado.getVariantes().get(0).getStockActual());
        assertNotNull(creado.getCategoria());
        assertEquals("Categoria Test", creado.getCategoria().getNombre());
        assertEquals("Modelo Test", creado.getVariantes().get(0).getModelo().getNombre());
        assertEquals("Marca Test", creado.getVariantes().get(0).getModelo().getMarca().getNombre());
        assertEquals("Material Test", creado.getMaterial().getNombre());
        assertEquals("Color Test", creado.getVariantes().get(0).getColor().getNombre());
    }

    @Test
    @DisplayName("Debe listar productos con bajo stock")
    void testBuscarBajoStock() {
        productoService.create(ProductoRequestDto.builder()
                .nombre("Producto Critico")
                .idCategoria(categoriaTest.getIdCategoria())
                .precioCompra(new BigDecimal("50.00"))
                .precioUnitario(new BigDecimal("90.00"))
                .activo(true)
                .variantes(List.of(
                        ProductoVarianteDto.builder()
                                .sku("TEST-LOW-STOCK")
                                .idModelo(modeloTest.getIdModelo())
                                .idColor(colorTest.getIdColor())
                                .stockActual(2)
                                .stockMinimo(5)
                                .build()
                ))
                .build());

        List<Producto> bajoStock = productoService.findLowStock();
        assertFalse(bajoStock.isEmpty());
        assertTrue(bajoStock.stream().anyMatch(p -> p.getVariantes().stream().anyMatch(v -> v.getSku().equals("TEST-LOW-STOCK"))));
    }
}
