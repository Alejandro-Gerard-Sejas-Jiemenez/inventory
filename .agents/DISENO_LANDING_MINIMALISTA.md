# Especificación de Diseño Minimalista: Hero & Landing del Catálogo

> **Objetivo:** Rediseñar la experiencia de entrada del catálogo de clientes para transformar un banner cargado y pesado en un Hero minimalista, refinado y ágil, inspirado en la filosofía de **Apple Design**, **Emil Kowalski** y **Steve Krug (No me hagas pensar)**, utilizando estrictamente los tokens y la paleta de color oficial de **"Los Caseritos"**.

---

## 1. Diagnóstico: ¿Por qué el Hero anterior se sentía "pesado"?

Siguiendo el principio de **Steve Krug (Regla 5: Eliminar el ruido visual)** y la filosofía de **Emil Kowalski (Restraint & Purpose)**:

| Componente Anterior | Problema Identificado | Efecto en el Usuario |
|---|---|---|
| **4 cajas de propuestas de valor** (Envíos, Garantía, 24/7, 500+ modelos) | Apiñamiento de tarjetas genéricas dentro del mismo banner | Crea fricción cognitiva y distrae del objetivo central: ver productos. |
| **Gradientes radiales superpuestos** (rojo y amarillo difusos) | Saturación cromática en el fondo | Sensación visual pesada y confusa sobre el modo oscuro. |
| **Doble botón CTA repetitivo** ("Explorar Catálogo" y "Pedir por WhatsApp") | Botones que compiten en jerarquía visual | El usuario no sabe a cuál prestar atención primero. |
| **Altura vertical excesiva** (> 420px de espacio ocupado) | Empuja la cuadrícula de productos fuera del viewport inicial | El usuario tiene que hacer scroll largo para empezar a ver fundas. |

---

## 2. Los 3 Pilares del Enfoque Minimalista

### 2.1 Apple Design — "El contenido es el protagonista"
- **Contención visual (Restraint):** Los adornos visuales no deben competir con las fotografías de los productos.
- **Micro-material translúcido:** Superficie de cristal oscuro `rgba(18, 24, 38, 0.65)` con `backdrop-filter: blur(20px)` y borde especular ultrafino `rgba(255, 255, 255, 0.08)`.
- **Tipografía óptica (`Plus Jakarta Sans`):** Jerarquía de pesos inequívoca (`font-weight: 800` en títulos con `letter-spacing: -0.03em`, y subtítulos en `400/500` con `#94A3B8`).

### 2.2 Emil Kowalski — "Unseen details compound"
- **Eliminar elementos redundantes:** La confianza no se gana agregando iconos de camiones y rayos; se gana con una interfaz rápida, tipografía limpia y precios transparentes.
- **Micro-interacciones táctiles rápidas:**
  ```css
  /* Presión reactiva sin lag */
  .minimal-pill:active {
    transform: scale(0.97);
    transition: transform 100ms cubic-bezier(0.2, 0.9, 0.2, 1);
  }
  ```
- **Altura compacta:** Reducir la altura del Hero a menos de **160px**, permitiendo que el catálogo y las categorías aparezcan casi inmediatamente en la pantalla.

### 2.3 Steve Krug — "No me hagas pensar"
- **El usuario quiere escanear, no leer folletos:** Un titular de 5 a 7 palabras, una sola línea descriptiva y acceso inmediato a las categorías y productos.
- **Zero fricción:** Un único punto focal claro que dirija la vista hacia las categorías activas centradas.

---

## 3. Paleta de Colores y Tokens Oficiales

Utilizamos **únicamente** los tokens definidos en `tokens.css`:

```
┌────────────────────────────────────────────────────────────────────────┐
│  COLOR               VARIABLE TOKEN           HEX / RGBA      ROL      │
├────────────────────────────────────────────────────────────────────────┤
│  Canvas Fondo        --bg-primary             #070A12         Base     │
│  Superficie Tarjeta  --bg-card                rgba(18,24,38)  Glass    │
│  Borde Estructural   --border-color           rgba(255,255,255, 0.08)  │
│  Highlight Superior  --border-specular        inset 0 1px 0 rgba(..)   │
│  Acento Dorado       --brand-gold             #F59E0B         Foco     │
│  Fondo Acento        --brand-gold-bg          rgba(245,158,11, 0.12)   │
│  Texto Principal     --text-white             #FFFFFF         Titular  │
│  Texto Secundario    --text-secondary         #94A3B8         Cuerpo   │
│  Texto Tenue         --text-muted             #64748B         Etiquetas│
└────────────────────────────────────────────────────────────────────────┘
```

> **Regla de Oro del Minimalismo:** El rojo (`#EF4444`) se reserva **exclusivamente** para estados críticos o agotados. El verde (`#10B981`) se reserva para la confirmación de pedidos en WhatsApp. Ninguno de estos dos colores debe usarse como manchas decorativas en el fondo.

---

## 4. Estructura del Nuevo Hero Minimalista

### 4.1 Anatomía Visual (Wireframe Conceptual)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             [TiendaHeader]                               │
└──────────────────────────────────────────────────────────────────────────┘
                                   │ (Espaciado: 1.5rem)
