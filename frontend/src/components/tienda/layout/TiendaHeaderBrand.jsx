import React from 'react';
import logoImg from '../../../assets/logo.png';

/**
 * Emblema e identidad oficial para el Header de la Tienda.
 * Responsabilidad: Desplegar el isotipo y nombre de marca con redirección al inicio.
 */
export function TiendaHeaderBrand({ onClick }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
      onClick={onClick}
      className="apple-btn-tactile"
    >
      <div className="brand-logo-badge">
        <img
          src={logoImg}
          alt="Los Caseritos Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <div>
        <h1
          className="apple-display-heading"
          style={{
            margin: 0,
            fontSize: '1.15rem',
            color: 'var(--text-white)',
            letterSpacing: '0.04em',
          }}
        >
          LOS CASERITOS
        </h1>
        <span
          className="apple-label-small"
          style={{
            fontSize: '0.64rem',
            color: 'var(--brand-gold)',
            display: 'block',
            marginTop: '-1px',
          }}
        >
          Fundas & Accesorios Tech
        </span>
      </div>
    </div>
  );
}

export default TiendaHeaderBrand;
