import React from 'react';
import { Palette, Check } from 'lucide-react';

/**
 * Grupo de swatches de colores para el selector de variantes.
 * Responsabilidad: Desplegar y seleccionar el color disponible con indicador visual hex.
 */
export function VariantColorSwatches({
  colores = [],
  selectedColorName = '',
  onSelectColor,
}) {
  if (!Array.isArray(colores) || colores.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Palette size={15} style={{ color: 'var(--brand-gold)' }} />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Color:
          </span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--brand-gold)', fontWeight: 700 }}>
          {selectedColorName || 'Selecciona un color'}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
        {colores.map((c) => {
          const isSelected = selectedColorName === c.nombre;
          return (
            <button
              key={c.nombre}
              type="button"
              onClick={() => onSelectColor(c.nombre)}
              className="apple-btn-tactile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-secondary)',
                border: isSelected ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.12s ease',
              }}
              title={c.nombre}
            >
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'inline-block',
                  flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                }}
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                }}
              >
                {c.nombre}
              </span>
              {isSelected && <Check size={12} style={{ color: 'var(--brand-gold)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default VariantColorSwatches;
