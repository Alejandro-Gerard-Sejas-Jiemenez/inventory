package com.inventario.modules.compras.dto;

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
public class CompraRequestDto {

    @NotNull(message = "El ID del proveedor es obligatorio")
    private Long idProveedor;

    @NotNull(message = "El ID del usuario comprador es obligatorio")
    private Long idUsuario;

    private String observaciones;

    @NotEmpty(message = "La compra debe incluir al menos un producto")
    @Valid
    private List<DetalleCompraRequestDto> detalles;
}
