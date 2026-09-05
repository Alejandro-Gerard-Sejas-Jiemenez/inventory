import React, { useMemo } from 'react';
import { HeroCopy } from './HeroCopy';
import { HeroShowcaseVisual } from './HeroShowcaseVisual';

/**
 * Hero Section Oficial basado en stitch_minimalist_tech_accessories_landing.
 * Responsabilidad: Orquestar el encabezado de impacto visual de la landing page.
 */
export function TiendaLandingHero({ onExploreCatalog, onExploreFeatured, productos = [] }) {
  const featuredProduct = useMemo(() => {
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Columna Izquierda: Editorial */}
          <HeroCopy
            onExploreCatalog={onExploreCatalog}
            onExploreFeatured={onExploreFeatured}
          />

          {/* Columna Derecha: Fotografía Real */}
          <HeroShowcaseVisual
            heroImage={heroImage}
            featuredProduct={featuredProduct}
          />
        </div>
      </div>
    </section>
  );
}

export default TiendaLandingHero;
