import React from 'react';
import { Search } from 'lucide-react';

/**
 * Cápsula de búsqueda segmentada estilo Airbnb con alta fidelidad y contraste.
 * Responsabilidad: Búsqueda libre por texto, selector de marca y ordenación por precio.
 */
export function TiendaSearchCapsule({
  search,
  onSearchChange,
  onClearSearch,
  marcas = [],
  selectedMarca,
  onSelectMarca,
  sortBy,
  onSelectSortBy,
  onTriggerSearch,
}) {
  return (
    <section style={{ maxWidth: '1280px', margin: '1.2rem auto 0', padding: '0 1.4rem', width: '100%' }}>
      <div className="airbnb-capsule-bar" style={{ maxWidth: '820px' }}>
        {/* Segmento 1: ¿Qué buscas? */}
        <div className="airbnb-capsule-segment" style={{ flex: 1.4 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '0.02em', display: 'block', marginBottom: '2px' }}>
            ¿Qué buscas?
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <input
              type="text"
              className="apple-search-input"
              placeholder="Buscar producto, modelo, color..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.84rem',
                fontWeight: 500,
                color: 'var(--input-text)',
                padding: '0.1rem 0',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={onClearSearch}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Segmento 2: Filtro por Marca */}
        {marcas.length > 0 && (
          <div className="airbnb-capsule-segment" style={{ flex: 0.9 }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '0.02em', display: 'block', marginBottom: '2px' }}>
              Marca
            </span>
            <select
              value={selectedMarca}
              onChange={(e) => onSelectMarca(e.target.value)}
              className="airbnb-capsule-select"
            >
              <option value="ALL">Todas las marcas</option>
              {marcas.map((m) => (
                <option key={m.idMarca} value={m.idMarca}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Segmento 3: Filtro por Orden */}
        <div className="airbnb-capsule-segment" style={{ flex: 0.9 }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-white)', letterSpacing: '0.02em', display: 'block', marginBottom: '2px' }}>
            Ordenar
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value)}
            className="airbnb-capsule-select"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </div>

        {/* Botón Circular de Acción Airbnb */}
        <button
          type="button"
          className="airbnb-search-btn"
          title="Buscar en el catálogo"
          onClick={onTriggerSearch}
        >
          <Search size={18} />
        </button>
      </div>
    </section>
  );
}
