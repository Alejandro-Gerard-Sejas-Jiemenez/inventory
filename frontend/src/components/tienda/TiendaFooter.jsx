import React from 'react';
import logoImg from '../../assets/logo.png';

/**
 * Pie de página minimalista de la tienda con branding corporativo.
 */
export function TiendaFooter() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card)',
        padding: '1.5rem 1.4rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src={logoImg} alt="Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          <span style={{ fontSize: '0.82rem', color: 'var(--text-white)', fontWeight: 700 }}>
            Los Caseritos · Catálogo Digital
          </span>
        </div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Los Caseritos. Todos los derechos reservados. Desarrollado por Alejandro Gerard Sejas.
        </div>
      </div>
    </footer>
  );
}
