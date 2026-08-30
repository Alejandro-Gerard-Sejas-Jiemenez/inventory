import React, { useState } from 'react';
import { Tag, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';

export function NuevoMaterialForm({ onSubmit }) {
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoMaterial.nombre) return;
    try {
      setLoading(true);
      await onSubmit(nuevoMaterial);
      setNuevoMaterial({ nombre: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Tag} subtitle="Registrar nuevo tipo de material">
        Nuevo Material
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre del Material"
            placeholder="Ej. Titanio Grado 5 / Silicona Premium"
            value={nuevoMaterial.nombre}
            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })}
            required
          />
          <TextAreaField
            label="Descripción"
            placeholder="Propiedades, textura o uso..."
            rows={3}
            value={nuevoMaterial.descripcion}
            onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })}
          />
          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Material
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
