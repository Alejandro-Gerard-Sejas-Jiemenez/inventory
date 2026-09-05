import React, { useState, useMemo } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { ProductoGallery } from './ProductoGallery';
import { ProductoVariantSelector } from './ProductoVariantSelector';
import { ProductoPurchaseBar } from './ProductoPurchaseBar';

// Helper síncrono para obtener colores por modelo
const getColorsForModel = (producto, modelName) => {
  if (!Array.isArray(producto?.variantes) || producto.variantes.length === 0) {
    if (producto?.color?.nombre) {
      return [{
        nombre: producto.color.nombre,
        hex: producto.color.codigoHex || '#888888',
        variante: null,
      }];
    }
    return [];
  }

  const map = new Map();
  producto.variantes.forEach((v) => {
    const nombreMod = v.modelo?.nombre || producto.modelo?.nombre;
    if (!modelName || nombreMod === modelName) {
      const colorObj = v.color || producto.color;
      if (colorObj?.nombre && !map.has(colorObj.nombre)) {
        map.set(colorObj.nombre, {
          nombre: colorObj.nombre,
          hex: colorObj.codigoHex || '#888888',
          variante: v,
        });
      }
    }
  });
  return Array.from(map.values());
};

/**
 * Modal de Detalle de Producto para la Tienda Pública de Clientes.
 * Compuesto por: ProductoGallery, ProductoVariantSelector y ProductoPurchaseBar.
 */
export function ProductoDetalleModal({ producto, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !producto) return null;

  // Galería de imágenes
  const allImages = useMemo(() => {
    if (producto.imagenes && producto.imagenes.length > 0) {
      return producto.imagenes.map((img) => img.url);
    }
    return producto.imagenUrl ? [producto.imagenUrl] : [];
  }, [producto]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Modelos únicos disponibles
  const modelosUnicos = useMemo(() => {
    if (!Array.isArray(producto.variantes) || producto.variantes.length === 0) {
      return producto.modelo?.nombre ? [producto.modelo.nombre] : [];
    }
    const set = new Set();
    producto.variantes.forEach((v) => {
      const nombreMod = v.modelo?.nombre || producto.modelo?.nombre;
      if (nombreMod) set.add(nombreMod);
    });
    return Array.from(set);
  }, [producto]);

  // Selección síncrona inicial
  const initialModel = modelosUnicos[0] || '';
  const initialColors = useMemo(() => getColorsForModel(producto, initialModel), [producto, initialModel]);
  const initialColorName = initialColors[0]?.nombre || '';

  const [selectedModelo, setSelectedModelo] = useState(initialModel);
  const [selectedColorName, setSelectedColorName] = useState(initialColorName);

  const coloresDelModelo = useMemo(() => {
    return getColorsForModel(producto, selectedModelo);
  }, [producto, selectedModelo]);

  const handleSelectModelo = (modName) => {
    const newColors = getColorsForModel(producto, modName);
    setSelectedModelo(modName);
    setSelectedColorName(newColors[0]?.nombre || '');
  };

  // Variante específica coincidente
  const selectedVariante = useMemo(() => {
    if (!Array.isArray(producto.variantes) || producto.variantes.length === 0) return null;
    return producto.variantes.find((v) => {
      const matchMod = !selectedModelo || (v.modelo?.nombre || producto.modelo?.nombre) === selectedModelo;
      const matchCol = !selectedColorName || (v.color?.nombre || producto.color?.nombre) === selectedColorName;
      return matchMod && matchCol;
    }) || producto.variantes[0];
  }, [producto, selectedModelo, selectedColorName]);

  // Stock
  const stockTotal = (producto.variantes && producto.variantes.length > 0)
    ? producto.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0)
    : (producto.stockActual ?? 0);

  const currentVariantStock = selectedVariante ? (selectedVariante.stockActual || 0) : stockTotal;
  const isOutOfStock = currentVariantStock <= 0;
  const reachedLimit = cantidad >= currentVariantStock;

  const handleAdd = () => {
    if (isOutOfStock || cantidad <= 0) return;
    onAddToCart(producto, selectedVariante, cantidad);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

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
        className="apple-glass-card"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-modal)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra Superior con Botón de Cierre */}
        <div
          style={{
            padding: '1rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-green)', fontSize: '0.78rem', fontWeight: 700 }}>
            <ShieldCheck size={16} />
            <span>Ajuste Exacto & Compatibilidad Garantizada</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.2rem',
              display: 'flex',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Modal en 2 Columnas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.8rem',
            padding: '1.4rem',
            overflowY: 'auto',
          }}
        >
          {/* Columna Izquierda: Galería */}
          <ProductoGallery
            allImages={allImages}
            selectedImageIndex={selectedImageIndex}
            onSelectImage={(idx) => setSelectedImageIndex(idx)}
            productName={producto.nombre}
            brandName={producto.modelo?.marca?.nombre}
          />

          {/* Columna Derecha: Variantes y Compra */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <span
                className="font-headline"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--brand-gold)',
                  display: 'block',
                  marginBottom: '0.25rem',
                }}
              >
                {producto.categoria?.nombre || 'Funda de Protección'}
              </span>
              <h2
                className="font-headline"
                style={{
                  margin: 0,
                  fontSize: 'clamp(1.25rem, 2.4vw, 1.6rem)',
                  fontWeight: 900,
                  color: 'var(--text-white)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {producto.nombre}
              </h2>
            </div>

            {/* Selector de Modelo y Color */}
            <ProductoVariantSelector
              modelosUnicos={modelosUnicos}
              selectedModelo={selectedModelo}
              onSelectModelo={handleSelectModelo}
              coloresDelModelo={coloresDelModelo}
              selectedColorName={selectedColorName}
              onSelectColor={(colName) => setSelectedColorName(colName)}
              materialNombre={producto.material?.nombre}
              isOutOfStock={isOutOfStock}
              currentVariantStock={currentVariantStock}
            />

            {/* Descripción */}
            {producto.descripcion && (
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {producto.descripcion}
              </p>
            )}

            {/* Barra de Compra */}
            <ProductoPurchaseBar
              precioUnitario={producto.precioUnitario}
              cantidad={cantidad}
              onIncrement={() => setCantidad((prev) => prev + 1)}
              onDecrement={() => setCantidad((prev) => Math.max(1, prev - 1))}
              onAddToCart={handleAdd}
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
