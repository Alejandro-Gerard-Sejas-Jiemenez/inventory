import React from 'react';
import { Smartphone, Palette, Check, Box } from 'lucide-react';

/**
 * Selector de Variantes (Modelo de Celular y Color) para el detalle del producto.
 * Responsabilidad: Selección síncrona en un solo ciclo de render de React con feedback visual inmediato.
 */
export function ProductoVariantSelector({
  modelosUnicos = [],
  selectedModelo = '',
  onSelectModelo,
  coloresDelModelo = [],
  selectedColorName = '',
  onSelectColor,
  materialNombre = '',
  isOutOfStock = false,
  currentVariantStock = 0,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* 1. Selector de Modelos de Celular */}
      {modelosUnicos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Smartphone size={15} style={{ color: 'var(--brand-gold)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Modelo de Smartphone:
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
            }}
          >
            {modelosUnicos.map((modName) => {
              const isSelected = selectedModelo === modName;
              return (
                <button
                  key={modName}
                  type="button"
                  onClick={() => onSelectModelo(modName)}
                  className="apple-btn-tactile"
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '999px',
                    border: isSelected ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--brand-gold)' : 'var(--bg-secondary)',
                    color: isSelected ? '#111' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {isSelected && <Check size={13} />}
                  <span>{modName}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Selector de Colores Disponibles para el Modelo */}
      {coloresDelModelo.length > 0 && (
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
            {coloresDelModelo.map((c) => {
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
                      display: 'inline-block',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: isSelected ? 800 : 500,
                      color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                    }}
                  >
                    {c.nombre}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Indicador de Material y Disponibilidad */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap', paddingTop: '0.2rem' }}>
        {materialNombre && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <Box size={14} style={{ color: 'var(--brand-gold)' }} />
            <span>Material: <strong style={{ color: 'var(--text-white)' }}>{materialNombre}</strong></span>
          </div>
        )}

        <div
          style={{
            fontSize: '0.76rem',
            fontWeight: 700,
            padding: '0.25rem 0.65rem',
            borderRadius: '999px',
            backgroundColor: isOutOfStock ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
            color: isOutOfStock ? 'var(--brand-red)' : 'var(--brand-green)',
            border: isOutOfStock ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isOutOfStock ? 'var(--brand-red)' : 'var(--brand-green)' }} />
          <span>{isOutOfStock ? 'Agotado temporalmente' : 'Disponible en stock'}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductoVariantSelector;
