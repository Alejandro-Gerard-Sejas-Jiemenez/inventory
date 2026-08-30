import React, { useState } from 'react';
import { Award, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

export function NuevaMarcaForm({ onSubmit }) {
  const [nuevaMarca, setNuevaMarca] = useState({ nombre: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaMarca.nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit(nuevaMarca);
      setNuevaMarca({ nombre: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Award} subtitle="Registrar nueva marca o fabricante">
        Nueva Marca
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
          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Marca
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
