import React from 'react';
import { Smartphone, Headphones, Shield } from 'lucide-react';

function getCategoryVisual(nombre) {
  const n = (nombre || '').toLowerCase();
  if (n.includes('airpod') || n.includes('buds') || n.includes('head') || n.includes('auric')) {
    return {
      icon: <Headphones size={28} style={{ color: '#24FFCD' }} />,
      tag: 'TWS AUDIO',
      accentColor: '#24FFCD',
    };
  }
  if (n.includes('vidrio') || n.includes('mica') || n.includes('cristal') || n.includes('protec')) {
    return {
      icon: <Shield size={28} style={{ color: '#00E0B3' }} />,
      tag: '9D HD GLASS',
      accentColor: '#00E0B3',
    };
  }
  if (n.includes('samsung')) {
    return {
      icon: <Smartphone size={28} style={{ color: '#3B82F6' }} />,
      tag: 'GALAXY SERIES',
      accentColor: '#3B82F6',
    };
  }
  if (n.includes('xiaomi') || n.includes('redmi')) {
    return {
      icon: <Smartphone size={28} style={{ color: '#F97316' }} />,
      tag: 'REDMI & POCO',
      accentColor: '#F97316',
    };
  }
  return {
    icon: <Smartphone size={28} style={{ color: 'var(--brand-gold)' }} />,
    tag: 'TITANIUM MAGSAFE',
    accentColor: 'var(--brand-gold)',
  };
}

/**
 * Tarjeta individual de categoría para la cuadrícula de inicio.
 * Responsabilidad: Representación visual y acceso a una categoría específica.
 */
export function CategoryGridCard({
  categoria,
  isSelected,
  onClick,
}) {
  const visual = getCategoryVisual(categoria.nombre);

  return (
    <div
      onClick={onClick}
      className="stitch-category-card"
      style={{
        flex: '0 1 230px',
        minWidth: '200px',
        maxWidth: '260px',
        border: isSelected ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
        backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1.4rem 0 1rem' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: '#111',
            border: `1.5px solid ${isSelected ? 'var(--brand-gold)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {visual.icon}
        </div>
      </div>
      <div style={{ padding: '0 1rem 1.4rem' }}>
        <h3 className="font-headline" style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-white)', margin: '0 0 0.35rem' }}>
          {categoria.nombre}
        </h3>
        <span style={{ fontSize: '0.72rem', color: visual.accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {visual.tag}
        </span>
      </div>
    </div>
  );
}

export default CategoryGridCard;
