# FILE_INDEX.md — Índice de Archivos del Proyecto: Inventario

> **Última actualización:** 2026-08-30
> **Propósito:** Mapa navegable de todos los archivos del proyecto (Backend Modular Spring Boot + Frontend React 19 / Vite).

---

## Estructura General del Proyecto

```
inventario/
├── .gitignore                 ← Configuración de exclusiones de Git (diseño lógico, libros/docs, temporales)
├── .agents/                   ← Configuración de agentes, skills, reglas y auditoría
├── backend/                   ← API REST con Spring Boot 3.4 + Java 21 + JPA / H2
├── frontend/                  ← SPA con React 19 + Vite + Vanilla CSS
├── diseno_logico_inventario.xlsx ← Diseño lógico y de base de datos (ignorado en Git)
└── README.md                  ← Documentación general del repositorio
```

---

## 1. Backend (`backend/`)

```
backend/
├── pom.xml                                      ← Dependencias Maven (Spring Boot 3.4.2, Java 21, JPA, H2, Lombok)
├── mvnw / mvnw.cmd                              ← Maven Wrapper
├── HELP.md                                      ← Guía Spring Boot
└── src/
    ├── main/
    │   ├── resources/
    │   │   └── application.properties           ← Configuración de servidor (puerto 8088), H2 DB y JPA
    │   └── java/com/inventario/
    │       ├── InventarioBackendApplication.java ← Clase principal Spring Boot
    │       │
    │       ├── core/                            ← Componentes transversales
    │       │   ├── config/
    │       │   │   ├── CorsConfig.java          ← Configuración de seguridad CORS
    │       │   │   └── DataInitializer.java     ← Carga inicial de datos de prueba
    │       │   └── exception/
    │       │       ├── BadRequestException.java       ← Excepción HTTP 400
    │       │       ├── ResourceNotFoundException.java ← Excepción HTTP 404
    │       │       └── GlobalExceptionHandler.java    ← Manejo centralizado de excepciones REST
    │       │
    │       └── modules/                         ← 5 Módulos de Dominio (16 Tablas)
    │           │
    │           ├── catalogo/                    ← Módulo 1: Catálogo y Productos (6 tablas)
    │           │   ├── controller/
    │           │   │   ├── ColorController.java
    │           │   │   ├── MaterialController.java
    │           │   │   ├── ModeloController.java
    │           │   │   └── ProductoController.java
    │           │   ├── dto/
    │           │   │   └── ProductoRequestDto.java
    │           │   ├── model/
    │           │   │   ├── Color.java
    │           │   │   ├── DescuentoPorCantidad.java
    │           │   │   ├── ImagenProducto.java
    │           │   │   ├── Material.java
    │           │   │   ├── Modelo.java
    │           │   │   └── Producto.java
    │           │   ├── repository/
    │           │   │   ├── ColorRepository.java
    │           │   │   ├── DescuentoPorCantidadRepository.java
    │           │   │   ├── ImagenProductoRepository.java
    │           │   │   ├── MaterialRepository.java
    │           │   │   ├── ModeloRepository.java
    │           │   │   └── ProductoRepository.java
    │           │   └── service/
    │           │       ├── ColorService.java
    │           │       ├── MaterialService.java
    │           │       ├── ModeloService.java
    │           │       ├── ProductoService.java
    │           │       └── impl/
    │           │           ├── ColorServiceImpl.java
    │           │           ├── MaterialServiceImpl.java
    │           │           ├── ModeloServiceImpl.java
    │           │           └── ProductoServiceImpl.java
    │           │
    │           ├── inventario/                  ← Módulo 2: Stock y Movimientos (1 tabla)
    │           │   ├── controller/
    │           │   │   └── MovimientoStockController.java
    │           │   ├── dto/
    │           │   │   └── MovimientoStockRequestDto.java
    │           │   ├── model/
    │           │   │   ├── MovimientoStock.java
    │           │   │   └── TipoMovimiento.java
    │           │   ├── repository/
    │           │   │   └── MovimientoStockRepository.java
    │           │   └── service/
    │           │       ├── MovimientoStockService.java
    │           │       └── impl/
    │           │           └── MovimientoStockServiceImpl.java
    │           │
    │           ├── compras/                     ← Módulo 3: Proveedores y Compras (3 tablas)
    │           │   ├── controller/
    │           │   │   ├── CompraController.java
    │           │   │   └── ProveedorController.java
    │           │   ├── dto/
    │           │   │   ├── CompraRequestDto.java
    │           │   │   └── DetalleCompraRequestDto.java
    │           │   ├── model/
    │           │   │   ├── Compra.java
    │           │   │   ├── DetalleCompra.java
    │           │   │   ├── EstadoCompra.java
    │           │   │   └── Proveedor.java
    │           │   ├── repository/
    │           │   │   ├── CompraRepository.java
    │           │   │   ├── DetalleCompraRepository.java
    │           │   │   └── ProveedorRepository.java
    │           │   └── service/
    │           │       ├── CompraService.java
    │           │       ├── ProveedorService.java
    │           │       └── impl/
    │           │           ├── CompraServiceImpl.java
    │           │           └── ProveedorServiceImpl.java
    │           │
    │           ├── ventas/                      ← Módulo 4: Clientes y Ventas (3 tablas)
    │           │   ├── controller/
    │           │   │   ├── ClienteController.java
    │           │   │   └── VentaController.java
    │           │   ├── dto/
    │           │   │   ├── DetalleVentaRequestDto.java
    │           │   │   └── VentaRequestDto.java
    │           │   ├── model/
    │           │   │   ├── Cliente.java
    │           │   │   ├── DetalleVenta.java
    │           │   │   ├── EstadoVenta.java
    │           │   │   ├── MetodoPago.java
    │           │   │   └── Venta.java
    │           │   ├── repository/
    │           │   │   ├── ClienteRepository.java
    │           │   │   ├── DetalleVentaRepository.java
    │           │   │   └── VentaRepository.java
    │           │   └── service/
    │           │       ├── ClienteService.java
    │           │       ├── VentaService.java
    │           │       └── impl/
    │           │           ├── ClienteServiceImpl.java
    │           │           └── VentaServiceImpl.java
    │           │
    │           └── sistema/                     ← Módulo 5: Usuarios, Auditoría, Config y Dashboard (3 tablas)
    │               ├── controller/
    │               │   ├── BitacoraController.java
    │               │   ├── ConfiguracionController.java
    │               │   ├── DashboardController.java
    │               │   └── UsuarioController.java
    │               ├── dto/
    │               │   └── DashboardStatsDto.java
    │               ├── model/
    │               │   ├── Bitacora.java
    │               │   ├── Configuracion.java
    │               │   ├── RolUsuario.java
    │               │   └── Usuario.java
    │               ├── repository/
    │               │   ├── BitacoraRepository.java
    │               │   ├── ConfiguracionRepository.java
    │               │   └── UsuarioRepository.java
    │               └── service/
    │                   ├── BitacoraService.java
    │                   ├── ConfiguracionService.java
    │                   ├── DashboardService.java
    │                   ├── UsuarioService.java
    │                   └── impl/
    │                       ├── BitacoraServiceImpl.java
    │                       ├── ConfiguracionServiceImpl.java
    │                       ├── DashboardServiceImpl.java
    │                       └── UsuarioServiceImpl.java
    │
    └── test/java/com/inventario/                ← Pruebas Automatizadas
        ├── InventarioBackendApplicationTests.java
        └── modules/
            ├── catalogo/
            │   └── ProductoServiceTest.java     ← Tests unitarios de ProductoService
            └── ventas/
                └── VentaServiceTest.java        ← Tests de integración de VentaService
```

