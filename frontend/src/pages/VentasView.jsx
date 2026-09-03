import React, { useState } from 'react';
import { ShoppingCart, Plus, UserPlus, Users } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { NuevaVentaPOSForm } from '../components/ventas/NuevaVentaPOSForm';

export function VentasView({
  ventas = [],
  productos = [],
  usuarios = [],
  onRegistrarVenta,
}) {
  const [showNuevaVenta, setShowNuevaVenta] = useState(false);

  const handleVentaSubmit = async (payload) => {
    await onRegistrarVenta(payload);
    setShowNuevaVenta(false);
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


  return (
    <div className="view-container">
      <PageHeader
        title="Módulo de Ventas & Facturación"
        subtitle="Punto de venta con descuento automático de existencias en tiempo real"
        actions={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button
              variant={showNuevaVenta ? 'secondary' : 'brand'}
              onClick={() => setShowNuevaVenta(!showNuevaVenta)}
              icon={Plus}
            >
              {showNuevaVenta ? 'Cerrar Punto de Venta' : 'Nueva Venta (POS)'}
            </Button>
          </div>
        }
      />

      {showNuevaVenta && (
        <NuevaVentaPOSForm
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
            searchPlaceholder="Buscar por método de pago, total..."
            emptyMessage="No se han registrado ventas todavía."
          />
        </CardBody>
      </Card>
    </div>
  );
}
