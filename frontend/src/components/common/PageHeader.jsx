import React from 'react';

export function PageHeader({
  title,
  subtitle,
  actions,
  badge,
  icon: Icon,
  className = '',
}) {
  return (
    <div className={`custom-page-header ${className}`}>
      <div className="page-header-content">
        <div className="page-title-row">
          {Icon && (
            <div className="page-header-icon-wrapper">
              <Icon size={22} className="page-header-icon" />
            </div>
          )}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2>{title}</h2>
              {badge && <span className="page-header-badge">{badge}</span>}
            </div>
            {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
          </div>
        </div>
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  );
}
