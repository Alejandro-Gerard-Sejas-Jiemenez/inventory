import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../../common/Button';

/**
 * Estado vacío para la bolsa de compras.
 * Responsabilidad: Mensaje informativo y CTA cuando no hay productos en el carrito.
 */
export function CarritoEmptyState({ onClose }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'var(--text-muted)',
        gap: '0.8rem',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ShoppingBag size={28} opacity={0.4} />
      </div>
      <div>
        <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem', display: 'block' }}>
          Tu bolsa está vacía
        </strong>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Explora el catálogo y agrega las fundas que desees comprar
        </span>
      </div>
      <Button variant="brand" size="sm" onClick={onClose} style={{ marginTop: '0.5rem' }}>
        Ver Fundas
      </Button>
    </div>
  );
}

export default CarritoEmptyState;
