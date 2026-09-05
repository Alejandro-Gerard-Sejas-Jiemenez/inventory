import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';

/**
 * Barra inferior de la tarjeta de producto.
 * Responsabilidad: Mostrar precio y gestionar la interacción táctil de adición rápida a la bolsa.
 */
export function CardBottomBar({
  precioUnitario = 0,
  isOutOfStock,
  remainingStock,
  addedAnimation,
  cartQuantity = 0,
  onAdd,
}) {
  return (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-color)',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '0.64rem',
            color: 'var(--text-muted)',
            display: 'block',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Precio
        </span>
        <div
          className="apple-price-typography"
          style={{
            fontSize: '1.18rem',
            fontWeight: 800,
            color: 'var(--brand-gold)',
            lineHeight: 1.1,
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '2px' }}>Bs.</span>
          {Number(precioUnitario).toFixed(2)}
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={isOutOfStock || remainingStock <= 0}
        className="apple-btn-tactile"
        style={{
          padding: '0.52rem 0.95rem',
          borderRadius: '999px',
          border: 'none',
          backgroundColor: isOutOfStock
            ? 'var(--border-color)'
            : addedAnimation
            ? 'var(--brand-green)'
            : 'var(--brand-gold)',
          color: isOutOfStock ? 'var(--text-muted)' : 'var(--bg-primary)',
          fontWeight: 800,
          fontSize: '0.8rem',
          cursor: isOutOfStock || remainingStock <= 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          boxShadow: isOutOfStock ? 'none' : '0 2px 10px var(--brand-gold-glow)',
        }}
      >
        {isOutOfStock ? (
          <span>Agotado</span>
        ) : addedAnimation ? (
          <>
            <Check size={14} />
            <span>Listo</span>
          </>
        ) : (
          <>
            <ShoppingCart size={14} />
            <span>{cartQuantity > 0 ? `+${cartQuantity}` : 'Agregar'}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default CardBottomBar;
