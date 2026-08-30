import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const ICON_MAP = {
  danger: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
  brand: Info,
  neutral: Info,
};

export function AlertBanner({
  title,
  message,
  variant = 'brand', // 'brand' | 'danger' | 'warning' | 'success' | 'neutral'
  icon: CustomIcon,
  action,
  className = '',
}) {
  const Icon = CustomIcon || ICON_MAP[variant] || Info;

  return (
    <div className={`custom-alert-banner alert-${variant} ${className}`}>
      <div className="alert-content-wrapper">
        <Icon size={20} className="alert-banner-icon" />
        <div className="alert-text-wrapper">
          {title && <strong className="alert-banner-title">{title}</strong>}
          {message && <span className="alert-banner-message">{message}</span>}
        </div>
      </div>
      {action && <div className="alert-banner-action">{action}</div>}
    </div>
  );
}
