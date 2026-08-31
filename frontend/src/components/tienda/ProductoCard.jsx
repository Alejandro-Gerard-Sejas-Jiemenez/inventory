import React, { useState } from 'react';
import { ShoppingCart, Check, XCircle, Image as ImageIcon } from 'lucide-react';

export function ProductoCard({ producto, onAddToCart, cartQuantity = 0 }) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const stockActual = producto.stockActual ?? 0;
  const isOutOfStock = stockActual <= 0;
  const remainingStock = Math.max(0, stockActual - cartQuantity);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isOutOfStock || remainingStock <= 0) return;
    onAddToCart(producto);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        opacity: isOutOfStock ? 0.65 : 1,
        cursor: 'default',
      }}
      className="apple-glass-card"
    >
      {/* Contenedor de Fotografía con Proporción Óptica Apple */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '96%', // Proporción áurea casi cuadrada
          backgroundColor: 'rgba(10, 14, 23, 0.6)',
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
              transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              background: 'radial-gradient(circle at center, rgba(30, 41, 59, 0.6) 0%, rgba(11, 15, 25, 0.9) 100%)',
              color: 'var(--text-muted)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-gold)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              <ImageIcon size={22} opacity={0.8} />
            </div>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
              {producto.modelo?.marca?.nombre || 'Los Caseritos'}
            </span>
          </div>
        )}

        {/* Micro-Insignias Flotantes con Cristal Esmerilado */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.65rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            zIndex: 2,
          }}
        >
          {isOutOfStock && (
            <span
              style={{
                backgroundColor: 'rgba(220, 38, 38, 0.88)',
                color: '#fff',
                fontSize: '0.66rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                letterSpacing: '0.03em',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
              }}
            >
              <XCircle size={11} />
              Agotado
            </span>
          )}

          {producto.categoria?.nombre && (
            <span
              style={{
                backgroundColor: 'rgba(11, 15, 25, 0.72)',
                color: 'var(--text-secondary)',
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                width: 'fit-content',
                letterSpacing: '0.02em',
              }}
            >
              {producto.categoria.nombre}
            </span>
          )}
        </div>
      </div>

      {/* Cuerpo de la Tarjeta con Tipografía Óptica */}
      <div
        style={{
          padding: '0.95rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '0.4rem',
        }}
      >
        {/* Marca y Modelo con Tracking Preciso */}
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--brand-gold)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          {producto.modelo?.marca?.nombre || 'Los Caseritos'} {producto.modelo?.nombre ? `· ${producto.modelo.nombre}` : ''}
        </div>

        {/* Título de Producto */}
        <h4
          style={{
            margin: 0,
            fontSize: '0.9rem',
            color: 'var(--text-white)',
            fontWeight: 600,
            lineHeight: 1.32,
            letterSpacing: '-0.015em',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
          {producto.color && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: producto.color.codigoHex || '#888',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'inline-block',
                  boxShadow: '0 0 4px rgba(0,0,0,0.5)',
                }}
              />
              <span>{producto.color.nombre}</span>
            </div>
          )}
          {producto.material?.nombre && (
            <span>· {producto.material.nombre}</span>
          )}
        </div>

        {/* Barra Inferior: Precio & Botón Táctil Apple */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
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
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--brand-gold)',
                lineHeight: 1.1,
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '2px' }}>Bs.</span>
              {Number(producto.precioUnitario).toFixed(2)}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isOutOfStock || remainingStock <= 0}
            className="apple-btn-tactile"
            style={{
              padding: '0.52rem 0.9rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: isOutOfStock
                ? 'rgba(255, 255, 255, 0.05)'
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
              boxShadow: isOutOfStock ? 'none' : '0 2px 10px rgba(245, 158, 11, 0.25)',
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
