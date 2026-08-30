# Sistema de Gestión de Inventario (Spring Boot 3 + React)

Sistema empresarial de gestión de inventario desarrollado bajo la arquitectura desacoplada **Modelo - Vista - Controlador (MVC)**, conectando un backend robusto en **Spring Boot 3 (Java 21)** con un frontend interactivo en **React (Vite)** y persistencia relacional con **Spring Data JPA** y base de datos **H2**.

---

## 🏛️ Arquitectura del Sistema (MVC Desacoplado)

```text
inventario/
├── backend/                              # MODELO & CONTROLADORES (Spring Boot 3 + Java 21)
│   ├── src/main/java/com/inventario/
│   │   ├── model/                        # MODELO: Entidades JPA relacionales
│   │   │   ├── Producto.java
│   │   │   ├── Categoria.java
│   │   │   ├── MovimientoStock.java
│   │   │   └── TipoMovimiento.java
│   │   ├── repository/                   # Spring Data JPA Repositories
│   │   │   ├── ProductoRepository.java
│   │   │   ├── CategoriaRepository.java
│   │   │   └── MovimientoStockRepository.java
│   │   ├── service/                      # Lógica de Negocio y Transacciones
│   │   ├── controller/                   # CONTROLADORES: REST Endpoints (@RestController)
│   │   │   ├── ProductoController.java
│   │   │   ├── CategoriaController.java
│   │   │   ├── MovimientoStockController.java
│   │   │   └── DashboardController.java
│   │   └── config/
│   │       ├── CorsConfig.java
│   │       └── DataInitializer.java     # Seeder de datos iniciales
│   └── src/main/resources/
│       └── application.properties        # Configuración H2 y JPA
│
└── frontend/                             # VISTA (React + Vite + Modern CSS)
    ├── src/
    │   ├── components/                   # Sidebar, Modales de creación y stock
    │   ├── pages/                        # Dashboard, Productos, Categorías, Movimientos
    │   ├── services/api.js               # Cliente HTTP hacia Spring Boot (:8088)
    │   ├── index.css                     # Sistema de diseño y estilos modernos
    │   └── App.jsx                       # Orquestación de vistas y estado global
```

---

## 🚀 Cómo ejecutar el proyecto

### 1. Iniciar el Backend (Spring Boot)
Abre una terminal en la carpeta `backend`:
```powershell
cd backend
.\mvnw.cmd spring-boot:run
```
- **API Base**: `http://localhost:8088/api`
- **Consola H2 Database**: `http://localhost:8088/h2-console` (JDBC URL: `jdbc:h2:file:./data/inventariodb`, Usuario: `sa`, Contraseña vacía)

### 2. Iniciar el Frontend (React)
Abre otra terminal en la carpeta `frontend`:
```powershell
cd frontend
npm run dev
```
- **Frontend App**: `http://localhost:5173`

---

## 🌟 Funcionalidades Implementadas

1. **Dashboard con Métricas en Tiempo Real**:
   - Total de productos, valor monetario del inventario, categorías registradas y alertas de bajo stock.
   - Alertas críticas automáticas para productos con stock menor o igual al umbral mínimo.
   - Resumen de últimos movimientos de auditoría.
2. **Gestión de Productos (CRUD Completo)**:
   - Crear, editar y eliminar productos con validación de código SKU único.
   - Filtros instantáneos por categoría, texto de búsqueda y filtro de stock crítico.
3. **Control y Auditoría de Stock**:
   - Modal de acciones rápidas para registrar **Entradas**, **Salidas** y **Ajustes** de inventario.
   - Historial detallado con fecha, cantidad, stock anterior y stock resultante.
4. **Gestión de Categorías**:
   - Creación y edición con conteo dinámico de productos vinculados.
   - Protección contra eliminación accidental si la categoría tiene productos asignados.
# inventory
