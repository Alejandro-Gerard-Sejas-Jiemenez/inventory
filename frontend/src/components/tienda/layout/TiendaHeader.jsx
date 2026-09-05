import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiendaHeaderBrand } from './TiendaHeaderBrand';
import { TiendaHeaderCategories } from './TiendaHeaderCategories';
import { TiendaHeaderActions } from './TiendaHeaderActions';

/**
 * Encabezado translúcido con efecto Liquid Glass y Apple Design.
 * Responsabilidad: Orquestar el encabezado de navegación de la tienda.
 */
export function TiendaHeader({
  theme,
  onToggleTheme,
  totalCartUnits,
  onOpenCart,
  onGoToAdmin,
  onResetCatalog,
  categorias = [],
  activeCatId = null,
}) {
  const navigate = useNavigate();

  const activeCategorias = useMemo(() => {
    return (categorias || []).filter((c) => c.activo !== false && c.estado !== false);
  }, [categorias]);

  const handleBrandClick = () => {
    if (onResetCatalog) onResetCatalog();
    navigate('/');
  };

  return (
    <header className="apple-glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div
        className="tienda-header-container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.75rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Emblema Oficial */}
        <TiendaHeaderBrand onClick={handleBrandClick} />

        {/* Enlaces de Navegación por Categorías */}
        <TiendaHeaderCategories
          activeCategorias={activeCategorias}
          activeCatId={activeCatId}
        />

        {/* Acciones del Header */}
        <TiendaHeaderActions
          theme={theme}
          onToggleTheme={onToggleTheme}
          totalCartUnits={totalCartUnits}
          onOpenCart={onOpenCart}
          onGoToAdmin={onGoToAdmin}
        />
      </div>
    </header>
  );
}

export default TiendaHeader;
