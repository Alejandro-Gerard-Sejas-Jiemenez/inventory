# AGENTS.md — Guía de Trabajo y Reglas Operativas: Sistema de Inventario

> **INSTRUCCIÓN PARA EL AGENTE:** Lee este archivo COMPLETO al inicio de cada sesión antes de ejecutar cualquier acción. Luego lee `FILE_INDEX.md` y el último bloque de `AUDIT_LOG.md`.

---

## 1. Contexto del Proyecto

| Campo | Valor |
|---|---|
| **Proyecto** | Sistema de Gestión de Inventario |
| **Workspace** | `c:\Users\PERSONAL\Documents\AlejandroGerardSejas\inventario` |
| **Stack Backend** | Java 21 + Spring Boot 3.4.2 + Spring Data JPA + H2 Database (Puerto: `8088`) |
| **Stack Frontend** | React 19 + Vite 8 + Lucide React + Vanilla CSS (Puerto dev: `5173`) |
| **Arquitectura Backend** | Monolito Modular (Package-by-Feature): 5 módulos de dominio (`catalogo`, `inventario`, `compras`, `ventas`, `sistema`) + núcleo `core` |
| **Base de Datos** | H2 Database persistente en archivo local (`./data/inventariodb`) con 16 tablas relacionales |
| **Idioma UI** | Español |

---

## 2. Archivos de Control (leer en este orden)

```
.agents/
  AGENTS.md        ← este archivo (leer primero)
  FILE_INDEX.md    ← índice estructurado de todos los archivos del proyecto
  AUDIT_LOG.md     ← historial cronológico de tareas ejecutadas
  skills/          ← 6 skills activas + bibliografía de referencia en libros/doc/
```

**Regla de Oro:** Antes de empezar cualquier tarea, el agente DEBE:
1. Leer `AGENTS.md` (este archivo) → identifica el contexto, directivas y qué skill aplica.
2. Leer `.agents/FILE_INDEX.md` → ubica los archivos involucrados.
3. Leer el último bloque de `.agents/AUDIT_LOG.md` → conoce el estado y avances previos.
4. **Leer COMPLETO el archivo `SKILL.md` de la skill relevante** ← OBLIGATORIO:
   - Tarea de Backend / API → `.agents/skills/spring-modular-backend/SKILL.md`
   - Tarea de Frontend / UI → `.agents/skills/react-modern-frontend/SKILL.md` y `.agents/skills/ui-ux-usability/SKILL.md`
   - Tarea de Refactorización / Nombres → `.agents/skills/clean-code/SKILL.md`
   - Tarea de Git / Commits → `.agents/skills/git-workflow/SKILL.md`
   - Planificación de nueva feature → `.agents/skills/spec-driven-development/SKILL.md`
5. Recién después de leer la skill → iniciar la **Fase 1: ESPECIFICACIÓN / ARQUITECTURA**.

---

## 3. Skills Activas (6 Skills)

| Skill | Aplica a | Base Teórica / Fuente |
|---|---|---|
| `clean-code` | Buenas prácticas, nombres, funciones pequeñas, SOLID | *Clean Code* (Robert C. Martin) |
| `ui-ux-usability` | Usabilidad, jerarquía visual, feedback al usuario | *No me hagas pensar* (Steve Krug) |
| `git-workflow` | Commits atómicos, Conventional Commits y ramas | *Git & GitHub Fundamentos* |
| `spec-driven-development` | Desarrollo guiado por especificaciones con IA | *SDD — Spec Driven Development* |
| `spring-modular-backend` | Arquitectura Package-by-Feature en Spring Boot 3 | Spring Boot 3 & JPA Architecture |
| `react-modern-frontend` | Componentes limpios, hooks y CSS responsivo | React 19 Best Practices |

---

## 4. Arquitectura del Proyecto

### 4.1 Backend (Modular / Package-by-Feature)
```
backend/src/main/java/com/inventario/
├── InventarioBackendApplication.java
├── core/
│   ├── config/              # CorsConfig, DataInitializer
│   └── exception/           # GlobalExceptionHandler, ResourceNotFoundException, BadRequestException
└── modules/
    ├── catalogo/            # 6 tablas: productos, modelos, materiales, colores, imagenes_producto, descuentos_por_cantidad
    ├── inventario/          # 1 tabla:  movimientos_stock
    ├── compras/             # 3 tablas: proveedores, compras, detalles_compra
    ├── ventas/              # 3 tablas: clientes, ventas, detalles_venta
    └── sistema/             # 3 tablas: usuarios, bitacoras, configuraciones (+ dashboard)
```

### 4.2 Frontend (SPA React 19 + Vite)
```
frontend/src/
├── components/              # Sidebar, ProductoModal, MovimientoModal, StockModal, CategoriaModal
├── pages/                   # DashboardView, ProductosView, MovimientosView, ComprasView, VentasView, CatalogosView, DatabaseView, BitacoraView
├── services/                # api.js (cliente HTTP centralizado)
├── App.jsx / App.css        # Enrutador principal y layout
└── index.css                # Sistema de diseño global (Design Tokens)
```

---

## 5. Fases de Trabajo (Ciclo de Vida SDD / PUDS — 4 Fases)

