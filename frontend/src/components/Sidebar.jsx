import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Layers,
  ArrowLeftRight,
  Database,
  FileText,
} from 'lucide-react';
import logoImg from '../assets/logo.png';

export function Sidebar({ currentTab, onSelectTab, stats }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'productos', label: 'Productos & Stock', icon: Package, badge: stats?.totalProductos },
    { id: 'ventas', label: 'Ventas & Clientes', icon: ShoppingCart, badge: stats?.totalVentas },
    { id: 'compras', label: 'Compras & Proveedores', icon: Truck, badge: stats?.totalProveedores },
    { id: 'catalogos', label: 'Catálogos & Atributos', icon: Layers, badge: stats?.totalModelos },
    { id: 'movimientos', label: 'Kardex / Movimientos', icon: ArrowLeftRight },
    { id: 'bitacora', label: 'Bitácora del Sistema', icon: FileText },
    { id: 'database', label: 'Esquema BD (16 Tablas)', icon: Database },
  ];

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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
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
              {item.badge !== undefined && (
                <span className="nav-item-badge">{item.badge}</span>
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
