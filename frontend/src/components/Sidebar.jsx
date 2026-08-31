import React from 'react';
import { Store, LogOut, UserCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { SIDEBAR_MENU_ITEMS } from '../data/menuItems';

export function Sidebar({
  currentTab,
  onSelectTab,
  stats,
  onSwitchToTienda,
  currentUser,
  onLogout,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-image-wrapper">
          <img src={logoImg} alt="Los Caseritos Logo" />
        </div>
        <div className="brand-info">
          <h1>Los Caseritos</h1>
          <span>Gestión de Inventario</span>
        </div>
      </div>

      {/* Botón de acceso a la Tienda de Clientes */}
      {onSwitchToTienda && (
        <div style={{ padding: '0.8rem 1rem 0.4rem' }}>
          <button
            type="button"
            onClick={onSwitchToTienda}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 0.8rem',
              backgroundColor: 'var(--brand-gold)',
              color: '#111',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.25)',
              transition: 'transform 0.15s ease',
            }}
          >
            <Store size={16} />
            <span>Ver Tienda / Catálogo</span>
          </button>
        </div>
      )}

      <nav className="sidebar-nav">
        {SIDEBAR_MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const badgeValue = item.badgeKey ? stats?.[item.badgeKey] : undefined;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-item-left">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              {badgeValue !== undefined && (
                <span className="nav-item-badge">{badgeValue}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {currentUser && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <UserCheck size={16} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-white)', fontWeight: 600 }}>
                  {currentUser.nombre || 'Administrador'}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {currentUser.email}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              title="Cerrar sesión de administrador"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--brand-red)',
                cursor: 'pointer',
                padding: '0.3rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LogOut size={15} />
            </button>
          </div>
        )}

        <div className="system-badge">
          <span className="status-dot"></span>
          <span>By Alejandro Gerard Sejas</span>
        </div>
      </div>
    </aside>
  );
}
