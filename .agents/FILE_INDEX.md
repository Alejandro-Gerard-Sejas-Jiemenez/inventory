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
├── SERVICES_DOC.md                              ← Documentación técnica de las funciones de Servicios
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
    │           ├── catalogo/                    ← Módulo 1: Catálogo y Productos (8 tablas)
    │           │   ├── controller/
    │           │   │   ├── CategoriaController.java
    │           │   │   ├── ColorController.java
    │           │   │   ├── MarcaController.java
    │           │   │   ├── MaterialController.java
    │           │   │   ├── ModeloController.java
    │           │   │   └── ProductoController.java
    │           │   ├── dto/
    │           │   │   └── ProductoRequestDto.java
    │           │   ├── model/
    │           │   │   ├── Categoria.java
    │           │   │   ├── Color.java
    │           │   │   ├── ImagenProducto.java
    │           │   │   ├── Marca.java
    │           │   │   ├── Material.java
    │           │   │   ├── Modelo.java
    │           │   │   └── Producto.java
    │           │   ├── repository/
    │           │   │   ├── CategoriaRepository.java
    │           │   │   ├── ColorRepository.java
    │           │   │   ├── ImagenProductoRepository.java
    │           │   │   ├── MarcaRepository.java
    │           │   │   ├── MaterialRepository.java
    │           │   │   ├── ModeloRepository.java
    │           │   │   └── ProductoRepository.java
    │           │   └── service/
    │           │       ├── CategoriaService.java
    │           │       ├── ColorService.java
    │           │       ├── MarcaService.java
    │           │       ├── MaterialService.java
    │           │       ├── ModeloService.java
    │           │       ├── ProductoService.java
    │           │       └── impl/
    │           │           ├── CategoriaServiceImpl.java
    │           │           ├── ColorServiceImpl.java
    │           │           ├── MarcaServiceImpl.java
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
    │               │   ├── DashboardStatsDto.java
    │               │   └── LoginRequestDto.java
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
        ├── utils/
        │   └── TestMockDataFactory.java         ← Factoría de datos mock (Usuarios, Productos) para test
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
    ├── hooks/                                   ← Custom Hooks desacoplados por responsabilidad (SRP)
    │   ├── useAuth.js                           ← Gestión de sesión y autenticación de administradores
    │   ├── useCart.js                           ← Estado del carrito de compras, tope de stock y subtotales
    │   └── useInventoryData.js                  ← Sincronización y mutaciones CRUD de datos maestros de inventario
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
    │   │   ├── DataTable.jsx                    ← Tabla responsiva con paginación integrada y búsqueda en tiempo real
    │   │   ├── Pagination.jsx                   ← Paginador numérico con selector de filas por página
    │   │   ├── StatCard.jsx                     ← Tarjeta de métricas e indicadores
    │   │   ├── Tabs.jsx                         ← Pestañas accesibles con conteo
    │   │   ├── Modal.jsx                        ← Modal accesible con tecla Escape y backdrop
    │   │   └── index.js                         ← Exportador unificado de common
    │   │
    │   ├── tienda/                              ← Componentes de la Tienda de Clientes (E-commerce)
    │   │   ├── TiendaHeader.jsx                 ← Encabezado con branding, toggle de tema y accesos
    │   │   ├── TiendaCategoryNav.jsx            ← Pestañas de categorías estilo Airbnb
    │   │   ├── TiendaSearchCapsule.jsx          ← Cápsula de búsqueda segmentada y filtros de marca/orden
    │   │   ├── TiendaFooter.jsx                 ← Pie de página minimalista
    │   │   ├── ProductoCard.jsx                 ← Tarjeta e-commerce con física táctil y discos puros de color
    │   │   ├── ProductoDetalleModal.jsx         ← Modal de detalle de producto para clientes (galería, variantes, precio unitario)
    │   │   ├── CarritoDrawer.jsx                ← Drawer lateral deslizante de carrito con tope de stock
    │   │   ├── CarritoItem.jsx                  ← Fila individual de producto en la bolsa de pedidos
    │   │   └── CheckoutWhatsAppModal.jsx        ← Formulario de entrega y enlace universal a WhatsApp
    │   │
    │   ├── catalogos/                           ← Sub-componentes específicos de Catálogos
    │   │   ├── NuevaCategoriaForm.jsx           ← Formulario aislado para alta de categorías
    │   │   ├── NuevaMarcaForm.jsx               ← Formulario aislado para alta de marcas
    │   │   ├── NuevoModeloForm.jsx              ← Formulario aislado para alta de modelos con selector de marca
    │   │   ├── NuevoMaterialForm.jsx            ← Formulario aislado para alta de materiales
    │   │   └── NuevoColorForm.jsx               ← Formulario con galería comercial de presets de 1 clic
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
    │   ├── Sidebar.jsx                          ← Menú lateral con logo oficial y botón a Tienda
    │   ├── AdminLoginModal.jsx                  ← Modal de autenticación y acceso protegido al panel admin
    │   ├── ProductoModal.jsx                    ← Modal para crear/editar productos (con chips de color e imagen)
    │   ├── MovimientoModal.jsx                  ← Modal para registrar entradas/salidas de stock
    │   ├── StockModal.jsx                       ← Modal para ajuste rápido de inventario
    │   └── CategoriaModal.jsx                   ← Modal para gestión de catálogos auxiliares
    │
    ├── pages/                                   ← Vistas principales del sistema
    │   ├── CatalogoClienteView.jsx              ← Landing Page oficial de Los Caseritos (Boutique)
    │   ├── CategoriaProductosView.jsx           ← Página dedicada por categoría con filtros y tarjetas de fundas (pag/pag)
    │   ├── DashboardView.jsx                    ← Panel de métricas e indicadores en tiempo real
    │   ├── ProductosView.jsx                    ← Listado multirubro con filtros de categoría y marca
    │   ├── MovimientosView.jsx                  ← Historial de movimientos de stock (Kardex)
    │   ├── ComprasView.jsx                      ← Registro y consulta de compras a proveedores
    │   ├── VentasView.jsx                       ← Punto de venta, facturación y gestión de pedidos
    │   ├── CatalogosView.jsx                    ← Gestión de 5 catálogos (Categorías, Marcas, Modelos, Materiales, Colores)
    │   ├── DatabaseView.jsx                     ← Explorador y visor del esquema de BD (18 tablas)
    │   └── BitacoraView.jsx                     ← Auditoría del sistema y registro de actividad
    │
    ├── utils/                                   ← Utilidades transversales
    │   └── whatsappHelper.js                    ← Generador de enlaces y mensajes estructurados de WhatsApp
    │
    ├── assets/
    │   └── logo.png                             ← Logo oficial de Los Caseritos
    │
    ├── data/                                    ← Datasets, metadatos y mocks aislados
    │   ├── colorPresets.js                      ← Galería de 24 colores comerciales predefinidos
    │   ├── databaseSchema.js                    ← Esquema y metadatos de las 18 tablas
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
| 2026-09-03 | CREADO | `TestMockDataFactory.java`, `SERVICES_DOC.md` | Backend / Tests | Extracción de datos mockup a factoría de pruebas y creación de documento de APIs |
