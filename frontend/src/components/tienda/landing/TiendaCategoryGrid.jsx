import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Headphones, Shield, Sparkles } from 'lucide-react';

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
  const navigate = useNavigate();

  const activeCategorias = React.useMemo(() => {
    return categorias.filter((c) => c.activo !== false && c.estado !== false);
  }, [categorias]);

  const handleCategoryClick = (catId) => {
    if (onSelectCategoria) {
      onSelectCategoria(catId);
    }
    navigate(`/categoria/${catId}`);
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

        {/* Cuadrícula de Categorías Centralizada (Sin 'Todo' y sólo categorías activas) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          {activeCategorias.map((c) => {
            const isSelected = String(selectedCategoria) === String(c.idCategoria);
            const visual = getCategoryVisual(c.nombre);

            return (
              <div
                key={c.idCategoria}
                onClick={() => handleCategoryClick(c.idCategoria)}
                className="stitch-category-card"
                style={{
                  flex: '0 1 230px',
                  minWidth: '200px',
                  maxWidth: '260px',
                  border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1.4rem 0 1rem' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
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
                <div style={{ padding: '0 1rem 1.4rem' }}>
                  <h3 className="font-headline" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-white)', margin: '0 0 0.35rem' }}>
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

export default TiendaCategoryGrid;
