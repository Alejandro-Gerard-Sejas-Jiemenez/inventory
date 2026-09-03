import React, { useState, useEffect } from 'react';
import { Package, Save } from 'lucide-react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { ProductoFotoUploader } from './productos/ProductoFotoUploader';
import { ProductoGeneralFields } from './productos/ProductoGeneralFields';
import { ProductoVariantesList } from './productos/ProductoVariantesList';
import { QuickCreateModal } from './common/QuickCreateModal';

/**
 * Modal de Creación y Edición de Productos.
 * Responsabilidad única: Orquestación limpia del formulario de producto y sus modales de soporte.
 */
export function ProductoModal({
  isOpen,
  onClose,
  onSave,
  producto,
  categorias = [],
  marcas = [],
  modelos = [],
  materiales = [],
  colores = [],
  propietarios = [],
  onCreateCategoria,
  onCreateMaterial,
  onCreatePropietario,
  onCreateModelo,
  onCreateColor,
}) {
  const [formData, setFormData] = useState({
    idProducto: null,
    nombre: '',
    descripcion: '',
    imagenUrl: '',
    idCategoria: '',
    idMaterial: '',
    idPropietario: '',
    precioCompra: '',
    precioMayoreo: '',
    precioUnitario: '',
    variantes: [],
  });

  const [loading, setLoading] = useState(false);
  const [quickCreateType, setQuickCreateType] = useState(null);
  const [activeVarianteIndexForQuick, setActiveVarianteIndexForQuick] = useState(null);

  useEffect(() => {
    if (producto) {
      setFormData({
        idProducto: producto.idProducto,
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        imagenUrl: producto.imagenUrl || '',
        idCategoria: producto.categoria?.idCategoria || '',
        idMaterial: producto.material?.idMaterial || '',
        idPropietario: producto.propietario?.idPropietario || '',
        precioCompra: producto.precioCompra != null ? producto.precioCompra : '',
        precioMayoreo: producto.precioMayoreo != null ? producto.precioMayoreo : '',
        precioUnitario: producto.precioUnitario != null ? producto.precioUnitario : '',
        variantes: (producto.variantes || []).map(v => ({
          idVariante: v.idVariante,
          sku: v.sku || '',
          idModelo: v.modelo?.idModelo || '',
          idColor: v.color?.idColor || '',
          stockActual: v.stockActual != null ? v.stockActual : 0,
          stockMinimo: v.stockMinimo != null ? v.stockMinimo : 5,
        })),
      });
    } else {
      setFormData({
        idProducto: null,
        nombre: '',
        descripcion: '',
        imagenUrl: '',
        idCategoria: categorias[0]?.idCategoria || '',
        idMaterial: '',
        idPropietario: '',
        precioCompra: '',
        precioMayoreo: '',
        precioUnitario: '',
        variantes: [{ sku: '', idModelo: '', idColor: '', stockActual: 0, stockMinimo: 5 }],
      });
    }
  }, [producto, categorias, isOpen]);

  const filterActive = (list) => list.filter(item => item.activo !== false);

  const handleAddVariante = () => {
    setFormData(prev => ({
      ...prev,
      variantes: [...prev.variantes, { sku: '', idModelo: '', idColor: '', stockActual: 0, stockMinimo: 5 }],
    }));
  };

  const handleRemoveVariante = (index) => {
    setFormData(prev => {
      const newVariantes = [...prev.variantes];
      newVariantes.splice(index, 1);
      return { ...prev, variantes: newVariantes };
    });
  };

  const updateVariante = (index, field, value) => {
    setFormData(prev => {
      const newVariantes = [...prev.variantes];
      newVariantes[index][field] = value;
      return { ...prev, variantes: newVariantes };
    });
  };

  const handleQuickCreateComplete = (created) => {
    const type = quickCreateType;
    setQuickCreateType(null);

    if (!created) return;

    if (type === 'categoria') {
      setFormData(prev => ({ ...prev, idCategoria: created.idCategoria }));
    } else if (type === 'material') {
      setFormData(prev => ({ ...prev, idMaterial: created.idMaterial }));
    } else if (type === 'propietario') {
      setFormData(prev => ({ ...prev, idPropietario: created.idPropietario }));
    } else if (type === 'modelo' && activeVarianteIndexForQuick !== null) {
      updateVariante(activeVarianteIndexForQuick, 'idModelo', created.idModelo);
    } else if (type === 'color' && activeVarianteIndexForQuick !== null) {
      updateVariante(activeVarianteIndexForQuick, 'idColor', created.idColor);
    }
    setActiveVarianteIndexForQuick(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.variantes.length === 0) {
      alert("Debe agregar al menos una variante al producto.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        idProducto: formData.idProducto,
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion?.trim() || null,
        imagenUrl: formData.imagenUrl?.trim() || null,
        idCategoria: Number(formData.idCategoria),
        idMaterial: formData.idMaterial ? Number(formData.idMaterial) : null,
        idPropietario: formData.idPropietario ? Number(formData.idPropietario) : null,
        precioCompra: formData.precioCompra !== '' ? Number(formData.precioCompra) : null,
        precioMayoreo: formData.precioMayoreo !== '' ? Number(formData.precioMayoreo) : null,
        precioUnitario: Number(formData.precioUnitario),
        variantes: formData.variantes.map(v => ({
          idVariante: v.idVariante || null,
          sku: v.sku?.trim() || null,
          idModelo: v.idModelo ? Number(v.idModelo) : null,
          idColor: v.idColor ? Number(v.idColor) : null,
          stockActual: Number(v.stockActual),
          stockMinimo: Number(v.stockMinimo),
        })),
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
      subtitle={producto ? `Múltiples Variantes` : 'Complete la información general y las variantes (modelos/colores)'}
      icon={Package}
      maxWidth="920px"
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
        <ProductoFotoUploader
          imagenUrl={formData.imagenUrl}
          onImageChange={(newUrl) => setFormData(prev => ({ ...prev, imagenUrl: newUrl }))}
          onRemoveImage={() => setFormData(prev => ({ ...prev, imagenUrl: '' }))}
        />

        <ProductoGeneralFields
          formData={formData}
          setFormData={setFormData}
          categorias={categorias}
          materiales={materiales}
          propietarios={propietarios}
          filterActive={filterActive}
          onCreateCategoria={onCreateCategoria}
          onCreateMaterial={onCreateMaterial}
          onCreatePropietario={onCreatePropietario}
          setQuickCreateType={setQuickCreateType}
        />

        <ProductoVariantesList
          variantes={formData.variantes}
          modelos={modelos}
          colores={colores}
          isEditMode={Boolean(producto)}
          filterActive={filterActive}
          onAddVariante={handleAddVariante}
          onRemoveVariante={handleRemoveVariante}
          onUpdateVariante={updateVariante}
          onCreateModelo={onCreateModelo}
          onCreateColor={onCreateColor}
          setActiveVarianteIndexForQuick={setActiveVarianteIndexForQuick}
          setQuickCreateType={setQuickCreateType}
        />
      </form>

      {quickCreateType && (
        <QuickCreateModal
          isOpen={Boolean(quickCreateType)}
          onClose={handleQuickCreateComplete}
          type={quickCreateType}
          marcas={marcas}
          onCreate={
            quickCreateType === 'categoria' ? onCreateCategoria :
            quickCreateType === 'material' ? onCreateMaterial :
            quickCreateType === 'propietario' ? onCreatePropietario :
            quickCreateType === 'modelo' ? onCreateModelo :
            quickCreateType === 'color' ? onCreateColor :
            null
          }
        />
      )}
    </Modal>
  );
}
