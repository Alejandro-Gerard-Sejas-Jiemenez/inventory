import React, { useState } from 'react';
import { Palette, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

export function NuevoColorForm({ onSubmit }) {
  const [nuevoColor, setNuevoColor] = useState({ nombre: '', codigoHex: '#F59E0B' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoColor.nombre) return;
    try {
      setLoading(true);
      await onSubmit(nuevoColor);
      setNuevoColor({ nombre: '', codigoHex: '#F59E0B' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardTitle icon={Palette} subtitle="Registrar nuevo tono de color">
        Nuevo Color
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputField
            label="Nombre del Color"
            placeholder="Ej. Amarillo Caserito / Negro Carbón"
            value={nuevoColor.nombre}
            onChange={(e) => setNuevoColor({ ...nuevoColor, nombre: e.target.value })}
            required
          />
          <div className="form-field-group">
            <label className="form-field-label">Código HEX & Muestra</label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="color"
                style={{
                  width: '45px',
                  height: '42px',
                  padding: '2px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                }}
                value={nuevoColor.codigoHex}
                onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
              />
              <input
                type="text"
                className="form-field-input"
                value={nuevoColor.codigoHex}
                onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
                placeholder="#F59E0B"
              />
            </div>
          </div>
          <Button type="submit" variant="brand" icon={Plus} loading={loading}>
            Guardar Color
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
