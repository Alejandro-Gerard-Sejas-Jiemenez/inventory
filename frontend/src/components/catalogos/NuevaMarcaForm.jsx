import React, { useState, useEffect } from 'react';
import { Award, Plus, Save } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

export function NuevaMarcaForm({ onSubmit, initialData }) {
  const [nuevaMarca, setNuevaMarca] = useState({ nombre: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNuevaMarca({ nombre: initialData.nombre || '' });
    } else {
      setNuevaMarca({ nombre: '' });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaMarca.nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit(nuevaMarca);
      if (!initialData) {
        setNuevaMarca({ nombre: '' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Award} subtitle={initialData ? "Editar marca o fabricante existente" : "Registrar nueva marca o fabricante"}>
        {initialData ? 'Editar Marca' : 'Nueva Marca'}
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre de la Marca"
            placeholder="Ej. Apple, Samsung, Dell, Sony, Xiaomi..."
            value={nuevaMarca.nombre}
            onChange={(e) => setNuevaMarca({ ...nuevaMarca, nombre: e.target.value })}
            required
          />
          <Button type="submit" variant="brand" icon={initialData ? Save : Plus} loading={loading}>
            {initialData ? 'Guardar Cambios' : 'Guardar Marca'}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
