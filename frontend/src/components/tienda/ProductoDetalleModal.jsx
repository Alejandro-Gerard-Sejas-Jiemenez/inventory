import React, { useState } from 'react';
import { X, ShoppingCart, Check, ShieldCheck, Tag, Layers, Palette, Sparkles, Image as ImageIcon, Box } from 'lucide-react';

/**
 * Modal de Detalle de Producto para la Tienda Pública de Clientes.
 * Requisitos:
 * - Galería de imágenes (principal y secundarias).
 * - Marca, Categoría, Material, Color, Descripción.
 * - Variantes y estado de stock por variante.
 * - Muestra ÚNICAMENTE el precio unitario.
 * - NO muestra Propietario.
 */
export function ProductoDetalleModal({ producto, isOpen, onClose, onAddToCart, cartQuantity = 0 }) {
  if (!isOpen || !producto) return null;

  // Galería de imágenes
  const allImages = (producto.imagenes && producto.imagenes.length > 0)
    ? producto.imagenes.map((img) => img.url)
    : producto.imagenUrl ? [producto.imagenUrl] : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariante, setSelectedVariante] = useState(
    producto.variantes && producto.variantes.length > 0 ? producto.variantes[0] : null
  );
  const [cantidad, setCantidad] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const mainImage = allImages[selectedImageIndex] || null;

  // Stock global y por variante
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
          maxWidth: '820px',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                paddingTop: '90%',
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
                    padding: '0.4rem',
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

          {/* Columna Derecha: Detalles del Producto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Marca y Categoría */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {producto.categoria?.nombre && (
                <span
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '999px',
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
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
                fontSize: '1.45rem',
                color: 'var(--text-white)',
                fontWeight: 800,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              {producto.nombre}
            </h2>

            {/* Precio Unitario Solamente */}
            <div
              style={{
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Precio Unitario
                </span>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
                  <span style={{ fontSize: '1rem', marginRight: '3px' }}>Bs.</span>
                  {Number(producto.precioUnitario).toFixed(2)}
                </div>
              </div>

              {/* Indicador de Stock sin números */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>Estado</span>
                <span
                  style={{
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    color: isOutOfStock ? 'var(--brand-red)' : 'var(--brand-green)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                  }}
                >
                  <Box size={14} />
                  {isOutOfStock ? 'Agotado' : 'Disponible'}
                </span>
              </div>
            </div>

            {/* Descripción */}
            {producto.descripcion && (
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem', fontSize: '0.8rem' }}>
                  Descripción:
                </strong>
                {producto.descripcion}
              </div>
            )}

            {/* Atributos: Material y Color */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
              {producto.material?.nombre && (
                <div
                  style={{
                    padding: '0.6rem 0.8rem',
                    backgroundColor: 'var(--bg-glass)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.68rem', fontWeight: 600 }}>MATERIAL</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{producto.material.nombre}</span>
                </div>
              )}

              {producto.color && (
                <div
                  style={{
                    padding: '0.6rem 0.8rem',
                    backgroundColor: 'var(--bg-glass)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.68rem', fontWeight: 600 }}>COLOR</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{producto.color.nombre}</span>
                  </div>
                  {producto.color.codigoHex && (
                    <span
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: producto.color.codigoHex,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Selector de Variantes solo si existen 2 o más opciones reales */}
            {producto.variantes && producto.variantes.length > 1 && (
              <div style={{ marginTop: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '0.45rem' }}>
                  Selecciona la Opción:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {producto.variantes.map((v) => {
                    const isSelected = selectedVariante?.idVariante === v.idVariante;
                    const vStock = v.stockActual || 0;
                    return (
                      <button
                        key={v.idVariante}
                        type="button"
                        onClick={() => setSelectedVariante(v)}
                        disabled={vStock <= 0}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                          backgroundColor: isSelected ? 'var(--brand-gold-subtle, rgba(245, 158, 11, 0.12))' : 'var(--bg-glass)',
                          color: vStock <= 0 ? 'var(--text-muted)' : isSelected ? 'var(--brand-gold)' : 'var(--text-primary)',
                          fontWeight: isSelected ? 800 : 500,
                          fontSize: '0.78rem',
                          cursor: vStock <= 0 ? 'not-allowed' : 'pointer',
                          opacity: vStock <= 0 ? 0.45 : 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{v.talla || v.sku || `Opción #${v.idVariante}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Control de Cantidad y Botón de Acción */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
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
