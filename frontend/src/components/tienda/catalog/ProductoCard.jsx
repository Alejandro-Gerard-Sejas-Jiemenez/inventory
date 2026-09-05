import React, { useState } from 'react';
import { useProductoCardVariants } from './useProductoCardVariants';
import { CardThumbnail } from './CardThumbnail';
import { CardVariantSwatches } from './CardVariantSwatches';
import { CardBottomBar } from './CardBottomBar';

/**
 * Tarjeta de Producto e-commerce para la tienda pública.
 * Responsabilidad: Orquestar la presentación de un producto en la cuadrícula de catálogo.
 */
export function ProductoCard({ producto, onAddToCart, onOpenDetail, cartQuantity = 0 }) {
  const [addedAnimation, setAddedAnimation] = useState(false);

  const {
    stockActual,
    isOutOfStock,
    remainingStock,
    mainImage,
    availableModels,
    availableColors,
  } = useProductoCardVariants(producto, cartQuantity);

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
      {/* 1. Fotografía y Badges de Estado */}
      <CardThumbnail
        mainImage={mainImage}
        nombre={producto.nombre}
        marcaNombre={producto.modelo?.marca?.nombre}
        categoriaNombre={producto.categoria?.nombre}
        isOutOfStock={isOutOfStock}
      />

      {/* 2. Cuerpo de la Tarjeta */}
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
        <CardVariantSwatches
          nombre={producto.nombre}
          availableModels={availableModels}
          materialNombre={producto.material?.nombre}
          availableColors={availableColors}
        />

        <CardBottomBar
          precioUnitario={producto.precioUnitario}
          isOutOfStock={isOutOfStock}
          remainingStock={remainingStock}
          addedAnimation={addedAnimation}
          cartQuantity={cartQuantity}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
}

export default ProductoCard;
