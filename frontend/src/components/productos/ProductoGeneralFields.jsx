import React from 'react';
import { Plus } from 'lucide-react';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { TextAreaField } from '../common/TextAreaField';

export function ProductoGeneralFields({
  formData,
  setFormData,
  categorias = [],
  materiales = [],
  propietarios = [],
  filterActive,
  onCreateCategoria,
  onCreateMaterial,
  onCreatePropietario,
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
      <h4 style={{ margin: 0, paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', color: 'var(--brand-gold)' }}>
        Datos Generales
      </h4>

      {/* Categoría y Nombre */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label className="form-field-label" style={{ margin: 0 }}>Categoría *</label>
            {onCreateCategoria && renderShortcutButton('+ Nueva Categoría', () => setQuickCreateType('categoria'))}
          </div>
          <SelectField
            value={formData.idCategoria}
            onChange={(e) => setFormData({ ...formData, idCategoria: e.target.value })}
            placeholder="(Seleccionar Categoría...)"
            options={filterActive(categorias).map((c) => ({
              value: c.idCategoria,
              label: c.nombre,
            }))}
            required
          />
        </div>

        <InputField
          label="Nombre del Producto Base *"
          placeholder="Ej. Funda Transparente Antigolpes"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </div>

      {/* Material y Propietario */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label className="form-field-label" style={{ margin: 0 }}>Material</label>
            {onCreateMaterial && renderShortcutButton('+ Nuevo Material', () => setQuickCreateType('material'))}
          </div>
          <SelectField
            value={formData.idMaterial}
            onChange={(e) => setFormData({ ...formData, idMaterial: e.target.value })}
            placeholder="(Sin material)"
            options={filterActive(materiales).map((mat) => ({
              value: mat.idMaterial,
              label: mat.nombre,
            }))}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label className="form-field-label" style={{ margin: 0 }}>Propietario / Dueño *</label>
            {onCreatePropietario && renderShortcutButton('+ Nuevo Propietario', () => setQuickCreateType('propietario'))}
          </div>
          <SelectField
            value={formData.idPropietario}
            onChange={(e) => setFormData({ ...formData, idPropietario: e.target.value })}
            placeholder="(Seleccionar propietario...)"
            options={filterActive(propietarios).map((p) => ({
              value: p.idPropietario,
              label: p.nombre,
            }))}
            required
          />
        </div>
      </div>

      {/* Precios */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        <InputField
          label="Precio Compra (Bs.)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.precioCompra}
          onChange={(e) => setFormData({ ...formData, precioCompra: e.target.value })}
        />

        <InputField
          label="Precio Mayoreo (Bs.)"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.precioMayoreo}
          onChange={(e) => setFormData({ ...formData, precioMayoreo: e.target.value })}
        />

        <InputField
          label="Precio Venta (Bs.) *"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={formData.precioUnitario}
          onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
          required
        />
      </div>

      {/* Descripción */}
      <TextAreaField
        label="Descripción (Aplica a todas las variantes)"
        placeholder="Especificaciones técnicas, características, memoria..."
        rows={2}
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
      />
    </>
  );
}
