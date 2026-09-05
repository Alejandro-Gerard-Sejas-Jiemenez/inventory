import React, { useMemo } from 'react';
import { Smartphone } from 'lucide-react';
import { DevicePill } from './DevicePill';

/**
 * Selector de Dispositivo / Modelo de Celular estilo BURGA & CASETiFY.
 * Responsabilidad: Filtrar en 1 clic el catálogo para el modelo exacto de teléfono.
 */
export function TiendaDeviceSelector({
  productos = [],
  selectedDeviceModel = 'ALL',
  onSelectDeviceModel,
}) {
  const availableModels = useMemo(() => {
    const set = new Set();
    const priority = [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 14',
      'iPhone 13',
      'Samsung S24 Ultra',
      'Samsung S23 Ultra',
      'Xiaomi Redmi Note',
    ];

    productos.forEach((p) => {
      if (p.modelo?.nombre) set.add(p.modelo.nombre);
      if (Array.isArray(p.variantes)) {
        p.variantes.forEach((v) => {
          if (v.modelo?.nombre) set.add(v.modelo.nombre);
        });
      }
    });

    const list = Array.from(set);
    return list.length > 0 ? list : priority;
  }, [productos]);

  return (
    <section
      id="selector-dispositivos"
      style={{
        padding: '1.2rem 0 1.5rem',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
        {/* Cabecera del Selector */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={17} style={{ color: 'var(--brand-gold)' }} />
            <span
              className="font-headline"
              style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: 'var(--text-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              1. Elige tu Modelo de Celular:
            </span>
          </div>

          {selectedDeviceModel !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectDeviceModel('ALL')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--brand-gold)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Mostrar todos los modelos
            </button>
          )}
        </div>

        {/* Píldoras de Modelos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            scrollbarWidth: 'none',
          }}
        >
          <DevicePill
            label="Todos los Modelos"
            isSelected={selectedDeviceModel === 'ALL'}
            onClick={() => onSelectDeviceModel('ALL')}
          />

          {availableModels.map((modelName) => (
            <DevicePill
              key={modelName}
              label={modelName}
              isSelected={selectedDeviceModel === modelName}
              onClick={() => onSelectDeviceModel(modelName)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TiendaDeviceSelector;
