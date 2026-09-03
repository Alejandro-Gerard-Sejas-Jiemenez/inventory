package com.inventario.modules.catalogo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "colores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Color {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_color")
    private Long idColor;

    @NotBlank(message = "El nombre del color es obligatorio")
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String nombre;

    @Size(max = 20)
    @Column(name = "codigo_hex", length = 20)
    private String codigoHex;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean activo = true;
}
