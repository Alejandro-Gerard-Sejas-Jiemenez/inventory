import React from 'react';
import { ShoppingBag, LayoutDashboard, Sun, Moon } from 'lucide-react';
import logoImg from '../../assets/logo.png';

/**
 * Encabezado translúcido con efecto Liquid Glass y Apple Design.
 * Responsabilidad: Identidad de marca, toggle de tema, acceso al carrito y panel administrativo.
 */
export function TiendaHeader({
  theme,
  onToggleTheme,
  totalCartUnits,
  onOpenCart,
  onGoToAdmin,
  onResetCatalog,
}) {
  return (
    <header className="apple-glass-nav" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div
        className="tienda-header-container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.2rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Emblema Oficial de la Empresa */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flexShrink: 0 }}
          onClick={onResetCatalog}
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
                fontSize: '1.2rem',
                color: 'var(--text-white)',
                letterSpacing: '0.04em',
              }}
            >
              LOS CASERITOS
            </h1>
            <span
              className="apple-label-small"
              style={{
                fontSize: '0.66rem',
                color: 'var(--brand-gold)',
                display: 'block',
                marginTop: '-1px',
              }}
            >
              Catálogo Oficial & Tienda
            </span>
          </div>
        </div>

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
