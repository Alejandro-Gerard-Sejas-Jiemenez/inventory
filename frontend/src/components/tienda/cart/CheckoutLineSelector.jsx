import React from 'react';

/**
 * Selector de Línea de Atención WhatsApp para despacho del pedido.
 * Responsabilidad: Selección entre Línea 1 y Línea 2 con feedback visual.
 */
export function CheckoutLineSelector({ targetNumber, onSelectNumber }) {
  const lines = [
    { id: '74672312', title: 'Línea 1', phone: '74672312' },
    { id: '69211592', title: 'Línea 2', phone: '69211592' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label className="form-field-label" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-gold)' }}>
        Selecciona la Línea de WhatsApp para enviar tu pedido:
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        {lines.map((l) => {
          const isSelected = targetNumber === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelectNumber(l.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                backgroundColor: isSelected ? 'var(--brand-gold-bg)' : 'var(--bg-secondary)',
                color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>{l.title}</span>
              <span style={{ fontSize: '1rem', marginTop: '0.2rem' }}>📲 {l.phone}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CheckoutLineSelector;
