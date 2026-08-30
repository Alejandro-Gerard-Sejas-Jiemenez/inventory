import React from 'react';
import { ArrowLeftRight, ArrowDownRight, ArrowUpRight, RefreshCw, User } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';

export function MovimientosView({ movimientos = [] }) {
  const getBadgeVariant = (tipo) => {
    switch (tipo) {
      case 'ENTRADA':
      case 'COMPRA':
        return { variant: 'success', icon: ArrowDownRight };
      case 'SALIDA':
      case 'VENTA':
        return { variant: 'danger', icon: ArrowUpRight };
      default:
        return { variant: 'brand', icon: RefreshCw };
    }
  };

  const columns = [
    {
      header: '# Kardex',
      accessor: 'idMovimiento',
      width: '80px',
      render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMovimiento}</span>,
    },
    {
      header: 'Fecha & Hora',
      render: (m) => (
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {new Date(m.fechaHora).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Producto',
      render: (m) => (
        <div>
          <strong style={{ color: 'var(--text-white)' }}>
            {m.producto?.nombre || 'Producto'}
          </strong>
          <div style={{ fontSize: '0.75rem', color: 'var(--brand-gold)' }}>
            SKU: {m.producto?.sku || '-'}
          </div>
        </div>
      ),
    },
    {
      header: 'Tipo Movimiento',
      render: (m) => {
        const { variant, icon: Icon } = getBadgeVariant(m.tipo);
        return (
          <Badge variant={variant} icon={Icon}>
            {m.tipo}
          </Badge>
        );
      },
    },
    {
      header: 'Cantidad',
      render: (m) => (
        <strong style={{ fontSize: '1rem', color: 'var(--text-white)' }}>
          {m.cantidad}
        </strong>
      ),
    },
    {
      header: 'Stock Inicial',
      render: (m) => <span style={{ color: 'var(--text-muted)' }}>{m.stockAntes}</span>,
    },
    {
      header: 'Stock Final',
      render: (m) => (
        <strong style={{ color: 'var(--brand-gold)', fontSize: '1rem' }}>
          {m.stockDespues}
        </strong>
      ),
    },
    {
      header: 'Motivo / Causa',
      render: (m) => (
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
          {m.motivo || '-'}
        </span>
      ),
    },
    {
      header: 'Usuario',
      render: (m) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <User size={14} style={{ color: 'var(--brand-gold)' }} />
          <span>{m.usuario?.nombre || 'Sistema'}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Auditoría de Movimientos & Kardex"
        subtitle="Trazabilidad detallada de cambios de inventario (Entradas, Salidas, Ajustes, Compras y Ventas)"
      />

      <Card>
        <CardTitle icon={ArrowLeftRight} subtitle="Registro cronológico de variaciones de stock en tiempo real">
          Historial Kardex ({movimientos.length})
        </CardTitle>
        <CardBody>
          <DataTable
            columns={columns}
            data={movimientos}
            keyExtractor={(m) => m.idMovimiento}
            showSearch={true}
            searchPlaceholder="Buscar por producto, SKU, tipo de movimiento o motivo..."
            emptyMessage="No se han registrado movimientos de inventario todavía."
          />
        </CardBody>
      </Card>
    </div>
  );
}
