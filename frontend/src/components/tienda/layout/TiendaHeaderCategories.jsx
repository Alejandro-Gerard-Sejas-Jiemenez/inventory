import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Barra de navegación de categorías en el Header.
 * Responsabilidad: Enlaces activos a categorías de productos con desplazamiento horizontal.
 */
export function TiendaHeaderCategories({ activeCategorias = [], activeCatId }) {
  return (
    <nav
      className="tienda-header-categories"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        padding: '0.2rem 0',
        maxWidth: '100%',
      }}
    >
      <NavLink
        to="/"
        end
        style={({ isActive }) => ({
          fontSize: '0.8rem',
          fontWeight: 700,
          textDecoration: 'none',
          padding: '0.4rem 0.85rem',
          borderRadius: '999px',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          color: isActive && !activeCatId ? '#111' : 'var(--text-secondary)',
          backgroundColor: isActive && !activeCatId ? 'var(--brand-gold)' : 'rgba(255,255,255,0.04)',
          border: isActive && !activeCatId ? '1px solid var(--brand-gold)' : '1px solid transparent',
        })}
      >
        Inicio
      </NavLink>

      {activeCategorias.map((c) => {
        const isCurrent = String(activeCatId) === String(c.idCategoria);
        return (
          <NavLink
            key={c.idCategoria}
            to={`/categoria/${c.idCategoria}`}
            style={({ isActive }) => ({
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '0.4rem 0.85rem',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
              color: isActive || isCurrent ? '#111' : 'var(--text-secondary)',
              backgroundColor: isActive || isCurrent ? 'var(--brand-gold)' : 'rgba(255,255,255,0.04)',
              border: isActive || isCurrent ? '1px solid var(--brand-gold)' : '1px solid transparent',
            })}
          >
            {c.nombre}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default TiendaHeaderCategories;
