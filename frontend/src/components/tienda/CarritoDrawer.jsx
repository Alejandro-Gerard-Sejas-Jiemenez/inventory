import React from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export function CarritoDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
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
                padding: '0.4rem',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
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
            cartItems.map((item) => {
              const maxStock = item.stockActual ?? 999;
              const reachedLimit = item.cantidad >= maxStock;

              return (
                <div
                  key={item.idProducto}
                  style={{
                    display: 'flex',
                    gap: '0.85rem',
                    padding: '0.85rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {/* Foto Miniatura */}
                  <div
                    style={{
                      width: '65px',
                      height: '65px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-primary)',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {item.imagenUrl ? (
                      <img
                        src={item.imagenUrl}
                        alt={item.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <ShoppingBag size={22} opacity={0.3} />
                      </div>
                    )}
                  </div>

                  {/* Datos del Producto */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <strong
                        style={{
                          fontSize: '0.86rem',
                          color: 'var(--text-white)',
                          lineHeight: 1.2,
                        }}
                      >
                        {item.nombre}
                      </strong>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.idProducto)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        title="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {item.modelo?.nombre || ''} {item.color ? `· ${item.color.nombre}` : ''}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.3rem' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
                        Bs. {Number(item.precioUnitario).toFixed(2)}
                      </span>

                      {/* Controles de Cantidad */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.idProducto, item.cantidad - 1)}
                          style={{
                            padding: '0.3rem 0.5rem',
                            border: 'none',
                            background: 'none',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          style={{
                            padding: '0.2rem 0.5rem',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: 'var(--text-white)',
                            minWidth: '24px',
                            textAlign: 'center',
                          }}
                        >
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.idProducto, item.cantidad + 1)}
                          disabled={reachedLimit}
                          style={{
                            padding: '0.3rem 0.5rem',
                            border: 'none',
                            background: 'none',
                            color: reachedLimit ? 'var(--text-muted)' : 'var(--text-secondary)',
                            cursor: reachedLimit ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title={reachedLimit ? 'Límite de stock alcanzado' : 'Añadir otra unidad'}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {reachedLimit && (
                      <span style={{ fontSize: '0.68rem', color: 'var(--brand-gold)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <AlertCircle size={10} /> Máx. disponible en stock ({maxStock})
                      </span>
                    )}
                  </div>
                </div>
              );
            })
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
              onClick={onProceedToCheckout}
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