Cada cambio en el proyecto DEBE seguir estrictamente estas 4 fases en orden:

### 🧩 Fase 1: ESPECIFICACIÓN & ARQUITECTURA
- ¿En qué módulo impacta el cambio (`catalogo`, `inventario`, `compras`, `ventas`, `sistema`, `frontend`)?
- ¿Qué archivos se crean, modifican o eliminan?
- Actualizar `FILE_INDEX.md` con los archivos previstos.

### 📐 Fase 2: DISEÑO DE CONTRATOS
- Definir DTOs, validaciones (`@Valid`), entidades JPA o props de React antes de programar la lógica.
- Especificar rutas REST y códigos HTTP de respuesta.
- Confirmar con el usuario cualquier decisión de diseño importante.

### 💻 Fase 3: IMPLEMENTACIÓN LIMPIA
- Escribir código siguiendo **Clean Code** (funciones pequeñas, nombres expresivos, sin código duplicado).
- Realizar cambios archivo por archivo.
- Validar compilación incremental con `./mvnw test-compile` o `npm run lint`.

### ✅ Fase 4: PRUEBAS, VERIFICACIÓN Y CIERRE
- Correr tests con `./mvnw test` garantizando 100% de tests exitosos y 0 fallos.
- Verificar interfaz en frontend o endpoints HTTP.
- Registrar resultado detallado en `AUDIT_LOG.md` y actualizar `FILE_INDEX.md`.
- **Git Commit & Push (Obligatorio tras verificación):**
  - Formato **Conventional Commits**: `<tipo>(<alcance>): <descripción>`
  - Tipos: `feat:`, `fix:`, `refactor:`, `test:`, `style:`, `docs:`, `chore:`
  - Verbo imperativo en presente (ej. `add`, `fix`, `refactor`, `remove`).
  - Máximo 50-72 caracteres, sin punto final.

---

## 6. Reglas de Código Obligatorias

### Backend (Spring Boot 3 + Java 21)
- ❌ **Prohibido `@Autowired` en campos**: Usar inyección por constructor (`@RequiredArgsConstructor` de Lombok).
- ❌ **Prohibido exponer Entidades JPA en Controllers**: Siempre recibir DTOs con validaciones (`@Valid`, `@NotNull`, etc.).
- ✅ **Manejo centralizado de errores**: Lanzar `ResourceNotFoundException` (404) y `BadRequestException` (400) gestionadas por `GlobalExceptionHandler`.
- ✅ **Transacciones atómicas**: `@Transactional` en métodos que afecten inventario, compras o ventas compuestas.

### Frontend (React 19 + Vanilla CSS)
- ❌ **Prohibido llamadas `fetch` dispersas en componentes**: Toda comunicación pasa por `services/api.js`.
- ✅ **Usabilidad "No me hagas pensar"**: Botones de acción obvios, estados de carga (`loading`), confirmación en acciones destructivas.
- ✅ **Design System unificado**: Usar variables CSS de `index.css` (`var(--primary)`, `var(--surface)`, `var(--text-main)`).

---

## 7. Plantilla de Petición (Formato para solicitar tareas)

```
TAREA: [descripción concisa]
MÓDULO: [catalogo | inventario | compras | ventas | sistema | frontend]
SKILL: [clean-code | ui-ux-usability | git-workflow | spec-driven-development | spring-modular-backend | react-modern-frontend]
FASE: [Arquitectura | Diseño | Implementación | Pruebas]
CONTEXTO: [detalles específicos de la funcionalidad]
```

---

## 8. Tokens de Estado

| Token | Significado |
|---|---|
| `[RETOMAR]` | Continuar la última tarea pendiente del backlog |
| `[NUEVA TAREA]` | Iniciar una nueva tarea del plan |
| `[REVISAR]` | Solo auditar o analizar código sin modificar |
| `[EMERGENCIA]` | Error crítico de compilación o datos en la aplicación |

---

## 9. Backlog de Tareas del Proyecto

| ID | Módulo | Tarea | Skill | Estado |
|---|---|---|---|---|
| ARCH-1 | Backend | Refactorización modular en 5 paquetes de dominio | `spring-modular-backend` | ✅ Completado |
| AGT-1 | .agents | Configuración de AGENTS.md, FILE_INDEX.md y AUDIT_LOG.md | `spec-driven-development` | ✅ Completado |
| AGT-2 | .agents | Creación de skills basadas en libros de referencia | `clean-code`, `ui-ux-usability` | ✅ Completado |
| FEAT-1 | Ventas | Validación de stock disponible en tiempo real antes de registrar venta | `spring-modular-backend` | ⏳ Pendiente |
| FEAT-2 | Compras | Recepción automática y actualización de stock al completar compra | `spring-modular-backend` | ⏳ Pendiente |
| FEAT-3 | Frontend | Mejorar UI/UX de formularios modales con feedback de validación | `ui-ux-usability`, `react-modern-frontend` | ⏳ Pendiente |
| TEST-1 | Tests | Añadir tests unitarios para `CompraService` y `MovimientoStockService` | `spring-modular-backend` | ⏳ Pendiente |

**Leyenda:** ⏳ Pendiente | 🔄 En progreso | ✅ Completado | ❌ Cancelado
