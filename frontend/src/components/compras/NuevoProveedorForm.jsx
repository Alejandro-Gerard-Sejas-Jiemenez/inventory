import React, { useState } from 'react';
import { Building, Plus } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';

export function NuevoProveedorForm({ onSubmit, onClose }) {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoProveedor.nombre) return;
    try {
      setLoading(true);
      await onSubmit(nuevoProveedor);
      setNuevoProveedor({ nombre: '', contacto: '', email: '', telefono: '', direccion: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderColor: 'var(--brand-gold)' }}>
      <CardTitle icon={Building} subtitle="Registrar nueva empresa proveedora o distribuidor">
        Nuevo Proveedor
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <InputField
              label="Empresa / Razón Social"
              placeholder="Ej. Distribuidora Tecnológica Los Andes"
              value={nuevoProveedor.nombre}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
              required
            />
            <InputField
              label="Persona de Contacto"
              placeholder="Ej. Ing. Carlos Mendoza"
              value={nuevoProveedor.contacto}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, contacto: e.target.value })}
            />
            <InputField
              label="Teléfono / WhatsApp"
              placeholder="Ej. +591 71234567"
              value={nuevoProveedor.telefono}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })}
            />
            <InputField
              label="Correo Electrónico"
              type="email"
              placeholder="proveedor@empresa.com"
              value={nuevoProveedor.email}
              onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })}
            />
          </div>

          <InputField
            label="Dirección / Ubicación"
            placeholder="Ej. Av. Comercio #450, Centro"
            value={nuevoProveedor.direccion}
            onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" variant="brand" icon={Plus} loading={loading}>
              Guardar Proveedor
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
