import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Columna editorial del Hero de la Tienda.
 * Responsabilidad: Titulares de impacto, propuesta de valor y botones de acción principales.
 */
export function HeroCopy({ onExploreCatalog, onExploreFeatured }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {/* Tagline con barra de gradiente */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
        <span
          style={{
            width: '32px',
            height: '4px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #FF6B00 0%, #EF4444 100%)',
          }}
        />
        <span
          className="font-headline"
          style={{
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            fontWeight: 800,
            color: 'var(--brand-gold)',
          }}
        >
          PROTECCIÓN · AJUSTE · PRECISIÓN
        </span>
      </div>

      {/* Titular Principal */}
      <h1
        className="font-headline"
        style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
          fontWeight: 900,
          color: 'var(--text-white)',
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
          margin: '0 0 1.2rem',
        }}
      >
        Protección que <br />
        se siente <span className="text-gradient-fire" style={{ fontStyle: 'italic' }}>tuya.</span>
      </h1>

      {/* Subtítulo */}
      <p
        style={{
          fontSize: 'clamp(0.92rem, 1.6vw, 1.08rem)',
          color: 'var(--text-secondary)',
          maxWidth: '520px',
          lineHeight: 1.55,
          margin: '0 0 1.8rem',
        }}
      >
        Carcasas antichoques de ajuste milimétrico para cada modelo de celular. Diseñadas para resistir caídas extremas con estilo y confort.
      </p>

      {/* Botones de Acción (CTAs) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onExploreCatalog}
          className="apple-btn-tactile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.85rem 1.8rem',
            borderRadius: '999px',
            backgroundColor: 'var(--text-white)',
            color: '#0A0A0C',
            border: 'none',
            fontWeight: 800,
            fontSize: '0.88rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <span>Explorar categorías</span>
          <ArrowRight size={16} style={{ color: '#F97316' }} />
        </button>

        <button
          type="button"
          onClick={onExploreFeatured}
          className="apple-btn-tactile"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.82rem 1.6rem',
            borderRadius: '999px',
            backgroundColor: 'transparent',
            color: 'var(--text-white)',
            border: '1.5px solid rgba(249, 115, 22, 0.4)',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          Ver colección
        </button>
      </div>
    </div>
  );
}

export default HeroCopy;
