import React from 'react';

/**
 * Atributos visuales de modelo y color para un ítem del carrito.
 * Responsabilidad: Desplegar el modelo de celular y el color seleccionado con swatch.
 */
export function CarritoItemAttributes({ modelo, color, colorHex }) {
  return (
    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.15rem' }}>
      {modelo && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Modelo:</span>
          <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>{modelo}</span>
        </div>
      )}
      {color && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Color:</span>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: colorHex || 'var(--text-muted)',
              display: 'inline-block',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{color}</span>
        </div>
      )}
    </div>
  );
}

export default CarritoItemAttributes;
