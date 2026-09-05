import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Columna de índice de categorías para el pie de página.
 * Responsabilidad: Desplegar la lista de enlaces a categorías activas.
 */
export function FooterCategoriesCol({ activeCategorias = [] }) {
  return (
    <div>
      <h4
        className="font-headline"
        style={{
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: 'var(--text-white)',
          fontWeight: 800,
          margin: '0 0 1.1rem',
        }}
      >
        Categorías
      </h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {activeCategorias.length === 0 ? (
          <li style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cargando catálogo...</li>
        ) : (
          activeCategorias.map((c) => (
            <li key={c.idCategoria}>
              <Link
                to={`/categoria/${c.idCategoria}`}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {c.nombre}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default FooterCategoriesCol;
