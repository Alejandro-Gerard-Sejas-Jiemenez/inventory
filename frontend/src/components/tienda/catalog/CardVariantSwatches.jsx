import React from 'react';

/**
 * Atributos visuales de la tarjeta de producto.
 * Responsabilidad: Desplegar el título, compatibilidad de modelos, material y swatches de color.
 */
export function CardVariantSwatches({
  nombre,
  availableModels = [],
  materialNombre,
  availableColors = [],
}) {
  return (
    <>
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
        title={nombre}
      >
        {nombre}
      </h4>

      {/* Atributos: Modelos de Celular, Material y Colores */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.1rem' }}>
        {availableModels.length > 0 && (
          <div style={{ fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Modelo:</span>
            <span style={{ color: 'var(--text-white)', fontWeight: 600 }}>
              {availableModels.slice(0, 2).join(', ')}{availableModels.length > 2 ? ` +${availableModels.length - 2}` : ''}
            </span>
          </div>
        )}

        {materialNombre && (
          <div style={{ fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>Material:</span>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{materialNombre}</span>
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
    </>
  );
}

export default CardVariantSwatches;
