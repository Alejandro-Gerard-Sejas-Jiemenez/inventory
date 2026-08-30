---
name: spring-modular-backend
description: Arquitectura y buenas prácticas en Spring Boot 3.4 y Java 21 con enfoque Modular (Package-by-Feature) y persistencia JPA/H2.
---

# Spring Boot Modular Backend — Guía de Arquitectura y Patrones

---

## 1. Arquitectura Package-by-Feature (Monolito Modular)

El backend de este proyecto organiza el código en torno a **conceptos de dominio y negocio**, evitando los paquetes planos monolíticos:

```
com.inventario.modules.<nombre_modulo>/
├── controller/       # @RestController, endpoints HTTP, @Valid, Swagger/OpenAPI
├── dto/              # Request / Response DTOs con anotaciones Jakarta Validation
├── model/            # @Entity JPA, Enums de dominio
├── repository/       # JpaRepository<T, ID>, consultas derivadas y @Query
└── service/          # Interfaces de servicio (Contratos de negocio)
    └── impl/         # @Service, @Transactional, implementaciones de negocio
```

Y el paquete transversal `core`:
```
com.inventario.core/
├── config/           # CorsConfig, DataInitializer
└── exception/        # GlobalExceptionHandler, BadRequestException, ResourceNotFoundException
```

---

## 2. Las 16 Tablas y su Distribución Canónica

| Módulo | Entidades JPA / Tablas | Responsabilidad del Dominio |
|---|---|---|
| **`catalogo`** | `Producto`, `Modelo`, `Material`, `Color`, `ImagenProducto`, `DescuentoPorCantidad` | Catálogo de productos, atributos variantes, fotos y reglas de descuento por volumen. |
| **`inventario`** | `MovimientoStock` (enum `TipoMovimiento`: `ENTRADA`, `SALIDA`, `AJUSTE`) | Kardex de movimientos, auditoría de stock antes/después y trazabilidad. |
| **`compras`** | `Proveedor`, `Compra`, `DetalleCompra` (enum `EstadoCompra`) | Adquisiciones de mercadería, recepción a proveedores y costeo de compra. |
| **`ventas`** | `Cliente`, `Venta`, `DetalleVenta` (enums `EstadoVenta`, `MetodoPago`) | Facturación, órdenes de venta, cálculo de subtotales, totales y métodos de pago. |
| **`sistema`** | `Usuario`, `Bitacora`, `Configuracion` (enum `RolUsuario`, `DashboardStatsDto`) | Gestión de cuentas, roles, bitácora de auditoría general, parámetros y métricas del dashboard. |

---

## 3. Patrones de Diseño Obligatorios en el Backend

### 1. Inyección de Dependencias por Constructor
```java
// ❌ NUNCA USAR ESTO (Inyección por campo)
@Autowired
private ProductoRepository productoRepository;

// ✅ OBLIGATORIO: Inyección por constructor con Lombok
@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository productoRepository;
    private final ModeloRepository modeloRepository;
    // ...
}
```

### 2. Contratos DTO con Jakarta Validation
```java
// ✅ DTO de Entrada con validaciones estrictas
@Data
public class ProductoRequestDto {
    @NotBlank(message = "El nombre del producto es obligatorio")
    private String nombre;

    @NotBlank(message = "El SKU es obligatorio")
    private String sku;

    @NotNull(message = "El precio unitario es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    private BigDecimal precioUnitario;

    @NotNull(message = "El stock mínimo es obligatorio")
    @Min(value = 0, message = "El stock mínimo no puede ser negativo")
    private Integer stockMinimo;

    @NotNull(message = "El modelo es obligatorio")
    private Long idModelo;
}
```

### 3. Controllers Limpios (Solo orquestación HTTP y validación)
```java
@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> crearProducto(@Valid @RequestBody ProductoRequestDto dto) {
        Producto nuevo = productoService.crearProducto(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }
}
```

### 4. Transaccionalidad Atómica (`@Transactional`)
* Operaciones que modifican múltiples entidades o descuentan inventario deben anotarse con `@Transactional`.
* Operaciones de solo lectura deben usar `@Transactional(readOnly = true)` para optimizar el contexto de persistencia de Hibernate.

---

## 4. Manejo de Errores con `GlobalExceptionHandler`

Todas las excepciones de negocio deben ser gestionadas centralmente:
* `ResourceNotFoundException` ➔ Devuelve JSON con código HTTP `404 Not Found`.
* `BadRequestException` ➔ Devuelve JSON con código HTTP `400 Bad Request`.
* `MethodArgumentNotValidException` ➔ Mapea automáticamente los errores de campos en un mapa `Map<String, String>` con status `400`.

---

## 5. Reglas de JPA y Base de Datos H2

1. **Relaciones Bidireccionales:** Evitar recursión infinita en serialización JSON usando `@JsonIgnoreProperties` o DTOs en lugar de serializar la entidad directamente.
2. **Consultas Personalizadas:** Usar nombres claros en Spring Data (`findBySkuIgnoreCase`, `findByActivoTrueAndStockActualLessThanEqualStockMinimo`) o `@Query` con parámetros nombrados.
3. **Inicialización de Datos:** Todo dato base (catálogo inicial, usuario administrador) debe configurarse limpiamente en [DataInitializer.java](file:///c:/Users/PERSONAL/Documents/AlejandroGerardSejas/inventario/backend/src/main/java/com/inventario/core/config/DataInitializer.java).
