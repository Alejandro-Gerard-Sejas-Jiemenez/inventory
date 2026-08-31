import React, { useState } from 'react';
import { ShoppingCart, Check, XCircle, Image as ImageIcon } from 'lucide-react';

export function ProductoCard({ producto, onAddToCart, cartQuantity = 0 }) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const stockActual = producto.stockActual ?? 0;
  const isOutOfStock = stockActual <= 0;
  const remainingStock = Math.max(0, stockActual - cartQuantity);

  const handleAdd = () => {
    if (isOutOfStock || remainingStock <= 0) return;
    onAddToCart(producto);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 900);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isOutOfStock ? 0.7 : 1,
      }}
      className="shein-product-card"
    >
      {/* Contenedor de Imagen */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '92%',
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden',
        }}
      >
        {producto.imagenUrl ? (
          <img
            src={producto.imagenUrl}
            alt={producto.nombre}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.35s ease',
            }}
            className="shein-product-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
            }}
          >
            <ImageIcon size={38} opacity={0.35} />
          </div>
        )}

        {/* Badges Flotantes de Estado (Solo si está agotado o categoría) */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.65rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            zIndex: 2,
          }}
        >
          {isOutOfStock && (
            <span
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.92)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.22rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                letterSpacing: '0.02em',
              }}
            >
              <XCircle size={11} />
              Agotado
            </span>
          )}

          {producto.categoria?.nombre && (
            <span
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                color: 'var(--text-secondary)',
                fontSize: '0.66rem',
                fontWeight: 600,
                padding: '0.18rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.08)',
                width: 'fit-content',
              }}
            >
              {producto.categoria.nombre}
            </span>
          )}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.45rem' }}>
        {/* Marca & Modelo sutil */}
        <div style={{ fontSize: '0.72rem', color: 'var(--brand-gold)', fontWeight: 600, letterSpacing: '0.02em' }}>
          {producto.modelo?.marca?.nombre || 'Los Caseritos'} {producto.modelo?.nombre ? `· ${producto.modelo.nombre}` : ''}
        </div>

        {/* Nombre del Producto */}
        <h4
          style={{
            margin: 0,
            fontSize: '0.88rem',
            color: 'var(--text-white)',
            fontWeight: 600,
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4rem',
          }}
          title={producto.nombre}
        >
          {producto.nombre}
        </h4>

        {/* Atributos: Muestra de Color y Material */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
          {producto.color && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '2px',
                  backgroundColor: producto.color.codigoHex || '#888',
                  border: '1px solid rgba(255,255,255,0.25)',
                  display: 'inline-block',
                }}
              />
              <span>{producto.color.nombre}</span>
            </div>
          )}
          {producto.material?.nombre && (
            <span>· {producto.material.nombre}</span>
          )}
        </div>

        {/* Precio & Acción de Compra */}
        <div style={{ marginTop: 'auto', paddingTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Precio</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
              Bs. {Number(producto.precioUnitario).toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock || remainingStock <= 0}
            style={{
              padding: '0.5rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: isOutOfStock
                ? 'var(--bg-secondary)'
                : addedAnimation
                ? 'var(--brand-green)'
                : 'var(--brand-gold)',
              color: isOutOfStock ? 'var(--text-muted)' : '#111',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: isOutOfStock || remainingStock <= 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.15s ease',
              transform: addedAnimation ? 'scale(1.05)' : 'scale(1)',
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
      </div>
    </div>
  );
}
