package com.inventario.modules.catalogo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoVarianteDto {

    private Long idVariante;
    
    @NotNull(message = "El modelo es obligatorio para la variante")
    private Long idModelo;
    
    @NotNull(message = "El color es obligatorio para la variante")
    private Long idColor;

    private String sku; // Si es nulo, el backend debería generarlo

    @NotNull(message = "El stock actual es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Builder.Default
    private Integer stockActual = 0;

    @Min(value = 0, message = "El stock mínimo no puede ser negativo")
    @Builder.Default
    private Integer stockMinimo = 5;

    @Builder.Default
    private Boolean activo = true;
}
