package com.inventario.modules.catalogo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "imagenes_producto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImagenProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_imagen")
    private Long idImagen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    @NotNull
    @com.fasterxml.jackson.annotation.JsonBackReference
    private Producto producto;

    @NotBlank(message = "La URL de la imagen es obligatoria")
    @Column(nullable = false, length = 500)
    private String url;

    @Column(name = "es_principal")
    @Builder.Default
    private Boolean esPrincipal = false;

    @Builder.Default
    @Column(nullable = false)
    private Integer orden = 0;

    @Column(name = "fecha_creacion", updatable = false)
    private LocalDateTime fechaCreacion;

    @PrePersist
    protected void onCreate() {
        this.fechaCreacion = LocalDateTime.now();
    }
}
