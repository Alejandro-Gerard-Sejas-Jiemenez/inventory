import React, { useState, useMemo, useEffect } from 'react';
import { X, ShoppingCart, Check, Box, Smartphone, Palette, ShieldCheck, Image as ImageIcon } from 'lucide-react';

/**
 * Modal de Detalle de Producto para la Tienda Pública de Clientes.
 * Requisitos & Usabilidad:
 * - Selección encadenada en 2 pasos: Modelo / Dispositivo -> Colores disponibles para ese modelo.
 * - Muestra únicamente el Precio Unitario (sin Propietario ni números exactos de stock).
 * - Estructura visual armónica con Glassmorphic Design (Krug & Kowalski UI).
 */
export function ProductoDetalleModal({ producto, isOpen, onClose, onAddToCart, cartQuantity = 0 }) {
  if (!isOpen || !producto) return null;

  // Galería de imágenes
  const allImages = (producto.imagenes && producto.imagenes.length > 0)
    ? producto.imagenes.map((img) => img.url)
    : producto.imagenUrl ? [producto.imagenUrl] : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const mainImage = allImages[selectedImageIndex] || null;

  // 1. Obtener modelos únicos disponibles en el producto o sus variantes
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

  const [selectedModelo, setSelectedModelo] = useState(() => modelosUnicos[0] || '');

  // Sincronizar modelo por defecto si cambia el producto
  useEffect(() => {
    if (modelosUnicos.length > 0 && !modelosUnicos.includes(selectedModelo)) {
      setSelectedModelo(modelosUnicos[0]);
    }
  }, [modelosUnicos, selectedModelo]);

  // 2. Colores disponibles filtrados para el modelo seleccionado
  const coloresDelModelo = useMemo(() => {
    if (!Array.isArray(producto.variantes) || producto.variantes.length === 0) {
      if (producto.color?.nombre) {
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
      if (!selectedModelo || nombreMod === selectedModelo) {
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
  }, [producto, selectedModelo]);

  const [selectedColorName, setSelectedColorName] = useState(() => coloresDelModelo[0]?.nombre || '');

  // Sincronizar color cuando cambie el modelo seleccionado
  useEffect(() => {
    if (coloresDelModelo.length > 0) {
      if (!coloresDelModelo.some((c) => c.nombre === selectedColorName)) {
        setSelectedColorName(coloresDelModelo[0].nombre);
      }
    } else {
      setSelectedColorName('');
    }
  }, [selectedModelo, coloresDelModelo, selectedColorName]);

  // 3. Obtener variante específica coincidente con Modelo + Color
  const selectedVariante = useMemo(() => {
    if (!Array.isArray(producto.variantes) || producto.variantes.length === 0) return null;
    return producto.variantes.find((v) => {
      const matchMod = !selectedModelo || (v.modelo?.nombre || producto.modelo?.nombre) === selectedModelo;
      const matchCol = !selectedColorName || (v.color?.nombre || producto.color?.nombre) === selectedColorName;
      return matchMod && matchCol;
    }) || producto.variantes[0];
  }, [producto, selectedModelo, selectedColorName]);

  // Stock y disponibilidad
  const stockTotal = (producto.variantes && producto.variantes.length > 0)
    ? producto.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0)
    : (producto.stockActual ?? 0);

  const currentVariantStock = selectedVariante
    ? (selectedVariante.stockActual || 0)
    : stockTotal;

  const isOutOfStock = currentVariantStock <= 0;

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
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="apple-glass-card"
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-modal)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
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
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '1.8rem',
            padding: '1.8rem',
          }}
        >
          {/* Columna Izquierda: Galería de Fotos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Foto Principal */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '92%',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
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
                    padding: '0.5rem',
                    transition: 'all 0.3s ease',
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
                    gap: '0.5rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <ImageIcon size={42} opacity={0.6} />
                  <span style={{ fontSize: '0.8rem' }}>Sin imagen disponible</span>
                </div>
              )}
            </div>

            {/* Miniaturas Secundarias */}
            {allImages.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  overflowX: 'auto',
                  paddingBottom: '0.4rem',
                }}
              >
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: selectedImageIndex === idx ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                      padding: '2px',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      opacity: selectedImageIndex === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    <img src={imgUrl} alt={`Vista ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna Derecha: Información y Selectores de Modelo/Color */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Categoría y Marca */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {producto.categoria?.nombre && (
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--brand-gold-bg)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: 'var(--brand-gold)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {producto.categoria.nombre}
                </span>
              )}

              {producto.modelo?.marca?.nombre && (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  • {producto.modelo.marca.nombre}
                </span>
              )}
            </div>

            {/* Nombre del Producto */}
            <h2
              style={{
                margin: 0,
                fontSize: '1.4rem',
                color: 'var(--text-white)',
                fontWeight: 800,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              {producto.nombre}
            </h2>

            {/* Caja de Precio Unitario y Estado */}
            <div
              style={{
                padding: '0.9rem 1.1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Precio Unitario
                </span>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--brand-gold)', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '1rem', marginRight: '3px' }}>Bs.</span>
                  {Number(producto.precioUnitario).toFixed(2)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estado
                </span>
                <span
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: isOutOfStock ? 'var(--brand-red)' : 'var(--brand-green)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    marginTop: '2px',
                  }}
                >
                  <Box size={14} />
                  {isOutOfStock ? 'Agotado' : 'Disponible'}
                </span>
              </div>
            </div>

            {/* Material */}
            {producto.material?.nombre && (
              <div
                style={{
                  padding: '0.65rem 0.9rem',
                  backgroundColor: 'var(--bg-glass)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                }}
              >
                <span style={{ color: 'var(--brand-gold)', fontWeight: 800 }}>Material:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{producto.material.nombre}</span>
              </div>
            )}

            {/* 1. Selector de Modelo / Dispositivo (Paso 1) */}
            {modelosUnicos.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Smartphone size={15} style={{ color: 'var(--brand-gold)' }} />
                  <span>1. Selecciona tu Modelo / Dispositivo:</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {modelosUnicos.map((modName) => {
                    const isSelected = selectedModelo === modName;
                    return (
                      <button
                        key={modName}
                        type="button"
                        onClick={() => setSelectedModelo(modName)}
                        style={{
                          padding: '0.5rem 0.9rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--brand-gold-bg)' : 'var(--bg-glass)',
                          color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: '0.82rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 10px rgba(245, 158, 11, 0.25)' : 'none',
                        }}
                      >
                        {modName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Selector de Color para el Modelo Seleccionado (Paso 2) */}
            {coloresDelModelo.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-white)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Palette size={15} style={{ color: 'var(--brand-gold)' }} />
                  <span>2. Colores disponibles para {selectedModelo || 'este producto'}:</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {coloresDelModelo.map((c) => {
                    const isSelected = selectedColorName === c.nombre;
                    return (
                      <button
                        key={c.nombre}
                        type="button"
                        onClick={() => setSelectedColorName(c.nombre)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '999px',
                          border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--brand-gold-bg)' : 'var(--bg-glass)',
                          color: isSelected ? 'var(--brand-gold)' : 'var(--text-primary)',
                          fontWeight: isSelected ? 800 : 500,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 0 10px rgba(245, 158, 11, 0.2)' : 'none',
                        }}
                      >
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                            display: 'inline-block',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                        <span>{c.nombre}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Control de Cantidad y Botón Agregar al Carrito */}
            <div style={{ marginTop: 'auto', paddingTop: '0.8rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              {/* Contar Cantidad */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '0.2rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.75rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-white)' }}>
                  {cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.min(currentVariantStock, c + 1))}
                  disabled={cantidad >= currentVariantStock}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    cursor: cantidad >= currentVariantStock ? 'not-allowed' : 'pointer',
                    opacity: cantidad >= currentVariantStock ? 0.35 : 1,
                  }}
                >
                  +
                </button>
              </div>

              {/* Botón Agregar al Carrito */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={isOutOfStock}
                className="apple-btn-tactile"
                style={{
                  flex: 1,
                  padding: '0.75rem 1.2rem',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: isOutOfStock
                    ? 'var(--border-color)'
                    : addedAnimation
                    ? 'var(--brand-green)'
                    : 'var(--brand-gold)',
                  color: isOutOfStock ? 'var(--text-muted)' : '#111',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: isOutOfStock ? 'none' : '0 4px 16px var(--brand-gold-glow)',
                }}
              >
                {isOutOfStock ? (
                  <span>Producto Agotado</span>
                ) : addedAnimation ? (
                  <>
                    <Check size={18} />
                    <span>¡Agregado con Éxito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    <span>Agregar al Carrito (Bs. {(Number(producto.precioUnitario) * cantidad).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
