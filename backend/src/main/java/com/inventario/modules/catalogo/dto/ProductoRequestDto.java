package com.inventario.modules.catalogo.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoRequestDto {

    @NotNull(message = "La categoría es obligatoria")
    private Long idCategoria;
    private Long idMaterial;
    private Long idPropietario;

    @NotBlank(message = "El nombre del producto es obligatorio")
    private String nombre;

    private String descripcion;

    @NotNull(message = "El precio de compra es obligatorio")
    @DecimalMin(value = "0.0", message = "El precio de compra no puede ser negativo")
    private BigDecimal precioCompra;

    private BigDecimal precioMayoreo;

    @NotNull(message = "El precio unitario es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio unitario debe ser mayor a 0")
    private BigDecimal precioUnitario;

    @Builder.Default
    private Boolean activo = true;

    @Valid
    @Builder.Default
    private List<ProductoVarianteDto> variantes = new ArrayList<>();

    @Builder.Default
    private List<String> imagenesUrls = new ArrayList<>();
}
