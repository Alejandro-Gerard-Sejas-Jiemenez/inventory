import React from 'react';
import { Check } from 'lucide-react';

/**
 * Píldora táctil de selección de dispositivo / modelo de celular.
 * Responsabilidad: Representación visual y evento de clic para un modelo de celular específico.
 */
export function DevicePill({ label, isSelected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="apple-btn-tactile"
      style={{
        padding: '0.45rem 1rem',
        borderRadius: '999px',
        border: isSelected ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-color)',
        backgroundColor: isSelected ? 'var(--brand-gold)' : 'var(--bg-card)',
        color: isSelected ? '#111' : 'var(--text-secondary)',
        fontSize: '0.78rem',
        fontWeight: isSelected ? 800 : 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        flexShrink: 0,
        transition: 'all 0.15s ease',
      }}
    >
      {isSelected && <Check size={13} />}
      <span>{label}</span>
    </button>
  );
}

export default DevicePill;
