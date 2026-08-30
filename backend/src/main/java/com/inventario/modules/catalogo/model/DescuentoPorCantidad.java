package com.inventario.modules.catalogo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "descuentos_por_cantidad")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DescuentoPorCantidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_descuento")
    private Long idDescuento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    @NotNull
    private Producto producto;

    @NotNull
    @Min(1)
    @Column(name = "cantidad_minima", nullable = false)
    private Integer cantidadMinima;

    @Column(name = "cantidad_maxima")
    private Integer cantidadMaxima;

    @DecimalMin("0.0")
    @Column(name = "descuento_fijo", precision = 10, scale = 2)
    private BigDecimal descuentoFijo;

    @DecimalMin("0.0")
    @Column(name = "descuento_porcentaje", precision = 5, scale = 2)
    private BigDecimal descuentoPorcentaje;

    @Builder.Default
    @Column(nullable = false)
    private Integer prioridad = 1;

    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;
}
