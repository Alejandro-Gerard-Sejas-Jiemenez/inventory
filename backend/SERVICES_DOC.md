# Documentación de Servicios del Backend

Este documento detalla todas las funciones expuestas por los servicios del backend agrupados por dominio de negocio (módulo). Por cada función se especifica el parámetro de entrada (Input), el valor de retorno (Output) y una breve descripción.

---

## 1. Módulo: Catálogo (`catalogo`)

### 1.1 `ProductoService`
Servicio encargado de gestionar el ciclo de vida de los productos en el catálogo.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `findAll()` | `void` | `List<Producto>` | Obtiene todos los productos del catálogo. |
| `findById(Long id)` | `Long id` | `Producto` | Busca un producto por su ID. Lanza excepción si no lo encuentra. |
| `create(ProductoRequestDto request)` | `ProductoRequestDto` | `Producto` | Crea un nuevo producto validando FKs (Categoría, Modelo, Color, Material). |
| `update(Long id, ProductoRequestDto request)` | `Long id`, `ProductoRequestDto` | `Producto` | Actualiza los datos y relaciones de un producto existente. |
| `delete(Long id)` | `Long id` | `void` | Elimina un producto lógicamente o físicamente según reglas de negocio. |
| `findByCategoria(Long idCategoria)` | `Long idCategoria` | `List<Producto>` | Lista los productos pertenecientes a una categoría específica. |
| `findBajoStock()` | `void` | `List<Producto>` | Devuelve los productos donde `stockActual <= stockMinimo`. |

*(Nota: Servicios homólogos existen para `CategoriaService`, `MarcaService`, `ModeloService`, `ColorService` y `MaterialService` con operaciones estándar de CRUD `findAll`, `findById`, `create`, `update`, `delete`)*.

---

## 2. Módulo: Compras (`compras`)

### 2.1 `CompraService`
Gestiona la recepción de nueva mercancía y el aumento de inventario.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `findAll()` | `void` | `List<Compra>` | Retorna el historial de compras realizadas. |
| `findById(Long id)` | `Long id` | `Compra` | Obtiene una compra y sus detalles. |
| `registrarCompra(CompraRequestDto request)` | `CompraRequestDto` | `Compra` | Registra una nueva compra, sus detalles y **aumenta el stock** de los productos recibidos. Registra la auditoría en `MovimientoStock`. |

### 2.2 `ProveedorService`
Gestión de proveedores.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `findAll()` | `void` | `List<Proveedor>` | Lista todos los proveedores activos. |
| `findById(Long id)` | `Long id` | `Proveedor` | Busca un proveedor por su identificador. |
| `create(Proveedor request)` | `Proveedor` | `Proveedor` | Crea un nuevo proveedor en el sistema. |
| `update(Long id, Proveedor request)`| `Long id`, `Proveedor`| `Proveedor` | Actualiza la información de contacto de un proveedor. |

---

## 3. Módulo: Inventario (`inventario`)

### 3.1 `MovimientoStockService`
Registro de auditoría inmutable de los cambios de stock.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `obtenerHistorialPorProducto(Long idProducto)` | `Long idProducto` | `List<MovimientoStock>` | Devuelve todos los movimientos (entradas y salidas) que ha sufrido un producto. |
| `registrarMovimiento(MovimientoRequestDto req)`| `MovimientoRequestDto` | `MovimientoStock` | Uso interno. Crea un registro de auditoría tras cada Venta, Compra o Ajuste Manual, guardando el `stockAntes` y el `stockDespues`. |

---

## 4. Módulo: Ventas (`ventas`)

### 4.1 `VentaService`
Gestión del flujo de ventas y caja.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `findAll()` | `void` | `List<Venta>` | Lista las ventas completadas ordenadas por fecha. |
| `findById(Long id)` | `Long id` | `Venta` | Obtiene el detalle completo de una venta específica. |
| `registrarVenta(VentaRequestDto request)` | `VentaRequestDto` | `Venta` | Valida stock suficiente, calcula el Total de la venta, **descuenta el stock** de los productos vendidos y crea registros en `MovimientoStock` y `Bitacora`. |
| `cancelarVenta(Long id)` | `Long id` | `void` | Marca la venta como `CANCELADA` y **devuelve el stock** de los productos a la bodega. |

---

## 5. Módulo: Sistema (`sistema`)

### 5.1 `UsuarioService`
Gestión de usuarios y autenticación.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `findAll()` | `void` | `List<Usuario>` | Lista todos los usuarios del sistema. |
| `findById(Long id)` | `Long id` | `Usuario` | Busca un usuario. |
| `create(Usuario request)` | `Usuario` | `Usuario` | Crea un usuario y asocia su rol correspondiente (`Rol`). |

### 5.2 `DashboardService`
Estadísticas generales de la aplicación.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `getStats()` | `void` | `DashboardStatsDto` | Cuenta y calcula totales (productos, modelos, proveedores, ventas, alertas de bajo stock, valorización total del inventario). |

### 5.3 `BitacoraService`
Registro de logs y acciones de usuario.

| Función / Método | Input | Output | Descripción |
|---|---|---|---|
| `registrar(...)` | `Usuario, String accion, String modulo...` | `void` | Crea un registro inmutable en el historial de acciones operativas por temas de seguridad. |
| `obtenerUltimosMovimientos()` | `void` | `List<Bitacora>` | Trae el feed de actividades recientes del sistema. |
