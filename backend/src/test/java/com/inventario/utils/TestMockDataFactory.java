package com.inventario.utils;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.catalogo.dto.ProductoVarianteDto;
import com.inventario.modules.sistema.model.Rol;
import com.inventario.modules.sistema.model.Usuario;

import java.math.BigDecimal;
import java.util.List;

public class TestMockDataFactory {

    public static Rol crearRolVendedor() {
        return Rol.builder()
                .nombre("VENDEDOR_TEST")
                .descripcion("Rol para ventas de prueba")
                .build();
    }

    public static Usuario crearUsuarioVendedor(Rol rol) {
        return Usuario.builder()
                .nombre("Vendedor Test")
                .email("vendedor.test@inventario.com")
                .password("123456")
                .rol(rol)
                .activo(true)
                .build();
    }

    public static ProductoRequestDto crearProductoTest(Long idCategoria, Long idMaterial, Long idModelo, Long idColor) {
        return ProductoRequestDto.builder()
                .nombre("Monitor 27 Pulgadas")
                .idCategoria(idCategoria)
                .idMaterial(idMaterial)
                .precioCompra(new BigDecimal("180.00"))
                .precioUnitario(new BigDecimal("250.00"))
                .activo(true)
                .variantes(List.of(
                        ProductoVarianteDto.builder()
                                .sku("SKU-VENTA-TEST")
                                .idModelo(idModelo)
                                .idColor(idColor)
                                .stockActual(20)
                                .stockMinimo(5)
                                .build()
                ))
                .build();
    }
}
