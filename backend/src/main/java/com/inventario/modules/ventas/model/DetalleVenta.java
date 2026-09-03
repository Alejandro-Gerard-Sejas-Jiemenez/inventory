package com.inventario.modules.ventas.model;

import com.inventario.modules.catalogo.model.ProductoVariante;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "detalle_ventas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_venta", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    @NotNull
    private Venta venta;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_variante", nullable = false)
    @NotNull
    private ProductoVariante variante;

    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer cantidad;

    @NotNull
    @DecimalMin("0.01")
    @Column(name = "precio_unitario", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioUnitario;

    @NotNull
    @DecimalMin("0.00")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "tipo_precio", length = 50)
    @Builder.Default
    private String tipoPrecio = "UNITARIO"; // UNITARIO, MAYOREO, DESCUENTO
}
