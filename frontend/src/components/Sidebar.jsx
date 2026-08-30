import React from 'react';
import logoImg from '../assets/logo.png';
import { SIDEBAR_MENU_ITEMS } from '../data/menuItems';

export function Sidebar({ currentTab, onSelectTab, stats }) {
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

      <div className="sidebar-footer">
        <div className="system-badge">
          <span className="status-dot"></span>
          <span>API REST :8088 / H2 Conectada</span>
        </div>
      </div>
    </aside>
  );
}
