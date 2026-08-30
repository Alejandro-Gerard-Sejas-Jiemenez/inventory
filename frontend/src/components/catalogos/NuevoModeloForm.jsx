import React, { useState } from 'react';
import { Box, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';

export function NuevoModeloForm({ marcas = [], onSubmit }) {
  const [nuevoModelo, setNuevoModelo] = useState({ nombre: '', idMarca: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

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
      setNuevoModelo({ nombre: '', idMarca: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Box} subtitle="Registrar nueva variante o modelo de una marca">
        Nuevo Modelo
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

          <SelectField
            label="Marca / Fabricante"
            placeholder="Seleccione la Marca..."
            value={nuevoModelo.idMarca}
            onChange={(e) => setNuevoModelo({ ...nuevoModelo, idMarca: e.target.value })}
            options={marcas.map((m) => ({
              value: m.idMarca,
              label: m.nombre,
            }))}
            required
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
