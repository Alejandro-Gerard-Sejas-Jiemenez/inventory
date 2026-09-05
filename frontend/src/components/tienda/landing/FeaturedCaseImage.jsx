import React from 'react';

/**
 * Fotografía y tarjeta de producto destacada editorial.
 * Responsabilidad: Despliegue de imagen con marco óptico y sombras de alta fidelidad.
 */
export function FeaturedCaseImage({ imgUrl, nombre }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="apple-glass-card"
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '1.2rem',
          borderRadius: '2.5rem',
          boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1.15',
            borderRadius: '2rem',
            overflow: 'hidden',
            backgroundColor: '#09090D',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src={imgUrl}
            alt={nombre}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedCaseImage;
