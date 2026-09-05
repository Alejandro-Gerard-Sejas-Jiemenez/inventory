import React from 'react';
import { Shield } from 'lucide-react';
import logoImg from '../../../assets/logo.png';

/**
 * Columna de identidad de marca y garantía para el pie de página.
 * Responsabilidad: Desplegar el logo, descripción y badge de ajuste exacto.
 */
export function FooterBrandCol() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div className="brand-logo-badge" style={{ width: '32px', height: '32px' }}>
          <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <span className="font-headline" style={{ fontSize: '1.1rem', color: 'var(--text-white)', fontWeight: 900, letterSpacing: '0.04em' }}>
          LOS CASERITOS
        </span>
      </div>
      <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '280px' }}>
        Especialistas en fundas, carcasas anticaídas y accesorios de protección milimétrica para celulares de alta gama.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-gold)', fontSize: '0.76rem', fontWeight: 700 }}>
        <Shield size={14} />
        <span>Ajuste Exacto Garantizado</span>
      </div>
    </div>
  );
}

export default FooterBrandCol;
