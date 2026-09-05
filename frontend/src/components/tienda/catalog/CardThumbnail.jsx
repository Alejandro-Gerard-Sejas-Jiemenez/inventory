import React from 'react';
import { XCircle, Image as ImageIcon } from 'lucide-react';

/**
 * Contenedor de Fotografía y Badges de Producto.
 * Responsabilidad: Representación visual del producto con proporción óptica y badges de estado.
 */
export function CardThumbnail({
  mainImage,
  nombre,
  marcaNombre = 'Los Caseritos',
  categoriaNombre,
  isOutOfStock,
}) {
  return (
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
          alt={nombre}
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
            {marcaNombre}
          </span>
        </div>
      )}

      {/* Micro-Insignias Flotantes */}
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

        {categoriaNombre && (
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
            {categoriaNombre}
          </span>
        )}
      </div>
    </div>
  );
}

export default CardThumbnail;
