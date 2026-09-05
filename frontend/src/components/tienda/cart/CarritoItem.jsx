import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import { CarritoItemAttributes } from './CarritoItemAttributes';
import { CarritoItemQuantityStepper } from './CarritoItemQuantityStepper';

/**
 * Fila individual de producto dentro del Drawer de la Bolsa de Compras.
 * Responsabilidad: Orquestar la presentación, eliminación y ajuste de un producto en el carrito.
 */
export function CarritoItem({ item, onUpdateQuantity, onRemoveItem }) {
  const maxStock = item.stockActual ?? 999;
  const reachedLimit = item.cantidad >= maxStock;

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

        {/* Atributos: Modelo y Color */}
        <CarritoItemAttributes
          modelo={item.modeloSeleccionado || item.modelo?.nombre}
          color={item.colorSeleccionado || item.color?.nombre}
          colorHex={item.colorHex || item.color?.codigoHex}
        />

        {/* Selector de Cantidad y Precio */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.35rem' }}>
          <CarritoItemQuantityStepper
            cantidad={item.cantidad}
            reachedLimit={reachedLimit}
            onIncrement={() => onUpdateQuantity(item.cartItemId || item.idProducto, item.cantidad + 1)}
            onDecrement={() => onUpdateQuantity(item.cartItemId || item.idProducto, item.cantidad - 1)}
          />

          <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--brand-gold)' }}>
            Bs. {(Number(item.precioUnitario) * item.cantidad).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CarritoItem;