┌──────────────────────────────────────────────────────────────────────────┐
│  [ • LOS CASERITOS  •  CATÁLOGO OFICIAL ]          (Micro-píldora tenue) │
│                                                                          │
│  Fundas & Accesorios de Precisión                 (Titular 2.2rem, H1)  │
│                                                                          │
│  Protección de alta calidad para iPhone, Samsung y Xiaomi.               │
│  Envíos directos y pedidos por WhatsApp.           (Subtítulo #94A3B8)   │
│                                                                          │
│  [ ✓ Stock Disponible ]   [ ✓ Ajuste Exacto ]   [ ✓ Atención Rápida ]   │
└──────────────────────────────────────────────────────────────────────────┘
                                   │ (Espaciado: 1.2rem)
┌──────────────────────────────────────────────────────────────────────────┐
│          [Todo]   [Fundas]   [Protectores]   [Accesorios]   (Centradas)  │
└──────────────────────────────────────────────────────────────────────────┘
                                   │
┌──────────────────────────────────────────────────────────────────────────┐
│            [  Buscar funda, modelo de celular, color...  ]               │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Tabla de Decisiones Técnicas (Formato Emil Kowalski)

| Antes (Diseño Pesado) | Después (Diseño Minimalista) | Fundamento / Justificación |
|---|---|---|
| Contenedor con gradiente radial amarillo y rojo invasivo | Fondo limpio con sombra difusa sutil `inset 0 1px 0 rgba(255,255,255,0.06)` | Reduce el ruido visual en un 80%, dando una textura premium y tranquila. |
| 4 tarjetas flotantes de beneficios con bordes e iconos grandes | Una sola línea horizontal de micro-atributos con viñetas tenues (`•`) | Elimina 300px de altura innecesaria sin perder las garantías del servicio. |
| Titular extenso de 15 palabras con gradiente de texto estridente | Titular directo: *"Fundas & Accesorios de Precisión"* en blanco puro | Confianza tipográfica inspirada en Apple; fácil de leer en 1 segundo. |
| Dos botones CTA grandes que competían entre sí | Sin botones redundantes en el hero; el flujo guía directo a las categorías y al buscador | El usuario vino a ver catálogo; no necesita un botón para ver lo que ya tiene abajo. |
| Padding de 2.5rem vertical y altura > 400px | Padding compacto de 1.4rem vertical y altura contenida (< 170px) | Las primeras 2 filas de productos quedan a la vista de inmediato. |

---

## 6. Especificación del Componente `TiendaHeroMinimal.jsx`

### Propiedades:
- `totalProductos`: número dinámico de productos disponibles.
- `onExplore`: desplazamiento suave opcional al catálogo.

### Código de Ejemplo (React 19 + Vanilla CSS Tokens):

```jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export function TiendaHeroMinimal() {
  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '1rem auto 0.4rem',
        padding: '0 1.4rem',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.4rem 1.2rem 1.1rem',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm), var(--border-specular)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
        }}
      >
        {/* Micro-insignia superior elegante */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.22rem 0.7rem',
            borderRadius: '999px',
            backgroundColor: 'var(--brand-gold-bg)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--brand-gold)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '0.65rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--brand-gold)',
              boxShadow: '0 0 6px var(--brand-gold)',
            }}
          />
          <span>Los Caseritos • Catálogo Oficial</span>
        </div>

        {/* Titular Minimalista */}
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
            fontWeight: 800,
            color: 'var(--text-white)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          Fundas & Accesorios de Precisión
        </h1>

        {/* Subtítulo de una sola línea */}
        <p
          style={{
            margin: '0.45rem 0 0.85rem',
            fontSize: 'clamp(0.82rem, 1.4vw, 0.94rem)',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: 1.45,
          }}
        >
          Modelos compatibles para iPhone, Samsung y Xiaomi. Envíos directos y pedidos inmediatos por WhatsApp.
        </p>

        {/* Micro-atributos de confianza en una sola línea sutil */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            flexWrap: 'wrap',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 600,
            paddingTop: '0.65rem',
            borderTop: '1px solid var(--border-light)',
            width: '100%',
            maxWidth: '520px',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={13} style={{ color: 'var(--brand-gold)' }} />
            Ajuste Garantizado
          </span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={13} style={{ color: 'var(--brand-gold)' }} />
            Envíos en la Ciudad
          </span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={13} style={{ color: 'var(--brand-green)' }} />
            Atención WhatsApp
          </span>
        </div>
      </div>
    </section>
  );
}
```

---

## 7. Ventajas Clave de este Rediseño

1. **Ligereza Absoluta:** 0 bloat, 0 elementos que empujen el contenido hacia abajo, 0 estilos CSS sobrecargados.
2. **Armonía con la Paleta:** Utiliza rigurosamente el oro `#F59E0B` como acento controlado, el azul-noche `#070A12` de fondo y el cristal `#121826`.
3. **Conversión y Usabilidad Superior (Steve Krug):** El cliente ve inmediatamente los botones de categorías centrados y los productos para agregar al carrito sin rodeos ni distracciones.
