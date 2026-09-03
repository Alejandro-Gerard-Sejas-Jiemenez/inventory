import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { Button } from '../common/Button';

export function ProductoVariantesList({
  variantes = [],
  modelos = [],
  colores = [],
  isEditMode = false,
  filterActive,
  onAddVariante,
  onRemoveVariante,
  onUpdateVariante,
  onCreateModelo,
  onCreateColor,
  setActiveVarianteIndexForQuick,
  setQuickCreateType,
}) {
  const renderShortcutButton = (label, onClick) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--brand-gold)',
        fontSize: '0.76rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.2rem',
      }}
    >
      <Plus size={11} />
      <span>{label}</span>
    </button>
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: 0, color: 'var(--brand-gold)' }}>Variantes del Producto (Stock)</h4>
        <Button type="button" variant="ghost" icon={Plus} size="sm" onClick={onAddVariante} style={{ color: 'var(--brand-gold)' }}>
          Agregar Variante
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {variantes.map((v, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr 0.8fr auto',
              gap: '0.75rem',
              alignItems: 'end',
              background: 'var(--bg-secondary)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label className="form-field-label" style={{ margin: 0, fontSize: '0.75rem' }}>Modelo</label>
                {onCreateModelo && renderShortcutButton('+ Nuevo', () => {
                  setActiveVarianteIndexForQuick(index);
                  setQuickCreateType('modelo');
                })}
              </div>
              <SelectField
                value={v.idModelo}
                onChange={(e) => onUpdateVariante(index, 'idModelo', e.target.value)}
                options={filterActive(modelos).map(m => ({ value: m.idModelo, label: `${m.nombre} ${m.marca?.nombre ? `(${m.marca.nombre})` : ''}` }))}
                placeholder="Sin modelo"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <label className="form-field-label" style={{ margin: 0, fontSize: '0.75rem' }}>Color</label>
                {onCreateColor && renderShortcutButton('+ Nuevo', () => {
                  setActiveVarianteIndexForQuick(index);
                  setQuickCreateType('color');
                })}
              </div>
              <SelectField
                value={v.idColor}
                onChange={(e) => onUpdateVariante(index, 'idColor', e.target.value)}
                options={filterActive(colores).map(c => ({ value: c.idColor, label: c.nombre }))}
                placeholder="Sin color"
              />
            </div>

            <InputField
              label="SKU"
              placeholder="SKU Único"
              value={v.sku}
              onChange={(e) => onUpdateVariante(index, 'sku', e.target.value)}
            />

            <InputField
              label={isEditMode ? 'Stock' : 'Stock Inic.'}
              type="number"
              min="0"
              value={v.stockActual}
              onChange={(e) => onUpdateVariante(index, 'stockActual', e.target.value)}
              required
            />

            <InputField
              label="Stock Min."
              type="number"
              min="0"
              value={v.stockMinimo}
              onChange={(e) => onUpdateVariante(index, 'stockMinimo', e.target.value)}
              required
            />

            <div style={{ paddingBottom: '0.5rem' }}>
              <Button
                type="button"
                variant="ghost"
                icon={Trash2}
                onClick={() => onRemoveVariante(index)}
                disabled={variantes.length === 1}
                style={{ color: 'var(--brand-red)' }}
                title="Eliminar variante"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
