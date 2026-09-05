import React from 'react';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';

/**
 * Barra de Compra y Acción del Detalle de Producto.
 * Responsabilidad: Contador de unidades, cálculo de total y botón de añadir a la bolsa.
 */
export function ProductoPurchaseBar({
  precioUnitario = 0,
  cantidad = 1,
  onIncrement,
  onDecrement,
  onAddToCart,
  isOutOfStock = false,
  reachedLimit = false,
  addedAnimation = false,
}) {
  const total = Number(precioUnitario || 0) * cantidad;

  return (
    <div
      style={{
        marginTop: 'auto',
        paddingTop: '1.2rem',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Desglose de Precio */}
        <div>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600, display: 'block' }}>
            Precio Unitario
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--brand-gold)' }}>
              Bs. {Number(precioUnitario).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Contador de Unidades */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <button
            type="button"
            onClick={onDecrement}
            disabled={cantidad <= 1 || isOutOfStock}
            className="apple-btn-tactile"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: cantidad <= 1 || isOutOfStock ? 'not-allowed' : 'pointer',
              opacity: cantidad <= 1 || isOutOfStock ? 0.35 : 1,
            }}
          >
            <Minus size={14} />
          </button>

          <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 800, fontSize: '0.96rem', color: 'var(--text-white)' }}>
            {cantidad}
          </span>

          <button
            type="button"
            onClick={onIncrement}
            disabled={reachedLimit || isOutOfStock}
            className="apple-btn-tactile"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: reachedLimit || isOutOfStock ? 'var(--text-muted)' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: reachedLimit || isOutOfStock ? 'not-allowed' : 'pointer',
              opacity: reachedLimit || isOutOfStock ? 0.35 : 1,
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Botón Principal de Añadir */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={isOutOfStock}
        className="apple-btn-tactile"
        style={{
          width: '100%',
          padding: '0.85rem 1.4rem',
          borderRadius: '999px',
          border: 'none',
          backgroundColor: isOutOfStock
            ? 'var(--border-color)'
            : addedAnimation
            ? 'var(--brand-green)'
            : 'var(--brand-gold)',
          color: isOutOfStock ? 'var(--text-muted)' : '#111',
          fontWeight: 800,
          fontSize: '0.92rem',
          cursor: isOutOfStock ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.55rem',
          boxShadow: isOutOfStock ? 'none' : '0 4px 18px var(--brand-gold-glow)',
          transition: 'all 0.15s ease',
        }}
      >
        {isOutOfStock ? (
          <span>Sin Stock Disponible</span>
        ) : addedAnimation ? (
          <>
            <Check size={18} />
            <span>¡Agregado a la Bolsa!</span>
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            <span>Agregar {cantidad > 1 ? `(${cantidad}) por Bs. ${total.toFixed(2)}` : 'a la Bolsa'}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default ProductoPurchaseBar;
