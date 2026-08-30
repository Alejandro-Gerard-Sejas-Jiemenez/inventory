import React, { useState } from 'react';
import { Truck, Plus, Building } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { NuevaCompraForm } from '../components/compras/NuevaCompraForm';
import { NuevoProveedorForm } from '../components/compras/NuevoProveedorForm';

export function ComprasView({
  compras = [],
  proveedores = [],
  productos = [],
  usuarios = [],
  onRegistrarCompra,
  onCreateProveedor,
}) {
  const [subTab, setSubTab] = useState('compras');
  const [showNuevaCompra, setShowNuevaCompra] = useState(false);
  const [showNuevoProveedor, setShowNuevoProveedor] = useState(false);

  const tabsConfig = [
    { id: 'compras', label: 'Historial de Compras', count: compras.length, icon: Truck },
    { id: 'proveedores', label: 'Proveedores Registrados', count: proveedores.length, icon: Building },
  ];

  const handleCompraSubmit = async (payload) => {
    await onRegistrarCompra(payload);
    setShowNuevaCompra(false);
  };

  const handleProveedorSubmit = async (payload) => {
    await onCreateProveedor(payload);
    setShowNuevoProveedor(false);
  };

  const comprasColumns = [
    { header: '# Orden', accessor: 'idCompra', width: '90px', render: (c) => <Badge variant="brand">#{c.idCompra}</Badge> },
    { header: 'Fecha & Hora', render: (c) => <span>{c.fecha} {c.hora}</span> },
    { header: 'Proveedor', render: (c) => <strong style={{ color: 'var(--text-white)' }}>{c.proveedor?.nombre}</strong> },
    { header: 'Registrado Por', render: (c) => <span style={{ color: 'var(--text-secondary)' }}>{c.usuario?.nombre || 'Admin'}</span> },
    {
      header: 'Total Compra',
      render: (c) => (
        <strong style={{ color: 'var(--brand-gold)', fontSize: '1rem' }}>
          Bs. {Number(c.total).toFixed(2)}
        </strong>
      ),
    },
    {
      header: 'Estado',
      render: (c) => <Badge variant="success">{c.estado || 'COMPLETADA'}</Badge>,
    },
  ];

  const proveedoresColumns = [
    { header: 'ID', accessor: 'idProveedor', width: '70px', render: (pr) => <span style={{ color: 'var(--text-muted)' }}>#{pr.idProveedor}</span> },
    { header: 'Empresa / Proveedor', render: (pr) => <strong style={{ color: 'var(--text-white)' }}>{pr.nombre}</strong> },
    { header: 'Contacto', render: (pr) => pr.contacto || '-' },
    { header: 'Teléfono', render: (pr) => pr.telefono || '-' },
    { header: 'Email', render: (pr) => pr.email || '-' },
    { header: 'Dirección', render: (pr) => <span style={{ color: 'var(--text-muted)' }}>{pr.direccion || '-'}</span> },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Módulo de Compras & Proveedores"
        subtitle="Gestión de adquisiciones, costeo y catálogo de distribuidores para Los Caseritos"
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Tabs tabs={tabsConfig} activeTab={subTab} onChange={setSubTab} />
            {subTab === 'compras' ? (
              <Button
                variant={showNuevaCompra ? 'secondary' : 'brand'}
                onClick={() => setShowNuevaCompra(!showNuevaCompra)}
                icon={Plus}
              >
                {showNuevaCompra ? 'Cerrar Formulario' : 'Nueva Orden de Compra'}
              </Button>
            ) : (
              <Button
                variant={showNuevoProveedor ? 'secondary' : 'brand'}
                onClick={() => setShowNuevoProveedor(!showNuevoProveedor)}
                icon={Plus}
              >
                {showNuevoProveedor ? 'Cerrar Formulario' : 'Nuevo Proveedor'}
              </Button>
            )}
          </div>
        }
      />

      {subTab === 'compras' && (
        <>
          {showNuevaCompra && (
            <NuevaCompraForm
              proveedores={proveedores}
              productos={productos}
              usuarios={usuarios}
              onSubmit={handleCompraSubmit}
              onClose={() => setShowNuevaCompra(false)}
            />
          )}

          <Card>
            <CardTitle icon={Truck} subtitle="Historial cronológico de compras registradas">
              Órdenes de Compra Realizadas
            </CardTitle>
            <CardBody>
              <DataTable
                columns={comprasColumns}
                data={compras}
                keyExtractor={(c) => c.idCompra}
                showSearch={true}
                searchPlaceholder="Buscar por proveedor, orden, total..."
                emptyMessage="No se han registrado órdenes de compra todavía."
              />
            </CardBody>
          </Card>
        </>
      )}

      {subTab === 'proveedores' && (
        <>
          {showNuevoProveedor && (
            <NuevoProveedorForm
              onSubmit={handleProveedorSubmit}
              onClose={() => setShowNuevoProveedor(false)}
            />
          )}

          <Card>
            <CardTitle icon={Building} subtitle="Directorio de proveedores registrados">
              Listado de Proveedores ({proveedores.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={proveedoresColumns}
                data={proveedores}
                keyExtractor={(pr) => pr.idProveedor}
                showSearch={true}
                searchPlaceholder="Buscar proveedor por empresa, contacto, teléfono..."
                emptyMessage="No hay proveedores registrados aún."
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
