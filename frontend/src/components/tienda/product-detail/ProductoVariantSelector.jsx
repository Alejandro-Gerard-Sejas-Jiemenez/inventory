import React from 'react';
import { Box } from 'lucide-react';
import { VariantModelPills } from './VariantModelPills';
import { VariantColorSwatches } from './VariantColorSwatches';

/**
 * Selector de Variantes (Modelo de Celular y Color) para el detalle del producto.
 * Responsabilidad: Orquestar la selección de modelo, color y disponibilidad de stock.
 */
export function ProductoVariantSelector({
  modelosUnicos = [],
  selectedModelo = '',
  onSelectModelo,
  coloresDelModelo = [],
  selectedColorName = '',
  onSelectColor,
  materialNombre = '',
  isOutOfStock = false,
  currentVariantStock = 0,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {/* 1. Selector de Modelos de Celular */}
      <VariantModelPills
        modelos={modelosUnicos}
        selectedModelo={selectedModelo}
        onSelectModelo={onSelectModelo}
      />

      {/* 2. Selector de Colores Disponibles para el Modelo */}
      <VariantColorSwatches
        colores={coloresDelModelo}
        selectedColorName={selectedColorName}
        onSelectColor={onSelectColor}
      />

      {/* 3. Indicador de Stock y Material de la Variante Seleccionada */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.78rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Box size={14} style={{ color: 'var(--brand-gold)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Disponibilidad:</span>
          <strong style={{ color: isOutOfStock ? 'var(--brand-red)' : 'var(--brand-green)' }}>
            {isOutOfStock ? 'Sin stock' : `${currentVariantStock} unidades en almacén`}
          </strong>
        </div>

        {materialNombre && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>
            Material: <strong style={{ color: 'var(--text-white)' }}>{materialNombre}</strong>
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductoVariantSelector;
