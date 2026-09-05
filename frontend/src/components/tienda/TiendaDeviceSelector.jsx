import React from 'react';
import { Smartphone, Check, Sparkles } from 'lucide-react';

/**
 * Selector de Dispositivo / Modelo de Celular estilo BURGA & CASETiFY
 * Permite al usuario filtrar en 1 clic el catálogo para su modelo exacto de teléfono.
 */
export function TiendaDeviceSelector({
  productos = [],
  selectedDeviceModel = 'ALL',
  onSelectDeviceModel,
}) {
  // Extraer modelos dinámicos reales de los productos del inventario
  const availableModels = React.useMemo(() => {
    const set = new Set();
    // Modelos populares prioritarios
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
    // Si no hay modelos cargados aún, usar la lista prioritarios
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

        {/* Píldoras de Modelos con desplazamiento horizontal suave */}
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
          {/* Opción Todos */}
          <button
            type="button"
            onClick={() => onSelectDeviceModel('ALL')}
            className="apple-pill-tab"
            style={{
              padding: '0.48rem 1rem',
              borderRadius: '999px',
              border: selectedDeviceModel === 'ALL' ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-color)',
              backgroundColor: selectedDeviceModel === 'ALL' ? 'var(--brand-gold-bg)' : 'var(--bg-card)',
              color: selectedDeviceModel === 'ALL' ? 'var(--brand-gold)' : 'var(--text-secondary)',
              fontWeight: selectedDeviceModel === 'ALL' ? 800 : 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>Todos los Dispositivos</span>
          </button>

          {/* Modelos Disponibles */}
          {availableModels.map((modName) => {
            const isSelected = selectedDeviceModel.toLowerCase() === modName.toLowerCase();
            return (
              <button
                key={modName}
                type="button"
                onClick={() => onSelectDeviceModel(modName)}
                className="apple-pill-tab"
                style={{
                  padding: '0.48rem 1rem',
                  borderRadius: '999px',
                  border: isSelected ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--brand-gold-bg)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 800 : 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                {isSelected && <Check size={13} style={{ color: 'var(--brand-gold)' }} />}
                <span>{modName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
