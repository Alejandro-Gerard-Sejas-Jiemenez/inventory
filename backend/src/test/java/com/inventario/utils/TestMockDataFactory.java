package com.inventario.utils;

import com.inventario.modules.catalogo.dto.ProductoRequestDto;
import com.inventario.modules.sistema.model.Rol;
import com.inventario.modules.sistema.model.Usuario;

import java.math.BigDecimal;

public class TestMockDataFactory {

    public static Rol crearRolVendedor() {
        return Rol.builder()
                .nombre("VENDEDOR")
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

    public static ProductoRequestDto crearProductoTest() {
        return ProductoRequestDto.builder()
                .sku("SKU-VENTA-TEST")
                .nombre("Monitor 27 Pulgadas")
                .stockActual(20)
                .stockMinimo(5)
                .precioCompra(new BigDecimal("180.00"))
                .precioUnitario(new BigDecimal("250.00"))
                .activo(true)
                .build();
    }
}