---

## 2. Frontend (`frontend/`)

```
frontend/
├── index.html                                   ← Punto de entrada HTML5
├── package.json                                 ← Dependencias (React 19, Vite 8, Lucide React, Oxlint)
├── vite.config.js                               ← Configuración del Bundler Vite
├── .oxlintrc.json                               ← Reglas de linter Oxlint
└── src/
    ├── main.jsx                                 ← Renderizado raíz de React
    ├── App.jsx                                  ← Componente principal y enrutador de vistas
    ├── App.css                                  ← Estilos de layout principal y barra de navegación
    ├── index.css                                ← Design System global (variables, componentes, tablas, botones)
    │
    ├── components/                              ← Componentes de UI
    │   ├── common/                              ← Kit de componentes UI reutilizables
    │   │   ├── Card.jsx                         ← Tarjeta contenedora con header, title y body
    │   │   ├── PageHeader.jsx                   ← Encabezado estructurado con título, subtítulo y acciones
    │   │   ├── AlertBanner.jsx                  ← Banners de aviso estructurados con iconos y estados
    │   │   ├── InputField.jsx                   ← Campo de entrada con validación, iconos y labels
    │   │   ├── SelectField.jsx                  ← Selector estilizado con opciones
    │   │   ├── TextAreaField.jsx                ← Área de texto auto-ajustable
    │   │   ├── Button.jsx                       ← Botón accesible con variantes y estados loading
    │   │   ├── Badge.jsx                        ← Etiquetas de estado
    │   │   ├── DataTable.jsx                    ← Tabla responsiva y vacía
    │   │   ├── StatCard.jsx                     ← Tarjeta de métricas e indicadores
    │   │   ├── Tabs.jsx                         ← Pestañas accesibles con conteo
    │   │   ├── Modal.jsx                        ← Modal accesible con tecla Escape y backdrop
    │   │   └── index.js                         ← Exportador unificado de common
    │   │
    │   ├── catalogos/                           ← Sub-componentes específicos de Catálogos
    │   │   ├── NuevoModeloForm.jsx              ← Formulario aislado para alta de modelos
    │   │   ├── NuevoMaterialForm.jsx            ← Formulario aislado para alta de materiales
    │   │   └── NuevoColorForm.jsx               ← Formulario aislado para alta de colores
    │   │
    │   ├── compras/                             ← Sub-componentes específicos de Compras
    │   │   ├── NuevaCompraForm.jsx              ← Formulario dinámico de órdenes de compra
    │   │   └── NuevoProveedorForm.jsx           ← Formulario aislado para alta de proveedores
    │   │
    │   ├── ventas/                              ← Sub-componentes específicos de Ventas
    │   │   ├── NuevaVentaPOSForm.jsx            ← Formulario de punto de venta (POS) y carrito
    │   │   └── NuevoClienteForm.jsx             ← Formulario aislado para alta de clientes
    │   │
    │   ├── productos/                           ← Sub-componentes específicos de Productos
    │   │   └── ProductoColumns.jsx              ← Definición desacoplada de columnas de tabla
    │   │
    │   ├── Sidebar.jsx                          ← Menú lateral con logo oficial de Los Caseritos
    │   ├── ProductoModal.jsx                    ← Modal para crear/editar productos
    │   ├── MovimientoModal.jsx                  ← Modal para registrar entradas/salidas de stock
    │   ├── StockModal.jsx                       ← Modal para ajuste rápido de inventario
    │   └── CategoriaModal.jsx                   ← Modal para gestión de catálogos auxiliares
    │
    ├── pages/                                   ← Vistas principales del sistema
    │   ├── DashboardView.jsx                    ← Panel de métricas e indicadores en tiempo real
    │   ├── ProductosView.jsx                    ← Listado, búsqueda, filtros y CRUD de productos
    │   ├── MovimientosView.jsx                  ← Historial de movimientos de stock (Kardex)
    │   ├── ComprasView.jsx                      ← Registro y consulta de compras a proveedores
    │   ├── VentasView.jsx                       ← Punto de venta, facturación y gestión de pedidos
    │   ├── CatalogosView.jsx                    ← Gestión de Modelos, Materiales y Colores
    │   ├── CategoriasView.jsx                   ← Vista unificada de categorías y atributos
    │   ├── DatabaseView.jsx                     ← Explorador y visor del esquema de BD
    │   └── BitacoraView.jsx                     ← Auditoría del sistema y registro de actividad
    │
    ├── assets/
    │   └── logo.png                             ← Logo oficial de Los Caseritos
    │
    ├── data/                                    ← Datasets, metadatos y mocks aislados
    │   ├── databaseSchema.js                    ← Esquema y metadatos de las 16 tablas
    │   ├── menuItems.js                         ← Configuración de rutas de navegación
    │   ├── paymentMethods.js                    ← Métodos de pago y estados
    │   ├── movementTypes.js                     ← Tipos de operación Kardex
    │   ├── mockData.js                          ← Datasets de prueba/mock para desarrollo
    │   └── index.js                             ← Exportador central de datos
    │
    └── services/
        └── api.js                               ← Cliente HTTP / Servicios de comunicación con el Backend
```

