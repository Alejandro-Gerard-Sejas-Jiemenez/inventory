import React, { useState } from 'react';
import { Box, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';

export function NuevoModeloForm({ onSubmit }) {
  const [nuevoModelo, setNuevoModelo] = useState({ nombre: '', marca: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoModelo.nombre) return;
    try {
      setLoading(true);
      await onSubmit(nuevoModelo);
      setNuevoModelo({ nombre: '', marca: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Box} subtitle="Registrar nueva variante de modelo">
        Nuevo Modelo
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre del Modelo"
            placeholder="Ej. Galaxy Book 4 Pro / iPhone 15"
            value={nuevoModelo.nombre}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, nombre: e.target.value })}
            required
          />
          <InputField
            label="Marca / Fabricante"
            placeholder="Ej. Apple, Samsung, Dell"
            value={nuevoModelo.marca}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, marca: e.target.value })}
          />
          <TextAreaField
            label="Descripción"
            placeholder="Detalles del modelo, procesador o serie..."
            rows={3}
            value={nuevoModelo.descripcion}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, descripcion: e.target.value })}
          />
          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Modelo
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
