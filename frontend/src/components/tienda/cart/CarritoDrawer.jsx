import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { CarritoItem } from './CarritoItem';
import { CarritoEmptyState } from './CarritoEmptyState';
import { CarritoDrawerFooter } from './CarritoDrawerFooter';

/**
 * Drawer deslizante lateral para la visualización y gestión de la bolsa de compras.
 * Responsabilidad: Vista general de la bolsa y orquestador del listado de productos y checkout.
 */
export function CarritoDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.cantidad * item.precioUnitario,
    0
  );

  const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          animation: 'slideLeft 0.25s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Carrito */}
        <div
          style={{
            padding: '1.2rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-gold-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} style={{ color: 'var(--brand-gold)' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-white)' }}>
                Bolsa de Pedidos
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {totalUnits} {totalUnits === 1 ? 'artículo seleccionado' : 'artículos seleccionados'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                }}
                title="Vaciar Carrito"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.3rem',
                display: 'flex',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Lista de Productos en el Carrito */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {cartItems.length === 0 ? (
            <CarritoEmptyState onClose={onClose} />
          ) : (
            cartItems.map((item) => (
              <CarritoItem
                key={item.cartItemId || item.idProducto}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </div>

        {/* Footer con Resumen y Botón de Checkout */}
        {cartItems.length > 0 && (
          <CarritoDrawerFooter total={total} onCheckout={onCheckout} />
        )}
      </div>
    </div>
  );
}

export default CarritoDrawer;
