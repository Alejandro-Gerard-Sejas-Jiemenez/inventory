package com.inventario.modules.compras.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "proveedores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Long idProveedor;

    @NotBlank(message = "El nombre del proveedor es obligatorio")
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String nombre;

    @Size(max = 100)
    @Column(length = 100)
    private String contacto;

    @Size(max = 30)
    @Column(length = 30)
    private String telefono;

    @Size(max = 100)
    @Column(length = 100)
    private String email;

    @Size(max = 255)
    @Column(length = 255)
    private String direccion;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean activo = true;
}
