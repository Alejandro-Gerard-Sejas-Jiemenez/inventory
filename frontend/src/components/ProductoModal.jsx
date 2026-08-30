import React, { useState, useEffect } from 'react';
import { Package, Save } from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { SelectField } from './common/SelectField';
import { TextAreaField } from './common/TextAreaField';
import { Button } from './common/Button';

export function ProductoModal({
  isOpen,
  onClose,
  onSave,
  producto,
  modelos = [],
  materiales = [],
  colores = [],
}) {
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    descripcion: '',
    idModelo: '',
    idMaterial: '',
    idColor: '',
    precioCompra: '',
    precioMayoreo: '',
    precioUnitario: '',
    stockActual: 0,
    stockMinimo: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (producto) {
      setFormData({
        sku: producto.sku || '',
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        idModelo: producto.modelo?.idModelo || '',
        idMaterial: producto.material?.idMaterial || '',
        idColor: producto.color?.idColor || '',
        precioCompra: producto.precioCompra || '',
        precioMayoreo: producto.precioMayoreo || '',
        precioUnitario: producto.precioUnitario || '',
        stockActual: producto.stockActual ?? 0,
        stockMinimo: producto.stockMinimo ?? 5,
      });
    } else {
      setFormData({
        sku: '',
        nombre: '',
        descripcion: '',
        idModelo: modelos.length > 0 ? modelos[0].idModelo : '',
        idMaterial: materiales.length > 0 ? materiales[0].idMaterial : '',
        idColor: colores.length > 0 ? colores[0].idColor : '',
        precioCompra: '',
        precioMayoreo: '',
        precioUnitario: '',
        stockActual: 0,
        stockMinimo: 5,
      });
    }
    setError('');
  }, [producto, modelos, materiales, colores, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sku || !formData.nombre || !formData.precioUnitario) {
      setError('Por favor completa los campos requeridos (*)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        ...formData,
        idModelo: formData.idModelo ? parseInt(formData.idModelo, 10) : null,
        idMaterial: formData.idMaterial ? parseInt(formData.idMaterial, 10) : null,
        idColor: formData.idColor ? parseInt(formData.idColor, 10) : null,
        precioCompra: formData.precioCompra ? parseFloat(formData.precioCompra) : 0,
        precioMayoreo: formData.precioMayoreo ? parseFloat(formData.precioMayoreo) : null,
        precioUnitario: parseFloat(formData.precioUnitario),
        stockActual: parseInt(formData.stockActual, 10) || 0,
        stockMinimo: parseInt(formData.stockMinimo, 10) || 5,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={producto ? 'Editar Producto' : 'Nuevo Producto'}
      subtitle="Complete los detalles técnicos y niveles de existencias"
      icon={Package}
      maxWidth="680px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="brand"
            onClick={handleSubmit}
            loading={loading}
            icon={Save}
          >
            Guardar Producto
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-red-bg)',
              color: 'var(--brand-red)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <InputField
            label="Código SKU"
            placeholder="Ej. LAP-MB-M3-GRIS"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />

          <SelectField
            label="Modelo"
            value={formData.idModelo}
            onChange={(e) => setFormData({ ...formData, idModelo: e.target.value })}
            placeholder="(Sin modelo específico)"
            options={modelos.map((m) => ({
              value: m.idModelo,
              label: `${m.nombre} ${m.marca ? `(${m.marca})` : ''}`,
            }))}
          />
        </div>

        <InputField
          label="Nombre del Producto"
          placeholder="Ej. MacBook Pro 14' M3 512GB"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <SelectField
            label="Material"
            value={formData.idMaterial}
            onChange={(e) => setFormData({ ...formData, idMaterial: e.target.value })}
            placeholder="(Sin material)"
            options={materiales.map((mat) => ({
              value: mat.idMaterial,
              label: mat.nombre,
            }))}
          />

          <SelectField
            label="Color"
            value={formData.idColor}
            onChange={(e) => setFormData({ ...formData, idColor: e.target.value })}
            placeholder="(Sin color)"
            options={colores.map((c) => ({
              value: c.idColor,
              label: `${c.nombre} ${c.codigoHex ? `(${c.codigoHex})` : ''}`,
            }))}
          />
        </div>

        <TextAreaField
          label="Descripción"
          placeholder="Especificaciones técnicas, características, memoria..."
          rows={2}
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />

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
            label="Precio Venta (Bs.)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={formData.precioUnitario}
            onChange={(e) => setFormData({ ...formData, precioUnitario: e.target.value })}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <InputField
            label={producto ? 'Stock Actual' : 'Stock Inicial'}
            type="number"
            min="0"
            value={formData.stockActual}
            onChange={(e) => setFormData({ ...formData, stockActual: e.target.value })}
            required
          />

          <InputField
            label="Stock Mínimo (Alerta)"
            type="number"
            min="0"
            value={formData.stockMinimo}
            onChange={(e) => setFormData({ ...formData, stockMinimo: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
}
