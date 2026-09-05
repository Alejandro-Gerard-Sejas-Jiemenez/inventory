import React, { useState, useMemo } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { ProductoGallery } from './ProductoGallery';
import { ProductoVariantSelector } from './ProductoVariantSelector';
import { ProductoPurchaseBar } from './ProductoPurchaseBar';
import { useProductoDetalleVariants } from './useProductoDetalleVariants';

/**
 * Modal de Detalle de Producto para la Tienda Pública de Clientes.
 * Responsabilidad: Orquestar el diálogo modal del producto y coordinar galería, variantes y barra de compra.
 */
export function ProductoDetalleModal({ producto, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !producto) return null;

  const allImages = useMemo(() => {
    if (producto.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes.map((img) => img.url);
    }
    return producto.imagenUrl ? [producto.imagenUrl] : [];
  }, [producto]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const {
    cantidad,
    setCantidad,
    addedAnimation,
    modelosUnicos,
    selectedModelo,
    handleSelectModelo,
    coloresDelModelo,
    selectedColorName,
    setSelectedColorName,
    currentVariantStock,
    isOutOfStock,
    reachedLimit,
    handleAddToCart,
  } = useProductoDetalleVariants(producto, onAddToCart, onClose);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.2rem',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="apple-modal-content"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-modal), 0 30px 60px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de Cierre */}
        <button
          type="button"
          onClick={onClose}
          className="apple-btn-tactile"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Contenido en Dos Columnas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {/* Columna Izquierda: Galería de Imágenes */}
          <div style={{ padding: '1.8rem', borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
            <ProductoGallery
              images={allImages}
              nombre={producto.nombre}
              selectedIndex={selectedImageIndex}
              onSelectIndex={setSelectedImageIndex}
              marcaNombre={producto.modelo?.marca?.nombre}
            />
          </div>

          {/* Columna Derecha: Información Técnica y Compra */}
          <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>
                {producto.categoria?.nombre || 'Accesorio Premium'}
              </span>
              <h2 style={{ margin: '0.2rem 0 0.5rem', fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-white)' }}>
                {producto.nombre}
              </h2>
              {producto.descripcion && (
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {producto.descripcion}
                </p>
              )}
            </div>

            {/* Selector Síncrono de Modelos y Colores */}
            <ProductoVariantSelector
              modelosUnicos={modelosUnicos}
              selectedModelo={selectedModelo}
              onSelectModelo={handleSelectModelo}
              coloresDelModelo={coloresDelModelo}
              selectedColorName={selectedColorName}
              onSelectColor={setSelectedColorName}
              materialNombre={producto.material?.nombre}
              isOutOfStock={isOutOfStock}
              currentVariantStock={currentVariantStock}
            />

            {/* Beneficio de Garantía */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--brand-green)' }}>
              <ShieldCheck size={16} />
              <span>Garantía de ajuste milimétrico para tu dispositivo</span>
            </div>

            {/* Barra de Compra y Botón Táctil */}
            <ProductoPurchaseBar
              precioUnitario={producto.precioUnitario}
              cantidad={cantidad}
              onIncrement={() => setCantidad((prev) => Math.min(prev + 1, currentVariantStock))}
              onDecrement={() => setCantidad((prev) => Math.max(prev - 1, 1))}
              onAddToCart={handleAddToCart}
              isOutOfStock={isOutOfStock}
              reachedLimit={reachedLimit}
              addedAnimation={addedAnimation}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalleModal;
