import React from 'react';
import { ShoppingBag, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { CarritoItem } from './CarritoItem';

/**
 * Drawer deslizante lateral para la visualización y gestión de la bolsa de compras.
 * Responsabilidad: Vista general de la bolsa, cálculo de totales y checkout.
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
                  Explora el catálogo y agrega los productos que desees comprar
                </span>
              </div>
              <Button variant="brand" size="sm" onClick={onClose} style={{ marginTop: '0.5rem' }}>
                Ver Productos
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <CarritoItem
                key={item.idProducto}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </div>

        {/* Footer con Resumen y Botón de Checkout */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: '1.2rem',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Subtotal estimado:</span>
              <span style={{ color: 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem' }}>
                Bs. {Number(total).toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-color)', paddingTop: '0.6rem' }}>
              <span style={{ color: 'var(--text-white)', fontSize: '1.05rem', fontWeight: 800 }}>Total a Pagar:</span>
              <span style={{ color: 'var(--brand-gold)', fontSize: '1.35rem', fontWeight: 800 }}>
                Bs. {Number(total).toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--brand-green)', justifyContent: 'center' }}>
              <ShieldCheck size={14} />
              <span>Coordinación directa y confirmación por WhatsApp</span>
            </div>

            <Button
              variant="brand"
              size="lg"
              icon={ArrowRight}
              onClick={onCheckout}
              style={{ width: '100%', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', padding: '0.85rem' }}
            >
              Completar Datos y Pedir por WhatsApp
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
