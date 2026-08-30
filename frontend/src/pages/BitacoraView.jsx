import React from 'react';
import { Clock, User, HardDrive, FileText } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';

export function BitacoraView({ bitacora = [] }) {
  const columns = [
    {
      header: '# Evento',
      accessor: 'idBitacora',
      width: '80px',
      render: (b) => <span style={{ color: 'var(--text-muted)' }}>#{b.idBitacora}</span>,
    },
    {
      header: 'Fecha & Hora',
      render: (b) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <Clock size={13} style={{ color: 'var(--text-muted)' }} />
          {new Date(b.fechaHora).toLocaleString()}
        </div>
      ),
    },
    {
      header: 'Usuario',
      render: (b) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <User size={14} style={{ color: 'var(--brand-gold)' }} />
          <span style={{ color: 'var(--text-white)' }}>{b.usuario?.nombre || 'Sistema'}</span>
        </div>
      ),
    },
    {
      header: 'Acción',
      render: (b) => <Badge variant="brand">{b.accion}</Badge>,
    },
    {
      header: 'Tabla Afectada',
      render: (b) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <HardDrive size={14} style={{ color: 'var(--text-muted)' }} />
          <code>{b.tablaAfectada || '-'}</code>
        </div>
      ),
    },
    {
      header: 'ID Registro',
      render: (b) => (b.idRegistroAfectado ? <code>#{b.idRegistroAfectado}</code> : '-'),
    },
    {
      header: 'Detalle de la Operación',
      render: (b) => (
        <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>
          {b.detalle}
        </span>
      ),
    },
    {
      header: 'IP Origen',
      render: (b) => <code style={{ fontSize: '0.78rem' }}>{b.ip || '127.0.0.1'}</code>,
    },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Bitácora & Trazabilidad del Sistema"
        subtitle="Auditoría completa de todas las operaciones realizadas sobre las 16 tablas"
      />

      <Card>
        <CardTitle icon={FileText} subtitle="Registro inmutable de acciones para seguridad y auditoría">
          Registro de Auditoría ({bitacora.length})
        </CardTitle>
        <CardBody>
          <DataTable
            columns={columns}
            data={bitacora}
            keyExtractor={(b) => b.idBitacora}
            emptyMessage="No hay registros de bitácora todavía."
          />
        </CardBody>
      </Card>
    </div>
  );
}
