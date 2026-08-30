import React, { useState } from 'react';
import { UserPlus, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

export function NuevoClienteForm({ onSubmit, onClose }) {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    try {
      setLoading(true);
      await onSubmit(nuevoCliente);
      setNuevoCliente({ nombre: '', email: '', telefono: '', direccion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderColor: 'var(--brand-gold)' }}>
      <CardTitle icon={UserPlus} subtitle="Registrar nuevo cliente para facturación y fidelización">
        Nuevo Cliente
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <InputField
              label="Nombre Completo / Razón Social"
              placeholder="Ej. Juan Pérez / Empresa SRL"
              value={nuevoCliente.nombre}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
              required
            />
            <InputField
              label="Teléfono / WhatsApp"
              placeholder="Ej. +591 76543210"
              value={nuevoCliente.telefono}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
            />
            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="cliente@correo.com"
              value={nuevoCliente.email}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
            />
            <InputField
              label="Dirección"
              placeholder="Ej. Calle Murillo #123, La Paz"
              value={nuevoCliente.direccion}
              onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" variant="brand" icon={Plus} loading={loading}>
              Guardar Cliente
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
