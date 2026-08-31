import React, { useState, useEffect } from 'react';
import { Package, Save, Check, Image as ImageIcon, X, Link } from 'lucide-react';
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
  categorias = [],
  modelos = [],
  materiales = [],
  colores = [],
}) {
  const [formData, setFormData] = useState({
    idProducto: null,
    sku: '',
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    idCategoria: '',
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
        idProducto: producto.idProducto,
        sku: producto.sku || '',
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagenUrl: producto.imagenUrl || '',
        idCategoria: producto.categoria?.idCategoria || (categorias.length > 0 ? categorias[0].idCategoria : ''),
        idModelo: producto.modelo?.idModelo || '',
        idMaterial: producto.material?.idMaterial || '',
        idColor: producto.color?.idColor || '',
        precioCompra: producto.precioCompra ?? '',
        precioMayoreo: producto.precioMayoreo ?? '',
        precioUnitario: producto.precioUnitario ?? '',
        stockActual: producto.stockActual ?? 0,
        stockMinimo: producto.stockMinimo ?? 5,
      });
    } else {
      setFormData({
        idProducto: null,
        sku: '',
        nombre: '',
        descripcion: '',
        imagenUrl: '',
        idCategoria: categorias.length > 0 ? categorias[0].idCategoria : '',
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
  }, [producto, categorias, modelos, materiales, colores, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precioUnitario) {
      setError('Por favor completa los campos obligatorios: Nombre y Precio de Venta (*)');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        idProducto: formData.idProducto || undefined,
        sku: formData.sku || undefined,
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion || '',
        imagenUrl: formData.imagenUrl?.trim() || null,
        idCategoria: formData.idCategoria ? parseInt(formData.idCategoria, 10) : null,
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
      subtitle={producto ? `Modificando existencias y atributos (ID: #${producto.idProducto})` : 'Registrar nuevo artículo en el catálogo multirubro'}
      icon={Package}
      maxWidth="720px"
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
            {producto ? 'Guardar Cambios' : 'Registrar Producto'}
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

        {/* Sección de Imagen del Producto */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.85rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            alignItems: 'center',
          }}
        >
          {/* Vista Previa de Imagen */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-sm)',
              border: '2px dashed var(--border-color)',
              backgroundColor: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {formData.imagenUrl ? (
              <img
                src={formData.imagenUrl}
                alt="Vista previa"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <ImageIcon size={28} style={{ color: 'var(--text-muted)' }} />
            )}
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label className="form-field-label" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ImageIcon size={14} style={{ color: 'var(--brand-gold)' }} />
              Imagen del Producto (URL)
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <InputField
                  placeholder="https://ejemplo.com/foto-producto.jpg"
                  value={formData.imagenUrl}
                  onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
                  icon={Link}
                />
              </div>
              {formData.imagenUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData({ ...formData, imagenUrl: '' })}
                  icon={X}
                  title="Quitar imagen"
                />
              )}
            </div>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Pega el enlace de la fotografía o déjalo vacío para usar el icono por defecto.
            </span>
          </div>
        </div>

        {/* Categoría y Nombre del Producto */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <SelectField
            label="Categoría del Producto"
            value={formData.idCategoria}
            onChange={(e) => setFormData({ ...formData, idCategoria: e.target.value })}
            placeholder="(Seleccionar Categoría...)"
            options={categorias.map((c) => ({
              value: c.idCategoria,
              label: c.nombre,
            }))}
            required
          />

          <InputField
            label="Nombre del Producto"
            placeholder="Ej. MacBook Pro 14' M3 512GB / Samsung S24"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        {/* Modelo y Material */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <SelectField
            label="Modelo & Marca"
            value={formData.idModelo}
            onChange={(e) => setFormData({ ...formData, idModelo: e.target.value })}
            placeholder="(Sin modelo específico)"
            options={modelos.map((m) => ({
              value: m.idModelo,
              label: `${m.nombre} ${m.marca?.nombre ? `(${m.marca.nombre})` : ''}`,
            }))}
          />

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
        </div>

        {/* Selector Visual de Colores */}
        <div>
          <label className="form-field-label">Color del Producto</label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              padding: '0.6rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              maxHeight: '120px',
              overflowY: 'auto',
            }}
          >
            {colores.map((c) => {
              const isSelected = String(formData.idColor) === String(c.idColor);
              return (
                <button
                  key={c.idColor}
                  type="button"
                  onClick={() => setFormData({ ...formData, idColor: c.idColor })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--brand-gold-bg)' : 'rgba(255,255,255,0.05)',
                    border: isSelected ? '1px solid var(--brand-gold)' : '1px solid rgba(255,255,255,0.1)',
                    color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '3px',
                      backgroundColor: c.codigoHex || '#888',
                      border: '1px solid rgba(255,255,255,0.3)',
                      flexShrink: 0,
                    }}
                  />
                  <span>{c.nombre}</span>
                  {isSelected && <Check size={13} />}
                </button>
              );
            })}
          </div>
        </div>

        <TextAreaField
          label="Descripción"
          placeholder="Especificaciones técnicas, características, memoria..."
          rows={2}
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />

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

        {/* Stocks */}
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
