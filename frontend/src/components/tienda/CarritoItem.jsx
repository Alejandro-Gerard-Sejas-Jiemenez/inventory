import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

/**
 * Fila individual de producto dentro del Drawer de la Bolsa de Compras.
 * Responsabilidad: Control de cantidad, precio unitario, subtotal y eliminación.
 */
export function CarritoItem({ item, onUpdateQuantity, onRemoveItem }) {
  const maxStock = item.stockActual ?? 999;
  const reachedLimit = item.cantidad >= maxStock;

  return (
    <div
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
              color: 'var(--brand-red)',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
            }}
            title="Quitar producto"
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Atributos */}
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {item.color?.nombre && <span>Color: {item.color.nombre}</span>}
          {item.material?.nombre && <span>· {item.material.nombre}</span>}
        </div>

        {/* Selector de Cantidad y Precio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.idProducto, item.cantidad - 1)}
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
              {item.cantidad}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.idProducto, item.cantidad + 1)}
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

          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-gold)' }}>
            Bs. {(Number(item.precioUnitario) * item.cantidad).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
