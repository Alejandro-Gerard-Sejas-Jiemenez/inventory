import React from 'react';
import { CheckCircle2 } from 'lucide-react';

/**
 * Sección Hero Minimalista para el Catálogo de Clientes.
 * Basado en Apple Design, Emil Kowalski (Design Engineering) y Steve Krug (No me hagas pensar).
 * Ligero, sin elementos pesados, con altura compacta y paleta oficial de Los Caseritos.
 */
export function TiendaHeroLanding() {
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
        className="apple-glass-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '1.4rem 1.2rem 1.15rem',
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
            gap: '0.45rem',
            padding: '0.22rem 0.75rem',
            borderRadius: '999px',
            backgroundColor: 'var(--brand-gold-bg)',
            border: '1px solid rgba(245, 158, 11, 0.28)',
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
              display: 'inline-block',
            }}
          />
          <span>Los Caseritos • Catálogo Oficial</span>
        </div>

        {/* Titular Minimalista */}
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
            fontWeight: 800,
            color: 'var(--text-white)',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          Fundas & Accesorios de Precisión
        </h1>

        {/* Subtítulo de una sola línea concisa */}
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
