import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero Section Oficial basado en stitch_minimalist_tech_accessories_landing
 * Tipografía Space Grotesk/Sora, degradado fire y composición fotográfica real.
 */
export function TiendaLandingHero({ onExploreCatalog, onExploreFeatured, productos = [] }) {
  // Buscar una funda real con imagen en los productos disponibles
  const featuredProduct = React.useMemo(() => {
    if (!Array.isArray(productos) || productos.length === 0) return null;
    const withImg = productos.find((p) => {
      return (Array.isArray(p.imagenes) && p.imagenes.length > 0 && p.imagenes[0]?.url) || p.imagenUrl;
    });
    return withImg || productos[0] || null;
  }, [productos]);

  const heroImage =
    (featuredProduct?.imagenes && featuredProduct.imagenes.length > 0 && featuredProduct.imagenes[0]?.url) ||
    featuredProduct?.imagenUrl ||
    'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=800&q=80';

  return (
    <section
      style={{
        position: 'relative',
        padding: '2.5rem 0 3.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.4rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Columna Izquierda: Editorial */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Tagline con barra de gradiente */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #FF6B00 0%, #EF4444 100%)',
                }}
              />
              <span
                className="font-headline"
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  fontWeight: 800,
                  color: 'var(--brand-gold)',
                }}
              >
                PROTECCIÓN · AJUSTE · PRECISIÓN
              </span>
            </div>

            {/* Titular Principal */}
            <h1
              className="font-headline"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                color: 'var(--text-white)',
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                margin: '0 0 1.2rem',
              }}
            >
              Protección que <br />
              se siente <span className="text-gradient-fire" style={{ fontStyle: 'italic' }}>tuya.</span>
            </h1>

            {/* Subtítulo */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.6vw, 1.08rem)',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.55,
                margin: '0 0 1.8rem',
              }}
            >
              Carcasas antichoques de ajuste milimétrico para cada modelo de celular. Diseñadas para resistir caídas extremas con estilo y confort.
            </p>

            {/* Botones de Acción (CTAs) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onExploreCatalog}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--text-white)',
                  color: '#0A0A0C',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span>Explorar categorías</span>
                <ArrowRight size={16} style={{ color: '#F97316' }} />
              </button>

              <button
                type="button"
                onClick={onExploreFeatured}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.82rem 1.6rem',
                  borderRadius: '999px',
                  backgroundColor: 'transparent',
                  color: 'var(--text-white)',
                  border: '1.5px solid rgba(249, 115, 22, 0.4)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Ver colección
              </button>
            </div>
          </div>

          {/* Columna Derecha: Fotografía Real de Funda (Cero figuras simuladas) */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Aura Orgánica de Fondo con Brillo Naranja/Rojo */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(239, 68, 68, 0.12) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Tarjeta de Exhibición Fotográfica de Alta Fidelidad */}
            <div
              className="apple-glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '380px',
                padding: '1.2rem',
                borderRadius: '2.5rem',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1.15',
                  maxHeight: '360px',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  backgroundColor: '#09090D',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={heroImage}
                  alt={featuredProduct?.nombre || 'Funda de Protección Premium'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '0.85rem',
                    right: '0.85rem',
                    padding: '0.65rem 1rem',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(10, 10, 14, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <h4
                      className="font-headline"
                      style={{
                        margin: 0,
                        fontSize: '0.84rem',
                        color: '#fff',
                        fontWeight: 800,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '180px',
                      }}
                    >
                      {featuredProduct?.nombre || 'Funda de Protección'}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--brand-gold)', fontWeight: 700 }}>
                      {featuredProduct?.modelo?.nombre || 'Colección Caseritos'}
                    </span>
                  </div>
                  {featuredProduct?.precioUnitario && (
                    <span className="font-headline" style={{ fontSize: '0.98rem', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                      Bs {featuredProduct.precioUnitario}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{
                  marginTop: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-white)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={13} style={{ color: 'var(--brand-gold)' }} />
                <span>Fotografía Real · Ajuste Milimétrico</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TiendaLandingHero;
