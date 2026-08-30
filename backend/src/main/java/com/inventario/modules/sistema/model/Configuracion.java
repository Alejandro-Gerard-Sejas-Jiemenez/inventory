package com.inventario.modules.sistema.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "configuracion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Configuracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_config")
    private Long idConfig;

    @NotBlank(message = "La clave de configuración es obligatoria")
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String clave;

    @NotBlank(message = "El valor de configuración es obligatorio")
    @Size(max = 500)
    @Column(nullable = false, length = 500)
    private String valor;

    @Size(max = 255)
    @Column(length = 255)
    private String descripcion;
}
