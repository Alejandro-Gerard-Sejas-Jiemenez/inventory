import React from 'react';
import { Smartphone, Check } from 'lucide-react';

/**
 * Grupo de píldoras de modelos de celulares para el selector de variantes.
 * Responsabilidad: Desplegar y seleccionar el modelo de celular específico.
 */
export function VariantModelPills({
  modelos = [],
  selectedModelo = '',
  onSelectModelo,
}) {
  if (!Array.isArray(modelos) || modelos.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Smartphone size={15} style={{ color: 'var(--brand-gold)' }} />
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Modelo de Smartphone:
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
        {modelos.map((modName) => {
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
  );
}

export default VariantModelPills;