---

## 3. Control del Agente (`.agents/`)

```
.agents/
├── AGENTS.md                                    ← Guía operativa, reglas, arquitectura y workflow
├── FILE_INDEX.md                                ← Este archivo (índice integral del proyecto)
├── AUDIT_LOG.md                                 ← Historial y auditoría de tareas ejecutadas
└── skills/                                      ← Skills de arquitectura, código, UI, Git y SDD
    ├── clean-code/                              ← Principios SOLID y Código Limpio (Robert C. Martin)
    ├── ui-ux-usability/                         ← Usabilidad y Diseño Intuitivo (Steve Krug)
    ├── git-workflow/                            ← Control de versiones, Conventional Commits y ramas
    ├── spec-driven-development/                 ← Metodología SDD asistida por IA
    ├── spring-modular-backend/                  ← Arquitectura Package-by-Feature en Spring Boot 3
    ├── react-modern-frontend/                   ← Patrones de React 19, componentes y diseño UI
    └── libros/                                  ← Fuentes bibliográficas de referencia
        └── doc/
            ├── Codigo limpio - Robert Cecil Martin.pdf
            ├── feismo.com-no-me-hagas-pensar-pr_92d27deb83430b32f9ec290fa9d11656.pdf
            ├── git-github-fundamentos.pdf
            └── guide_10_1776854023.pdf
```

---

## Registro de Cambios de Archivos

| Fecha | Acción | Archivo | Módulo / Componente | Notas |
|---|---|---|---|---|
| 2026-08-30 | REFACTORIZADO | `com.inventario.*` | Backend Architecture | Migración completa a arquitectura modular de 5 paquetes (`catalogo`, `inventario`, `compras`, `ventas`, `sistema`) |
| 2026-08-30 | ACTUALIZADO | `FILE_INDEX.md` | .agents | Actualización total del índice de archivos adaptado a Inventario |
| 2026-08-30 | CREADO | `skills/*` | .agents/skills | Creación de skills basadas en la literatura de referencia y el stack del proyecto |
| 2026-08-30 | COMPONENTIZADO | `frontend/src/*` | Frontend UI / Design System | Creación de `components/common/`, paleta oficial de 5 colores del logo Los Caseritos y responsividad |
