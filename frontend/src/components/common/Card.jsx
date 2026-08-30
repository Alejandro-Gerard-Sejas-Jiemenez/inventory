import React from 'react';

export function Card({ children, className = '', style = {}, onClick }) {
  return (
    <div className={`custom-card ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', action }) {
  return (
    <div className={`custom-card-header ${className}`}>
      <div>{children}</div>
      {action && <div className="custom-card-header-action">{action}</div>}
    </div>
  );
}

export function CardTitle({ children, icon: Icon, subtitle, className = '' }) {
  return (
    <div className={`custom-card-title-group ${className}`}>
      <div className="title-with-icon">
        {Icon && <Icon size={20} className="card-title-icon" />}
        <h3>{children}</h3>
      </div>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
  );
}

export function CardBody({ children, className = '', style = {} }) {
  return (
    <div className={`custom-card-body ${className}`} style={style}>
      {children}
    </div>
  );
}
