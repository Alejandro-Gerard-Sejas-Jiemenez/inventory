import React from 'react';

/**
 * Sección de Manifiesto Oficial de Los Caseritos basada en stitch_minimalist_tech_accessories_landing
 */
export function TiendaManifesto() {
  return (
    <section
      style={{
        padding: '5rem 0',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-light)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 1.4rem' }}>
        <span
          className="font-headline"
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.24em',
            color: 'var(--brand-gold)',
            display: 'block',
            marginBottom: '1.2rem',
          }}
        >
          SOBRE LOS CASERITOS
        </span>

        <blockquote
          className="font-headline"
          style={{
            margin: '0 0 1.8rem',
            fontSize: 'clamp(1.4rem, 2.8vw, 2.3rem)',
            color: 'var(--text-white)',
            lineHeight: 1.3,
            fontWeight: 800,
            letterSpacing: '-0.025em',
          }}
        >
          En Los Caseritos creemos que la protección de tu teléfono es{' '}
          <span className="text-gradient-fire">tranquilidad</span>, no un accesorio más. <br />
          Fundas de tacto prémium con ajuste milimétrico que resisten caídas extremas y atención directa al instante.
        </blockquote>

        <div
          style={{
            width: '80px',
            height: '4px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #FF6B00 0%, #EF4444 100%)',
            margin: '0 auto',
          }}
        />
      </div>
    </section>
  );
}

export default TiendaManifesto;
