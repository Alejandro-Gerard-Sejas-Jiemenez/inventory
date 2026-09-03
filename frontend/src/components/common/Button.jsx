import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost' | 'brand'
  size = 'md', // 'sm' | 'md' | 'lg'
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  style = {},
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`custom-btn btn-${variant} btn-${size} ${loading ? 'is-loading' : ''} ${className}`}
      style={style}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === 'sm' ? 14 : 18} className="spin-icon" />
      ) : (
        Icon && <Icon size={size === 'sm' ? 14 : 18} className="btn-icon" />
      )}
      <span>{children}</span>
    </button>
  );
}

export function Badge({ children, variant = 'neutral', icon: Icon, className = '' }) {
  // variants: 'brand' | 'success' | 'warning' | 'danger' | 'neutral'
  return (
    <span className={`custom-badge badge-${variant} ${className}`}>
      {Icon && <Icon size={12} className="badge-icon" />}
      {children}
    </span>
  );
}
