import React, { useState } from 'react';
import { ShoppingCart, Check, XCircle, Image as ImageIcon } from 'lucide-react';

export function ProductoCard({ producto, onAddToCart, onOpenDetail, cartQuantity = 0 }) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const stockActual = (producto.variantes && producto.variantes.length > 0)
    ? producto.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0)
    : (producto.stockActual ?? 0);
  const isOutOfStock = stockActual <= 0;
  const remainingStock = Math.max(0, stockActual - cartQuantity);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (isOutOfStock || remainingStock <= 0) return;
    onAddToCart(producto);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(producto);
    }
  };

  const mainImage = (producto.imagenes && producto.imagenes.length > 0 && producto.imagenes[0]?.url) || producto.imagenUrl;

  const availableModels = React.useMemo(() => {
    const modelsSet = new Set();
    if (producto.modelo?.nombre) {
      modelsSet.add(producto.modelo.nombre);
    }
    if (Array.isArray(producto.variantes)) {
      producto.variantes.forEach((v) => {
        if (v.modelo?.nombre) {
          modelsSet.add(v.modelo.nombre);
        }
      });
    }
    return Array.from(modelsSet);
  }, [producto]);

  const availableColors = React.useMemo(() => {
    const colorsMap = new Map();

    if (producto.color?.nombre) {
      colorsMap.set(producto.color.nombre, {
        nombre: producto.color.nombre,
        hex: producto.color.codigoHex || '#888888',
      });
    }

    if (Array.isArray(producto.variantes)) {
      producto.variantes.forEach((v) => {
        if (v.color?.nombre) {
          colorsMap.set(v.color.nombre, {
            nombre: v.color.nombre,
            hex: v.color.codigoHex || '#888888',
          });
        }
      });
    }

    return Array.from(colorsMap.values());
  }, [producto]);

  return (
    <div
      onClick={handleCardClick}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        opacity: isOutOfStock ? 0.65 : 1,
        cursor: 'pointer',
      }}
      className="apple-glass-card"
    >
      {/* Contenedor de Fotografía con Proporción Óptica Apple */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '96%',
          backgroundColor: 'var(--bg-secondary)',
          overflow: 'hidden',
        }}
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt={producto.nombre}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '0.4rem',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
              background: 'radial-gradient(circle at center, var(--border-light) 0%, var(--bg-secondary) 100%)',
              color: 'var(--text-muted)',
            }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-gold)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <ImageIcon size={24} opacity={0.85} />
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
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
                backgroundColor: 'var(--brand-red)',
                color: '#fff',
                fontSize: '0.66rem',
                fontWeight: 700,
                padding: '0.2rem 0.55rem',
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
                backgroundColor: 'var(--bg-glass)',
                color: 'var(--text-secondary)',
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: '999px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-card)',
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
          padding: '0.9rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          gap: '0.4rem',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {/* Título de Producto */}
        <h4
          style={{
            margin: 0,
            fontSize: '1.02rem',
            color: 'var(--text-white)',
            fontWeight: 800,
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.6rem',
          }}
          title={producto.nombre}
        >
          {producto.nombre}
        </h4>

        {/* Atributos: Modelos de Celular, Material y Colores Disponibles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.1rem' }}>
          {availableModels.length > 0 && (
            <div style={{ fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Modelo:</span>
              <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
                {availableModels.slice(0, 2).join(', ')}{availableModels.length > 2 ? ` +${availableModels.length - 2}` : ''}
              </span>
            </div>
          )}

          {producto.material?.nombre && (
            <div style={{ fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Material:</span>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{producto.material.nombre}</span>
            </div>
          )}

          {availableColors.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Colores:
              </span>
              {availableColors.map((c, idx) => (
                <div
                  key={idx}
                  title={`Color: ${c.nombre}`}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.35)',
                    display: 'inline-block',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Barra Inferior: Precio & Botón Táctil Apple */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
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
                fontSize: '1.18rem',
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
              padding: '0.52rem 0.95rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: isOutOfStock
                ? 'var(--border-color)'
                : addedAnimation
                ? 'var(--brand-green)'
                : 'var(--brand-gold)',
              color: isOutOfStock ? 'var(--text-muted)' : 'var(--bg-primary)',
              fontWeight: 800,
              fontSize: '0.8rem',
              cursor: isOutOfStock || remainingStock <= 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: isOutOfStock ? 'none' : '0 2px 10px var(--brand-gold-glow)',
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
