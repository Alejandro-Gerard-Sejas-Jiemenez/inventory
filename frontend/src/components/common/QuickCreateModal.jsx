import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';
import { Modal } from './Modal';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { Button } from './Button';

/**
 * Modal universal para la creación rápida de entidades secundarias (Categoría, Marca, Modelo, Color, Material, Propietario, Proveedor).
 */
export function QuickCreateModal({
  isOpen,
  onClose,
  type, // 'categoria' | 'marca' | 'modelo' | 'material' | 'color' | 'propietario' | 'proveedor'
  marcas = [],
  onCreate,
}) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idMarca, setIdMarca] = useState('');
  const [codigoHex, setCodigoHex] = useState('#3b82f6');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setIdMarca('');
    setCodigoHex('#3b82f6');
    setContacto('');
    setTelefono('');
  };

  const titles = {
    categoria: 'Crear Nueva Categoría',
    marca: 'Crear Nueva Marca',
    modelo: 'Crear Nuevo Modelo',
    material: 'Crear Nuevo Material',
    color: 'Crear Nuevo Color',
    propietario: 'Crear Nuevo Propietario',
    proveedor: 'Crear Nuevo Proveedor',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      setLoading(true);
      let payload = { nombre: nombre.trim() };

      if (type === 'categoria' || type === 'material') {
        payload.descripcion = descripcion.trim() || null;
      } else if (type === 'modelo') {
        payload.idMarca = idMarca ? Number(idMarca) : null;
        payload.descripcion = descripcion.trim() || null;
      } else if (type === 'color') {
        payload.codigoHex = codigoHex;
      } else if (type === 'proveedor') {
        payload.contacto = contacto.trim() || null;
        payload.telefono = telefono.trim() || null;
      }

      const created = await onCreate(payload);
      resetForm();
      onClose(created);
    } catch (err) {
      console.error(`Error creando ${type}:`, err);
      alert(`No se pudo crear: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose(null);
      }}
      title={titles[type] || 'Creación Rápida'}
      subtitle="Complete la información mínima para registrar"
      icon={Plus}
      maxWidth="480px"
      footer={
        <>
          <Button variant="secondary" onClick={() => onClose(null)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="quick-create-form"
            variant="brand"
            icon={Save}
            loading={loading}
          >
            Guardar y Seleccionar
          </Button>
        </>
      }
    >
      <form id="quick-create-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputField
          label="Nombre *"
          placeholder="Nombre del registro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        {type === 'modelo' && (
          <SelectField
            label="Marca Asociada (Opcional)"
            value={idMarca}
            onChange={(e) => setIdMarca(e.target.value)}
            placeholder="(Sin marca)"
            options={marcas.filter(m => m.activo !== false).map((m) => ({
              value: m.idMarca,
              label: m.nombre,
            }))}
          />
        )}

        {type === 'color' && (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <InputField
              label="Código de Color (HEX)"
              type="color"
              value={codigoHex}
              onChange={(e) => setCodigoHex(e.target.value)}
              style={{ width: '60px', height: '38px', padding: 0, cursor: 'pointer' }}
            />
            <InputField
              label="Código HEX Texto"
              placeholder="#3b82f6"
              value={codigoHex}
              onChange={(e) => setCodigoHex(e.target.value)}
            />
          </div>
        )}

        {type === 'proveedor' && (
          <>
            <InputField
              label="Contacto / Encargado"
              placeholder="Ej. Juan Pérez"
              value={contacto}
              onChange={(e) => setContacto(e.target.value)}
            />
            <InputField
              label="Teléfono"
              placeholder="Ej. 77712345"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </>
        )}

        {(type === 'categoria' || type === 'material' || type === 'modelo') && (
          <TextAreaField
            label="Descripción (Opcional)"
            placeholder="Detalles adicionales..."
            rows={2}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        )}
      </form>
    </Modal>
  );
}
