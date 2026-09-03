import React, { useState, useEffect } from 'react';
import { Box, Plus, Save } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';
import { QuickCreateModal } from '../common/QuickCreateModal';

export function NuevoModeloForm({ marcas = [], onSubmit, onCreateMarca, initialData }) {
  const [nuevoModelo, setNuevoModelo] = useState({ nombre: '', idMarca: '', descripcion: '' });
  const [loading, setLoading] = useState(false);
  const [showQuickMarca, setShowQuickMarca] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNuevoModelo({
        nombre: initialData.nombre || '',
        idMarca: initialData.marca?.idMarca || '',
        descripcion: initialData.descripcion || '',
      });
    } else {
      setNuevoModelo({ nombre: '', idMarca: '', descripcion: '' });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoModelo.nombre.trim()) return;
    try {
      setLoading(true);
      const payload = {
        nombre: nuevoModelo.nombre.trim(),
        descripcion: nuevoModelo.descripcion,
        marca: nuevoModelo.idMarca ? { idMarca: parseInt(nuevoModelo.idMarca, 10) } : null,
      };
      await onSubmit(payload);
      if (!initialData) {
        setNuevoModelo({ nombre: '', idMarca: '', descripcion: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMarcaCreated = (created) => {
    setShowQuickMarca(false);
    if (created && created.idMarca) {
      setNuevoModelo((prev) => ({ ...prev, idMarca: created.idMarca }));
    }
  };

  return (
    <Card>
      <CardTitle icon={Box} subtitle={initialData ? "Editar variante o modelo existente" : "Registrar nueva variante o modelo de una marca"}>
        {initialData ? 'Editar Modelo' : 'Nuevo Modelo'}
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre del Modelo"
            placeholder="Ej. iPhone 15 Pro, Galaxy S24 Ultra, XPS 15..."
            value={nuevoModelo.nombre}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, nombre: e.target.value })}
            required
          />

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-field-label" style={{ margin: 0 }}>Marca / Fabricante *</label>
              {onCreateMarca && (
                <button
                  type="button"
                  onClick={() => setShowQuickMarca(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand-gold)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}
                >
                  <Plus size={12} />
                  <span>+ Crear Marca</span>
                </button>
              )}
            </div>
            <SelectField
              placeholder="Seleccione la Marca..."
              value={nuevoModelo.idMarca}
              onChange={(e) => setNuevoModelo({ ...nuevoModelo, idMarca: e.target.value })}
              options={marcas.map((m) => ({
                value: m.idMarca,
                label: m.nombre,
              }))}
              required
            />
          </div>

          <TextAreaField
            label="Descripción"
            placeholder="Detalles del modelo, procesador o serie..."
            rows={3}
            value={nuevoModelo.descripcion}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, descripcion: e.target.value })}
          />

          <Button type="submit" variant="brand" icon={initialData ? Save : Plus} loading={loading}>
            {initialData ? 'Guardar Cambios' : 'Guardar Modelo'}
          </Button>
        </form>

        {onCreateMarca && (
          <QuickCreateModal
            isOpen={showQuickMarca}
            onClose={handleQuickMarcaCreated}
            type="marca"
            onCreate={onCreateMarca}
          />
        )}
      </CardBody>
    </Card>
  );
}
