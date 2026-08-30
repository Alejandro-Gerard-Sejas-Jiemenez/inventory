---
name: react-modern-frontend
description: Estándares de desarrollo de Frontend con React 19, Vite, Lucide React y Vanilla CSS.
---

# React Modern Frontend — Guía de Arquitectura y Componentes

---

## 1. Arquitectura de la SPA (React 19 + Vite)

```
frontend/src/
├── components/       # Modales, Sidebar, tarjetas y componentes reutilizables
├── pages/            # Vistas principales (DashboardView, ProductosView, etc.)
├── services/         # api.js — Cliente HTTP centralizado
├── assets/           # Imágenes y logos estáticos
├── App.jsx           # Enrutador principal y orquestador de estado
├── App.css           # Estilos de layout, sidebar y barra superior
└── index.css         # Design System, variables CSS, tablas, botones y modales
```

---

## 2. Principios de React 19 & Componentes Funcionales

### 1. Desacoplamiento de Llamadas HTTP en `services/api.js`
* ❌ **Prohibido** escribir `fetch('http://localhost:8088/api/...')` dentro de los componentes `JSX`.
* ✅ **Obligatorio:** Definir las funciones en [services/api.js](file:///c:/Users/PERSONAL/Documents/AlejandroGerardSejas/inventario/frontend/src/services/api.js) y consumirlas limpiamente:

```javascript
// services/api.js
export const productoService = {
  obtenerTodos: () => fetchApi('/productos'),
  obtenerPorId: (id) => fetchApi(`/productos/${id}`),
  crear: (data) => fetchApi('/productos', { method: 'POST', body: JSON.stringify(data) }),
  actualizar: (id, data) => fetchApi(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  eliminar: (id) => fetchApi(`/productos/${id}`, { method: 'DELETE' }),
};
```

### 2. Manejo de Estado y Hooks
* Mantener el estado cerca de donde se usa.
* Usar `useMemo` para listas filtradas o cálculos pesados de totales/precios.
* Usar `useEffect` con dependencias explícitas para sincronización con la API.

### 3. Anatomía de un Componente Modal Accesible
* Renderizado condicional basado en la prop `isOpen`.
* Cierre al presionar la tecla `Escape` o al hacer clic en el backdrop exterior.
* Deshabilitar el botón de envío y mostrar spinner durante el estado `loading`.
* Limpiar el formulario al abrir en modo creación y precargar datos al abrir en modo edición.

---

## 3. Design System en Vanilla CSS (`index.css`)

El proyecto utiliza un sistema de tokens en CSS nativo:

* **Variables de Color:**
  - Primario / Acento: `var(--primary)`, `var(--primary-hover)`
  - Superficies y Fondo: `var(--bg-main)`, `var(--surface)`, `var(--surface-card)`
  - Texto y Jerarquía: `var(--text-main)`, `var(--text-muted)`, `var(--text-subtle)`
  - Estados: `var(--success)`, `var(--warning)`, `var(--danger)`
* **Tablas Responsivas:**
  - Clase `.data-table-container` y `.data-table`.
  - Badges de estado con `.badge` y `.badge-success`, `.badge-warning`, `.badge-danger`.
* **Botones:**
  - Primario: `.btn-primary`
  - Secundario / Outline: `.btn-secondary`
  - Destructivo: `.btn-danger`
  - Con icono: Contenedor flexbox con icono de `lucide-react`.

---

## 4. Checklist de Calidad para Cada Nueva Vista

- [ ] ¿La vista tiene un título `h1` descriptivo y botones de acción claros?
- [ ] ¿Se muestra un estado de carga (`loading spinner` o skeleton) mientras se obtienen los datos?
- [ ] ¿Se gestionan los estados vacíos (*"No hay productos registrados"*) con una ilustración o mensaje amigable?
- [ ] ¿Los formularios tienen etiquetas `<label>` visibles y feedback de validación claro?
- [ ] ¿Todas las llamadas HTTP pasan exclusivamente por `services/api.js`?
- [ ] ¿El linter (`npm run lint` / Oxlint) pasa sin errores ni advertencias?
