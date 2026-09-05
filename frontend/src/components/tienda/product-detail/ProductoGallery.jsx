import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

/**
 * Galería fotográfica de alta fidelidad para el detalle del producto.
 * Responsabilidad: Vista previa principal, marco óptico y navegación de miniaturas.
 */
export function ProductoGallery({
  allImages = [],
  selectedImageIndex = 0,
  onSelectImage,
  productName = '',
  brandName = '',
}) {
  const mainImage = allImages[selectedImageIndex] || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      {/* Marco de Fotografía Principal con Cristal Óptico */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1/1',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: '#09090D',
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {mainImage ? (
          <img
            src={mainImage}
            alt={productName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-gold)',
              }}
            >
              <ImageIcon size={28} opacity={0.8} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em' }}>
              {brandName || 'Los Caseritos'}
            </span>
          </div>
        )}
      </div>

      {/* Miniaturas de la Galería si hay más de 1 foto */}
      {allImages.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.2rem',
            scrollbarWidth: 'none',
          }}
        >
          {allImages.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectImage(idx)}
              className="apple-btn-tactile"
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '12px',
                padding: '2px',
                backgroundColor: '#09090D',
                border: selectedImageIndex === idx ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                overflow: 'hidden',
                flexShrink: 0,
                opacity: selectedImageIndex === idx ? 1 : 0.65,
                transition: 'all 0.15s ease',
              }}
            >
              <img
                src={imgUrl}
                alt={`Miniatura ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductoGallery;
