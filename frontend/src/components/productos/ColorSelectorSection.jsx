import React from 'react';
import { Check } from 'lucide-react';

/**
 * Selector visual de paleta de colores para el modal de productos.
 * Responsabilidad: Renderizado de swatches y selección interactiva.
 */
export function ColorSelectorSection({ colores = [], selectedColorId, onSelectColor }) {
  return (
    <div>
      <label className="form-field-label">Color del Producto</label>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.45rem',
          padding: '0.6rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          maxHeight: '120px',
          overflowY: 'auto',
        }}
      >
        {colores.map((c) => {
          const isSelected = String(selectedColorId) === String(c.idColor);
          return (
            <button
              key={c.idColor}
              type="button"
              onClick={() => onSelectColor(c.idColor)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                background: isSelected ? 'var(--brand-gold-bg)' : 'rgba(255,255,255,0.05)',
                border: isSelected ? '1px solid var(--brand-gold)' : '1px solid rgba(255,255,255,0.1)',
                color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: isSelected ? 700 : 500,
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  backgroundColor: c.codigoHex || '#888',
                  border: '1px solid rgba(255,255,255,0.3)',
                  flexShrink: 0,
                }}
              />
              <span>{c.nombre}</span>
              {isSelected && <Check size={13} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
