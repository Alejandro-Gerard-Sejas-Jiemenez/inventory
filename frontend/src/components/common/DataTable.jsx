import React from 'react';

export function DataTable({
  columns = [],
  data = [],
  keyExtractor = (item, idx) => item.id || item.idProducto || item.idModelo || item.idMaterial || item.idColor || idx,
  loading = false,
  emptyMessage = 'No se encontraron registros',
  className = '',
}) {
  return (
    <div className={`data-table-wrapper ${className}`}>
      <table className="custom-data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ textAlign: col.align || 'left', width: col.width || 'auto' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="table-loading-cell">
                <div className="table-loading-spinner">Cargando datos...</div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty-cell">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr key={keyExtractor(item, rowIdx)}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ textAlign: col.align || 'left' }}>
                    {col.render ? col.render(item, rowIdx) : item[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'brand', // 'brand' (amber), 'danger' (red), 'neutral'
  className = '',
  onClick,
}) {
  return (
    <div className={`custom-stat-card stat-color-${color} ${className}`} onClick={onClick}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        {Icon && (
          <div className="stat-card-icon-wrapper">
            <Icon size={20} className="stat-card-icon" />
          </div>
        )}
      </div>
      <div className="stat-card-value">{value}</div>
      {(subtitle || trend) && (
        <div className="stat-card-footer">
          {trend && <span className="stat-card-trend">{trend}</span>}
          {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

export function Tabs({ tabs = [], activeTab, onChange, className = '' }) {
  return (
    <div className={`custom-tabs-container ${className}`}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {Icon && <Icon size={16} className="tab-icon" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && <span className="tab-count">{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
