import React from 'react';
import { Smartphone, Headphones, Shield, Sparkles, Layers } from 'lucide-react';

function getCategoryVisual(nombre) {
  const n = (nombre || '').toLowerCase();
  if (n.includes('airpod') || n.includes('buds') || n.includes('head') || n.includes('auric')) {
    return {
      icon: <Headphones size={28} style={{ color: '#24FFCD' }} />,
      tag: 'TWS AUDIO',
      accentColor: '#24FFCD',
    };
  }
  if (n.includes('vidrio') || n.includes('mica') || n.includes('cristal') || n.includes('protec')) {
    return {
      icon: <Shield size={28} style={{ color: '#00E0B3' }} />,
      tag: '9D HD GLASS',
      accentColor: '#00E0B3',
    };
  }
  if (n.includes('samsung')) {
    return {
      icon: <Smartphone size={28} style={{ color: '#3B82F6' }} />,
      tag: 'GALAXY SERIES',
      accentColor: '#3B82F6',
    };
  }
  if (n.includes('xiaomi') || n.includes('redmi')) {
    return {
      icon: <Smartphone size={28} style={{ color: '#F97316' }} />,
      tag: 'REDMI & POCO',
      accentColor: '#F97316',
    };
  }
  return {
    icon: <Smartphone size={28} style={{ color: 'var(--brand-gold)' }} />,
    tag: 'TITANIUM MAGSAFE',
    accentColor: 'var(--brand-gold)',
  };
}

/**
 * Cuadrícula de Categorías Oficial basada en stitch_minimalist_tech_accessories_landing
 * Muestra las categorías activas con tarjetas oscuras y navegación interactiva.
 */
export function TiendaCategoryGrid({ categorias = [], selectedCategoria, onSelectCategoria }) {
  const activeCategorias = React.useMemo(() => {
    return categorias.filter((c) => c.activo !== false && c.estado !== false);
  }, [categorias]);

  const handleCategoryClick = (catId) => {
    onSelectCategoria(catId);
    const gridEl = document.getElementById('productos-grid');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="catalogo"
      style={{
        padding: '3.5rem 0',
        backgroundColor: '#0A0A0C',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.4rem',
        }}
      >
        {/* Encabezado de la Sección */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <span
            className="font-headline"
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--brand-gold)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            NUESTRO CATÁLOGO
          </span>
          <h2
            className="font-headline"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--text-white)',
              letterSpacing: '-0.025em',
              margin: 0,
            }}
          >
            Explora por <span className="text-gradient-fire">categoría</span>
          </h2>
        </div>

        {/* Cuadrícula de Categorías */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.1rem',
          }}
        >
          {/* Opción Todo */}
          <div
            onClick={() => handleCategoryClick('ALL')}
            className="stitch-category-card"
            style={{
              border: selectedCategoria === 'ALL' ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
              backgroundColor: selectedCategoria === 'ALL' ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.2rem 0' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  backgroundColor: '#111',
                  border: '1.5px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand-gold)',
                }}
              >
                <Layers size={26} />
              </div>
            </div>
            <div>
              <h3 className="font-headline" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-white)', margin: '0 0 0.2rem' }}>
                Ver Todo
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Catálogo Completo
              </span>
            </div>
          </div>

          {/* Categorías Activas Dinámicas */}
          {activeCategorias.map((c) => {
            const isSelected = String(selectedCategoria) === String(c.idCategoria);
            const visual = getCategoryVisual(c.nombre);

            return (
              <div
                key={c.idCategoria}
                onClick={() => handleCategoryClick(c.idCategoria)}
                className="stitch-category-card"
                style={{
                  border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1.2rem 0' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      backgroundColor: '#111',
                      border: `1.5px solid ${isSelected ? 'var(--brand-gold)' : 'rgba(255,255,255,0.1)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {visual.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline" style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-white)', margin: '0 0 0.2rem' }}>
                    {c.nombre}
                  </h3>
                  <span style={{ fontSize: '0.72rem', color: visual.accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {visual.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
