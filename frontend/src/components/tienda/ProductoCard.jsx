import React, { useState } from 'react';
import { ShoppingCart, Check, AlertTriangle, XCircle, Image as ImageIcon } from 'lucide-react';

export function ProductoCard({ producto, onAddToCart, cartQuantity = 0 }) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const stockActual = producto.stockActual ?? 0;
  const isOutOfStock = stockActual <= 0;
  const isLowStock = !isOutOfStock && stockActual <= (producto.stockMinimo ?? 5);
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
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        opacity: isOutOfStock ? 0.75 : 1,
      }}
      className="shein-product-card"
    >
      {/* Contenedor de Fotografía */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '85%', // Aspect ratio rectangular moderno
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
              transition: 'transform 0.3s ease',
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
            <ImageIcon size={42} opacity={0.4} />
          </div>
        )}

        {/* Badges Flotantes de Estado / Stock */}
        <div
          style={{
            position: 'absolute',
            top: '0.6rem',
            left: '0.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            zIndex: 2,
          }}
        >
          {isOutOfStock ? (
            <span
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.92)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <XCircle size={12} />
              Agotado
            </span>
          ) : isLowStock ? (
            <span
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.95)',
                color: '#111',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.25rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <AlertTriangle size={12} />
              ¡Solo quedan {stockActual}!
            </span>
          ) : (
            <span
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
              }}
            >
              En Stock ({stockActual})
            </span>
          )}

          {producto.categoria?.nombre && (
            <span
              style={{
                backgroundColor: 'rgba(17, 24, 39, 0.85)',
                color: 'var(--text-secondary)',
                fontSize: '0.68rem',
                fontWeight: 600,
                padding: '0.2rem 0.45rem',
                borderRadius: 'var(--radius-sm)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.1)',
                width: 'fit-content',
              }}
            >
              {producto.categoria.nombre}
            </span>
          )}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div style={{ padding: '0.9rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.5rem' }}>
        {/* Marca y Modelo */}
        <div style={{ fontSize: '0.74rem', color: 'var(--brand-gold)', fontWeight: 600 }}>
          {producto.modelo?.marca?.nombre || 'Los Caseritos'} {producto.modelo?.nombre ? `· ${producto.modelo.nombre}` : ''}
        </div>

        {/* Título del Producto */}
        <h4
          style={{
            margin: 0,
            fontSize: '0.92rem',
            color: 'var(--text-white)',
            fontWeight: 700,
            lineHeight: 1.3,
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

        {/* Atributos: Color y Material */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {producto.color && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '3px',
                  backgroundColor: producto.color.codigoHex || '#888',
                  border: '1px solid rgba(255,255,255,0.3)',
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
        <div style={{ marginTop: 'auto', paddingTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Precio Oferta</span>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
              Bs. {Number(producto.precioUnitario).toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock || remainingStock <= 0}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: isOutOfStock
                ? 'var(--bg-secondary)'
                : addedAnimation
                ? 'var(--brand-green)'
                : 'var(--brand-gold)',
              color: isOutOfStock ? 'var(--text-muted)' : '#111',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: isOutOfStock || remainingStock <= 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'var(--transition)',
              transform: addedAnimation ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            {isOutOfStock ? (
              <span>Agotado</span>
            ) : addedAnimation ? (
              <>
                <Check size={15} />
                <span>¡Listo!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                <span>{cartQuantity > 0 ? `Agregar (+${cartQuantity})` : 'Agregar'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
