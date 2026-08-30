import React from 'react';

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'brand', // 'brand' | 'danger' | 'neutral'
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
