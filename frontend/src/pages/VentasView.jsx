import React, { useState } from 'react';
import { ShoppingCart, Plus, UserPlus, Users } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { NuevaVentaPOSForm } from '../components/ventas/NuevaVentaPOSForm';
import { NuevoClienteForm } from '../components/ventas/NuevoClienteForm';

export function VentasView({
  ventas = [],
  clientes = [],
  productos = [],
  usuarios = [],
  onRegistrarVenta,
  onCreateCliente,
}) {
  const [subTab, setSubTab] = useState('ventas');
  const [showNuevaVenta, setShowNuevaVenta] = useState(false);
  const [showNuevoCliente, setShowNuevoCliente] = useState(false);

  const tabsConfig = [
    { id: 'ventas', label: 'Historial de Ventas', count: ventas.length, icon: ShoppingCart },
    { id: 'clientes', label: 'Clientes Registrados', count: clientes.length, icon: Users },
  ];

  const handleVentaSubmit = async (payload) => {
    await onRegistrarVenta(payload);
    setShowNuevaVenta(false);
  };

  const handleClienteSubmit = async (payload) => {
    await onCreateCliente(payload);
    setShowNuevoCliente(false);
  };

  const ventasColumns = [
    { header: '# Venta', accessor: 'idVenta', width: '90px', render: (v) => <Badge variant="brand">#{v.idVenta}</Badge> },
    { header: 'Fecha & Hora', render: (v) => <span>{v.fecha} {v.hora}</span> },
    { header: 'Cliente', render: (v) => <strong style={{ color: 'var(--text-white)' }}>{v.cliente?.nombre || 'Venta al Mostrador'}</strong> },
    { header: 'Método Pago', render: (v) => <Badge variant="neutral">{v.metodoPago || 'EFECTIVO'}</Badge> },
    { header: 'Atendido Por', render: (v) => <span style={{ color: 'var(--text-secondary)' }}>{v.usuario?.nombre || 'Cajero'}</span> },
    {
      header: 'Total Facturado',
      render: (v) => (
        <strong style={{ color: 'var(--brand-gold)', fontSize: '1rem' }}>
          Bs. {Number(v.total).toFixed(2)}
        </strong>
      ),
    },
    {
      header: 'Estado',
      render: (v) => <Badge variant="success">{v.estado || 'COMPLETADA'}</Badge>,
    },
  ];

  const clientesColumns = [
    { header: 'ID', accessor: 'idCliente', width: '70px', render: (cl) => <span style={{ color: 'var(--text-muted)' }}>#{cl.idCliente}</span> },
    { header: 'Nombre / Razón Social', render: (cl) => <strong style={{ color: 'var(--text-white)' }}>{cl.nombre}</strong> },
    { header: 'Teléfono', render: (cl) => cl.telefono || '-' },
    { header: 'Correo Electrónico', render: (cl) => cl.email || '-' },
    { header: 'Dirección', render: (cl) => <span style={{ color: 'var(--text-muted)' }}>{cl.direccion || '-'}</span> },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Módulo de Ventas & Facturación"
        subtitle="Punto de venta con descuento automático de existencias en tiempo real"
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Tabs tabs={tabsConfig} activeTab={subTab} onChange={setSubTab} />
            {subTab === 'ventas' ? (
              <Button
                variant={showNuevaVenta ? 'secondary' : 'brand'}
                onClick={() => setShowNuevaVenta(!showNuevaVenta)}
                icon={Plus}
              >
                {showNuevaVenta ? 'Cerrar Punto de Venta' : 'Nueva Venta (POS)'}
              </Button>
            ) : (
              <Button
                variant={showNuevoCliente ? 'secondary' : 'brand'}
                onClick={() => setShowNuevoCliente(!showNuevoCliente)}
                icon={UserPlus}
              >
                {showNuevoCliente ? 'Cerrar Formulario' : 'Nuevo Cliente'}
              </Button>
            )}
          </div>
        }
      />

      {subTab === 'ventas' && (
        <>
          {showNuevaVenta && (
            <NuevaVentaPOSForm
              clientes={clientes}
              productos={productos}
              usuarios={usuarios}
              onSubmit={handleVentaSubmit}
              onClose={() => setShowNuevaVenta(false)}
            />
          )}

          <Card>
            <CardTitle icon={ShoppingCart} subtitle="Registro cronológico de órdenes facturadas">
              Historial de Ventas Emitidas
            </CardTitle>
            <CardBody>
              <DataTable
                columns={ventasColumns}
                data={ventas}
                keyExtractor={(v) => v.idVenta}
                showSearch={true}
                searchPlaceholder="Buscar por cliente, método de pago, total..."
                emptyMessage="No se han registrado ventas todavía."
              />
            </CardBody>
          </Card>
        </>
      )}

      {subTab === 'clientes' && (
        <>
          {showNuevoCliente && (
            <NuevoClienteForm
              onSubmit={handleClienteSubmit}
              onClose={() => setShowNuevoCliente(false)}
            />
          )}

          <Card>
            <CardTitle icon={Users} subtitle="Directorio de clientes registrados">
              Listado de Clientes
            </CardTitle>
            <CardBody>
              <DataTable
                columns={clientesColumns}
                data={clientes}
                keyExtractor={(cl) => cl.idCliente}
                showSearch={true}
                searchPlaceholder="Buscar cliente por nombre, teléfono o email..."
                emptyMessage="No hay clientes registrados aún."
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
