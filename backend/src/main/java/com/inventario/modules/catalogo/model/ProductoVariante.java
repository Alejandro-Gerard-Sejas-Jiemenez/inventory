package com.inventario.modules.catalogo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "producto_variantes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoVariante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_variante")
    private Long idVariante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    @JsonBackReference
    private Producto producto;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_modelo", nullable = false)
    @NotNull(message = "El modelo es obligatorio para la variante")
    private Modelo modelo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_color", nullable = false)
    @NotNull(message = "El color es obligatorio para la variante")
    private Color color;

    @NotBlank(message = "El SKU es obligatorio")
    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @NotNull(message = "El stock actual es obligatorio")
    @Min(value = 0, message = "El stock actual no puede ser negativo")
    @Column(name = "stock_actual", nullable = false)
    @Builder.Default
    private Integer stockActual = 0;

    @NotNull(message = "El stock mínimo es obligatorio")
    @Min(value = 0, message = "El stock mínimo no puede ser negativo")
    @Column(name = "stock_minimo", nullable = false)
    @Builder.Default
    private Integer stockMinimo = 5;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean activo = true;
}
