package com.inventario.modules.inventario.dto;

import com.inventario.modules.inventario.model.TipoMovimiento;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimientoStockRequestDto {

    @NotNull(message = "El ID de la variante es obligatorio")
    private Long idVariante;

    private Long idUsuario;

    @NotNull(message = "El tipo de movimiento es obligatorio")
    private TipoMovimiento tipo;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a cero")
    private Integer cantidad;

    private String motivo;
}
