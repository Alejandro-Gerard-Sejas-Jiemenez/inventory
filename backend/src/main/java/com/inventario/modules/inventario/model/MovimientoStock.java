package com.inventario.modules.inventario.model;

import com.inventario.modules.catalogo.model.ProductoVariante;
import com.inventario.modules.sistema.model.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimientos_stock")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MovimientoStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private Long idMovimiento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_variante", nullable = false)
    @NotNull(message = "La variante del producto es obligatoria")
    private ProductoVariante variante;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @NotNull(message = "El tipo de movimiento es obligatorio")
    private TipoMovimiento tipo;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser mayor a cero")
    @Column(nullable = false)
    private Integer cantidad;

    @Column(name = "stock_antes", nullable = false)
    private Integer stockAntes;

    @Column(name = "stock_despues", nullable = false)
    private Integer stockDespues;

    @Column(length = 255)
    private String motivo;

    @Column(name = "fecha_hora", updatable = false)
    private LocalDateTime fechaHora;

    @PrePersist
    protected void onCreate() {
        if (this.fechaHora == null) {
            this.fechaHora = LocalDateTime.now();
        }
    }
}
