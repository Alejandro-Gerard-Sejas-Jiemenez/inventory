import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Sun, Moon } from 'lucide-react';
import logoImg from '../../assets/logo.png';

/**
 * Encabezado translúcido con efecto Liquid Glass y Apple Design.
 * Responsabilidad: Identidad de marca, navegación de categorías, toggle de tema, acceso al carrito y panel admin.
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

  const activeCategorias = React.useMemo(() => {
    return categorias.filter((c) => c.activo !== false && c.estado !== false);
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
        {/* Emblema Oficial de la Empresa */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
          onClick={handleBrandClick}
          className="apple-btn-tactile"
        >
          <div className="brand-logo-badge">
            <img
              src={logoImg}
              alt="Los Caseritos Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div>
            <h1
              className="apple-display-heading"
              style={{
                margin: 0,
                fontSize: '1.15rem',
                color: 'var(--text-white)',
                letterSpacing: '0.04em',
              }}
            >
              LOS CASERITOS
            </h1>
            <span
              className="apple-label-small"
              style={{
                fontSize: '0.64rem',
                color: 'var(--brand-gold)',
                display: 'block',
                marginTop: '-1px',
              }}
            >
              Fundas & Accesorios Tech
            </span>
          </div>
        </div>

        {/* Enlaces de Navegación por Categorías en el Navbar */}
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

        {/* Acciones: Toggle de Tema, Bolsa y Acceso Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle-btn apple-btn-tactile"
            title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="apple-btn-tactile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              backgroundColor: 'var(--brand-gold)',
              color: '#111',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: '0 2px 14px var(--brand-gold-glow)',
            }}
          >
            <ShoppingBag size={16} />
            <span>Mi Bolsa</span>
            {totalCartUnits > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--brand-red)',
                  color: '#fff',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  padding: '0.1rem 0.42rem',
                  borderRadius: '999px',
                  marginLeft: '0.1rem',
                }}
              >
                {totalCartUnits}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onGoToAdmin}
            className="apple-btn-tactile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.52rem 0.9rem',
              borderRadius: '999px',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-white)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-card)',
            }}
            title="Acceso restringido para administradores"
          >
            <LayoutDashboard size={14} />
            <span>Panel Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}
