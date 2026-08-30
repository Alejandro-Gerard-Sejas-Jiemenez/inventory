import React from 'react';

export function Badge({ children, variant = 'neutral', icon: Icon, className = '' }) {
  // variants: 'brand' | 'success' | 'warning' | 'danger' | 'neutral'
  return (
    <span className={`custom-badge badge-${variant} ${className}`}>
      {Icon && <Icon size={12} className="badge-icon" />}
      {children}
    </span>
  );
}
