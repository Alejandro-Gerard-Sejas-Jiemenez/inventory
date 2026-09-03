import React, { useState } from 'react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import { InputField } from '../common/InputField';
import { Users, Plus } from 'lucide-react';

export function NuevoPropietarioForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit({ nombre });
      setNombre('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Users} subtitle="Agrega un nuevo propietario al sistema">
        Nuevo Propietario
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Nombre o Alias del Propietario"
            id="nombre"
            placeholder="Ej: Alejandro, Hermana, Socio..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--spacing-md)' }}>
            <Button type="submit" variant="primary" icon={Plus} loading={loading}>
              Crear Propietario
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
