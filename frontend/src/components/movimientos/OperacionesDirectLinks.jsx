import React from 'react';
import { ShoppingCart, Truck, ArrowRight } from 'lucide-react';

/**
 * Enlaces rápidos a Punto de Venta y Órdenes de Compra desde el modal de movimientos.
 */
export function OperacionesDirectLinks({ onGoToVentas, onGoToCompras }) {
  return (
    <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
        ¿Necesitas registrar operaciones comerciales completas?
      </span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <button
          type="button"
          onClick={onGoToVentas}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShoppingCart size={14} style={{ color: 'var(--brand-gold)' }} />
            <span>Punto de Venta</span>
          </div>
          <ArrowRight size={12} />
        </button>

        <button
          type="button"
          onClick={onGoToCompras}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Truck size={14} style={{ color: 'var(--brand-gold)' }} />
            <span>Orden de Compra</span>
          </div>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
