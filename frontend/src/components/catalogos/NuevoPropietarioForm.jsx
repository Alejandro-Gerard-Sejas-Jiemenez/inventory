import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import { InputField } from '../common/InputField';
import { Users, Plus, Save } from 'lucide-react';

export function NuevoPropietarioForm({ onSubmit, initialData }) {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
    } else {
      setNombre('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      setLoading(true);
      await onSubmit({ nombre });
      if (!initialData) {
        setNombre('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Users} subtitle={initialData ? "Editar datos del propietario" : "Agrega un nuevo propietario al sistema"}>
        {initialData ? 'Editar Propietario' : 'Nuevo Propietario'}
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre o Alias del Propietario"
            id="nombre"
            placeholder="Ej: Alejandro, Hermana, Socio..."
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="brand" icon={initialData ? Save : Plus} loading={loading}>
              {initialData ? 'Guardar Cambios' : 'Crear Propietario'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
