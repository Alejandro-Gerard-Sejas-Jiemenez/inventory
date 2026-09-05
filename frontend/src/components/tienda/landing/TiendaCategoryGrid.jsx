import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryGridCard } from './CategoryGridCard';

/**
 * Cuadrícula de Categorías Oficial basada en stitch_minimalist_tech_accessories_landing.
 * Responsabilidad: Desplegar la sección de categorías activas con navegación centralizada.
 */
export function TiendaCategoryGrid({ categorias = [], selectedCategoria, onSelectCategoria }) {
  const navigate = useNavigate();

  const activeCategorias = useMemo(() => {
    return (categorias || []).filter((c) => c.activo !== false && c.estado !== false);
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
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

        {/* Cuadrícula Centralizada de Categorías */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          {activeCategorias.map((c) => (
            <CategoryGridCard
              key={c.idCategoria}
              categoria={c}
              isSelected={String(selectedCategoria) === String(c.idCategoria)}
              onClick={() => handleCategoryClick(c.idCategoria)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TiendaCategoryGrid;
