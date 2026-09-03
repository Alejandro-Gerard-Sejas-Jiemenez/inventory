import React from 'react';
import { Trash2 } from 'lucide-react';
import { SelectField } from '../common/SelectField';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

/**
 * Fila individual de ítem dentro del formulario POS de Venta.
 * Responsabilidad: Selección de variante, cantidad, precio unitario y cálculo de subtotal.
 */
export function VentaDetalleRow({
  item,
  index,
  variantesDisponibles = [],
  onVarianteChange,
  onCantidadChange,
  onPrecioChange,
  onRemove,
  canRemove,
}) {
  const varSelec = variantesDisponibles.find((v) => String(v.idVariante) === String(item.idVariante));
  const maxStock = varSelec ? varSelec.stockActual ?? 0 : null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 2fr) minmax(90px, 0.8fr) minmax(110px, 1fr) minmax(100px, 1fr) 40px',
        gap: '0.75rem',
        alignItems: 'end',
        padding: '0.85rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-color)',
      }}
    >
      <SelectField
        label={index === 0 ? 'Producto (Variante)' : ''}
        value={item.idVariante}
        onChange={(e) => onVarianteChange(index, e.target.value)}
        placeholder="Seleccionar producto..."
        options={variantesDisponibles.map((v) => ({
          value: v.idVariante,
          label: `${v.nombreCompuesto} (Stock: ${v.stockActual})`,
        }))}
        required
      />

      <InputField
        label={index === 0 ? 'Cant.' : ''}
        type="number"
        min="1"
        max={maxStock !== null ? maxStock : undefined}
        value={item.cantidad}
        onChange={(e) => onCantidadChange(index, e.target.value)}
        required
      />

      <InputField
        label={index === 0 ? 'P. Unit (Bs.)' : ''}
        type="number"
        step="0.01"
        min="0"
        value={item.precioUnitario}
        onChange={(e) => onPrecioChange(index, e.target.value)}
        required
      />

      <div>
        {index === 0 && <label className="form-field-label">Subtotal</label>}
        <div
          style={{
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            color: 'var(--brand-gold)',
            fontSize: '0.92rem',
          }}
        >
          Bs. {(item.cantidad * (parseFloat(item.precioUnitario) || 0)).toFixed(2)}
        </div>
      </div>

      <div style={{ height: '38px', display: 'flex', alignItems: 'center' }}>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(index)}
            icon={Trash2}
            style={{ color: 'var(--brand-red)', padding: '0.4rem' }}
            title="Quitar línea"
          />
        )}
      </div>
    </div>
  );
}
