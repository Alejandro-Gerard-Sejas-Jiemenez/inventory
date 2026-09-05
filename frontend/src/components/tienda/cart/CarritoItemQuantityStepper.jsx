import React from 'react';
import { Plus, Minus } from 'lucide-react';

/**
 * Stepper de cantidad para ítem del carrito.
 * Responsabilidad: Control de incremento y decremento de unidades con validación de límite de stock.
 */
export function CarritoItemQuantityStepper({
  cantidad,
  reachedLimit,
  onIncrement,
  onDecrement,
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <button
        type="button"
        onClick={onDecrement}
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Minus size={13} />
      </button>
      <span style={{ minWidth: '22px', textAlign: 'center', fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-white)' }}>
        {cantidad}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        disabled={reachedLimit}
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-primary)',
          color: reachedLimit ? 'var(--text-muted)' : 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: reachedLimit ? 'not-allowed' : 'pointer',
          opacity: reachedLimit ? 0.4 : 1,
        }}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

export default CarritoItemQuantityStepper;
