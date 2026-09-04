import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

/**
 * Fila individual de producto dentro del Drawer de la Bolsa de Compras.
 * Responsabilidad: Control de cantidad, precio unitario, subtotal y eliminación.
 */
export function CarritoItem({ item, onUpdateQuantity, onRemoveItem }) {
  const maxStock = item.stockActual ?? 999;
  const reachedLimit = item.cantidad >= maxStock;

  // Resolución segura de la URL de la imagen (soporta múltiples formatos de datos)
  const displayImage =
    item.imagenUrl ||
    (Array.isArray(item.imagenesUrls) && item.imagenesUrls[0]) ||
    (Array.isArray(item.imagenes) && (item.imagenes[0]?.url || (typeof item.imagenes[0] === 'string' && item.imagenes[0]))) ||
    item.fotoUrl ||
    null;

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
        {displayImage ? (
          <img
            src={displayImage}
            alt={item.nombre}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
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
            onClick={() => onRemoveItem(item.cartItemId || item.idProducto)}
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

        {/* Atributos: Modelo de Celular y Color Seleccionado */}
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.15rem' }}>
          {(item.modeloSeleccionado || item.modelo?.nombre) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Modelo:</span>
              <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>{item.modeloSeleccionado || item.modelo?.nombre}</span>
            </div>
          )}
          {(item.colorSeleccionado || item.color?.nombre) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Color:</span>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: item.colorHex || item.color?.codigoHex || 'var(--text-muted)',
                  display: 'inline-block',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              />
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{item.colorSeleccionado || item.color?.nombre}</span>
            </div>
          )}
        </div>

        {/* Selector de Cantidad y Precio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.35rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.cartItemId || item.idProducto, item.cantidad - 1)}
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
              onClick={() => onUpdateQuantity(item.cartItemId || item.idProducto, item.cantidad + 1)}
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
