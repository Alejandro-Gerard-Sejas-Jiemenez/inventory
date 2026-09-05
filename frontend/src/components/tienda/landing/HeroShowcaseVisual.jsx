import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Columna visual del Hero de la Tienda.
 * Responsabilidad: Fotografía real de alta fidelidad, aura de brillo orgánico y micro-badges.
 */
export function HeroShowcaseVisual({ heroImage, featuredProduct }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Aura Orgánica de Fondo */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(239, 68, 68, 0.12) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Tarjeta de Exhibición Fotográfica */}
      <div
        className="apple-glass-card"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '380px',
          padding: '1.2rem',
          borderRadius: '2.5rem',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1.15',
            maxHeight: '360px',
            borderRadius: '2rem',
            overflow: 'hidden',
            backgroundColor: '#09090D',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={heroImage}
            alt={featuredProduct?.nombre || 'Funda de Protección Premium'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0.85rem',
              left: '0.85rem',
              right: '0.85rem',
              padding: '0.65rem 1rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(10, 10, 14, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ overflow: 'hidden' }}>
              <h4
                className="font-headline"
                style={{
                  margin: 0,
                  fontSize: '0.84rem',
                  color: '#fff',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '180px',
                }}
              >
                {featuredProduct?.nombre || 'Funda de Protección'}
              </h4>
              <span style={{ fontSize: '0.7rem', color: 'var(--brand-gold)', fontWeight: 700 }}>
                {featuredProduct?.modelo?.nombre || 'Colección Caseritos'}
              </span>
            </div>
            {featuredProduct?.precioUnitario && (
              <span className="font-headline" style={{ fontSize: '0.98rem', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                Bs {featuredProduct.precioUnitario}
              </span>
            )}
          </div>
        </div>

        <div
          style={{
            marginTop: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: '999px',
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: 'var(--text-white)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          <Sparkles size={13} style={{ color: 'var(--brand-gold)' }} />
          <span>Fotografía Real · Ajuste Milimétrico</span>
        </div>
      </div>
    </div>
  );
}

export default HeroShowcaseVisual;
