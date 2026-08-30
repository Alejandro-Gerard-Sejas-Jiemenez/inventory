import React, { useState } from 'react';
import { FolderTree, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';

export function NuevaCategoriaForm({ onSubmit }) {
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaCategoria.nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit(nuevaCategoria);
      setNuevaCategoria({ nombre: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={FolderTree} subtitle="Registrar nuevo rubro o categoría de producto">
        Nueva Categoría
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre de la Categoría"
            placeholder="Ej. Smartphones, Laptops, Audio, Accesorios..."
            value={nuevaCategoria.nombre}
            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
            required
          />
          <TextAreaField
            label="Descripción"
            placeholder="Alcance o tipos de productos incluidos..."
            rows={3}
            value={nuevaCategoria.descripcion}
            onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, descripcion: e.target.value })}
          />
          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Categoría
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
