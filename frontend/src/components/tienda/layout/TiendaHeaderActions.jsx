import React from 'react';
import { ShoppingBag, LayoutDashboard, Sun, Moon } from 'lucide-react';

/**
 * Acciones y accesos rápidos en el Header.
 * Responsabilidad: Botón de cambio de tema, botón de bolsa con badge y botón del panel administrativo.
 */
export function TiendaHeaderActions({
  theme,
  onToggleTheme,
  totalCartUnits,
  onOpenCart,
  onGoToAdmin,
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
      {/* Toggle de Tema */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="theme-toggle-btn apple-btn-tactile"
        title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
      >
        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
      </button>

      {/* Botón Mi Bolsa */}
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

      {/* Botón Panel Admin */}
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
  );
}

export default TiendaHeaderActions;
