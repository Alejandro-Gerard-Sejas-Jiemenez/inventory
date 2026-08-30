package com.inventario.modules.catalogo;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.model.Color;
import com.inventario.modules.catalogo.model.Material;
import com.inventario.modules.catalogo.model.Modelo;
import com.inventario.modules.catalogo.model.Producto;
import com.inventario.modules.catalogo.repository.ColorRepository;
import com.inventario.modules.catalogo.repository.MaterialRepository;
import com.inventario.modules.catalogo.repository.ModeloRepository;
import com.inventario.modules.catalogo.repository.ProductoRepository;
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
    private ModeloRepository modeloRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ColorRepository colorRepository;

    private Modelo modeloTest;
    private Material materialTest;
    private Color colorTest;

    @BeforeEach
    void setUp() {
        modeloTest = modeloRepository.save(Modelo.builder()
                .nombre("Modelo Test")
                .marca("Marca Test")
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
                .sku("TEST-SKU-001")
                .nombre("Producto de Prueba")
                .descripcion("Descripción de prueba")
                .idModelo(modeloTest.getIdModelo())
                .idMaterial(materialTest.getIdMaterial())
                .idColor(colorTest.getIdColor())
                .stockActual(15)
                .stockMinimo(5)
                .precioCompra(new BigDecimal("100.00"))
                .precioUnitario(new BigDecimal("150.00"))
                .activo(true)
                .build();

        Producto creado = productoService.create(dto);

        assertNotNull(creado.getIdProducto());
        assertEquals("TEST-SKU-001", creado.getSku());
        assertEquals(15, creado.getStockActual());
        assertEquals("Modelo Test", creado.getModelo().getNombre());
        assertEquals("Material Test", creado.getMaterial().getNombre());
        assertEquals("Color Test", creado.getColor().getNombre());
    }

    @Test
    @DisplayName("Debe listar productos con bajo stock")
    void testBuscarBajoStock() {
        productoService.create(ProductoRequestDto.builder()
                .sku("TEST-LOW-STOCK")
                .nombre("Producto Critico")
                .idModelo(modeloTest.getIdModelo())
                .stockActual(2)
                .stockMinimo(5)
                .precioCompra(new BigDecimal("50.00"))
                .precioUnitario(new BigDecimal("90.00"))
                .activo(true)
                .build());

        List<Producto> bajoStock = productoService.findLowStock();
        assertFalse(bajoStock.isEmpty());
        assertTrue(bajoStock.stream().anyMatch(p -> p.getSku().equals("TEST-LOW-STOCK")));
    }
}
