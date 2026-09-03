package com.inventario.modules.ventas.dto;

import com.inventario.modules.ventas.model.MetodoPago;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VentaRequestDto {


    @NotNull(message = "El ID del usuario vendedor es obligatorio")
    private Long idUsuario;

    @Builder.Default
    private MetodoPago metodoPago = MetodoPago.EFECTIVO;

    private String observaciones;

    @NotEmpty(message = "La venta debe incluir al menos un producto")
    @Valid
    private List<DetalleVentaRequestDto> detalles;
}
