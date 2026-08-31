import React, { useState, useEffect } from 'react';
import { Package, Save } from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { SelectField } from './common/SelectField';
import { TextAreaField } from './common/TextAreaField';
import { Button } from './common/Button';
import { ProductoFotoUploader } from './productos/ProductoFotoUploader';
import { ColorSelectorSection } from './productos/ColorSelectorSection';

/**
 * Modal de Creación y Edición de Productos.
 * Responsabilidad: Orquestación del formulario de producto y validación básica.
 */
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

  useEffect(() => {
    if (producto) {
      setFormData({
        idProducto: producto.idProducto,
        sku: producto.sku || '',
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagenUrl: producto.imagenUrl || '',
        idCategoria: producto.categoria?.idCategoria || '',
        idModelo: producto.modelo?.idModelo || '',
        idMaterial: producto.material?.idMaterial || '',
        idColor: producto.color?.idColor || '',
        precioCompra: producto.precioCompra != null ? producto.precioCompra : '',
        precioMayoreo: producto.precioMayoreo != null ? producto.precioMayoreo : '',
        precioUnitario: producto.precioUnitario != null ? producto.precioUnitario : '',
        stockActual: producto.stockActual != null ? producto.stockActual : 0,
        stockMinimo: producto.stockMinimo != null ? producto.stockMinimo : 5,
      });
    } else {
      setFormData({
        idProducto: null,
        sku: '',
        nombre: '',
        descripcion: '',
        imagenUrl: '',
        idCategoria: categorias[0]?.idCategoria || '',
        idModelo: '',
        idMaterial: '',
        idColor: '',
        precioCompra: '',
        precioMayoreo: '',
        precioUnitario: '',
        stockActual: 0,
        stockMinimo: 5,
      });
    }
  }, [producto, categorias, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        idProducto: formData.idProducto,
        sku: formData.sku?.trim() || null,
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion?.trim() || null,
        imagenUrl: formData.imagenUrl?.trim() || null,
        idCategoria: Number(formData.idCategoria),
        idModelo: formData.idModelo ? Number(formData.idModelo) : null,
        idMaterial: formData.idMaterial ? Number(formData.idMaterial) : null,
        idColor: formData.idColor ? Number(formData.idColor) : null,
        precioCompra: formData.precioCompra !== '' ? Number(formData.precioCompra) : null,
        precioMayoreo: formData.precioMayoreo !== '' ? Number(formData.precioMayoreo) : null,
        precioUnitario: Number(formData.precioUnitario),
        stockActual: Number(formData.stockActual),
        stockMinimo: Number(formData.stockMinimo),
      };
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Error guardando producto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={producto ? 'Editar Producto' : 'Nuevo Producto en Catálogo'}
      subtitle={producto ? `SKU: ${producto.sku || 'Sin SKU'}` : 'Complete la información para registrar el producto'}
      icon={Package}
      maxWidth="780px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="producto-form"
            variant="brand"
            icon={Save}
            loading={loading}
          >
            {producto ? 'Guardar Cambios' : 'Registrar Producto'}
          </Button>
        </>
      }
    >
      <form id="producto-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {/* 1. Subida y Vista Previa de Fotografía */}
        <ProductoFotoUploader
          imagenUrl={formData.imagenUrl}
          onImageChange={(newUrl) => setFormData({ ...formData, imagenUrl: newUrl })}
          onRemoveImage={() => setFormData({ ...formData, imagenUrl: '' })}
        />

        {/* 2. Categoría y Nombre */}
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

        {/* 3. Modelo y Material */}
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

        {/* 4. Selector de Color */}
        <ColorSelectorSection
          colores={colores}
          selectedColorId={formData.idColor}
          onSelectColor={(cId) => setFormData({ ...formData, idColor: cId })}
        />

        {/* 5. Descripción */}
        <TextAreaField
          label="Descripción"
          placeholder="Especificaciones técnicas, características, memoria..."
          rows={2}
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />

        {/* 6. Precios */}
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

        {/* 7. Stocks */}
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
