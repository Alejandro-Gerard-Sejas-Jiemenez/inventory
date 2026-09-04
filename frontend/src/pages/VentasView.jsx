import React, { useState } from 'react';
import { ShoppingCart, Plus, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { NuevaVentaPOSForm } from '../components/ventas/NuevaVentaPOSForm';

export function VentasView({
  ventas = [],
  productos = [],
  usuarios = [],
  onRegistrarVenta,
  onCambiarEstadoVenta,
}) {
  const [showNuevaVenta, setShowNuevaVenta] = useState(false);
  const [loadingEstadoId, setLoadingEstadoId] = useState(null);

  const handleVentaSubmit = async (payload) => {
    await onRegistrarVenta(payload);
    setShowNuevaVenta(false);
  };

  const handleCambiarEstado = async (idVenta, nuevoEstado) => {
    if (!window.confirm(`¿Estás seguro de cambiar el estado de la venta #${idVenta} a "${nuevoEstado}"?\n\nTEN EN CUENTA: Solo se permite modificar el estado UNA SOLA VEZ por venta. Después quedará bloqueado.`)) {
      return;
    }
    try {
      setLoadingEstadoId(idVenta);
      if (onCambiarEstadoVenta) {
        await onCambiarEstadoVenta(idVenta, nuevoEstado);
      }
    } catch (err) {
      alert(err.message || 'Error al cambiar estado de venta');
    } finally {
      setLoadingEstadoId(null);
    }
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
      render: (v) => {
        const est = v.estado || 'COMPLETADA';
        const badgeVar = est === 'COMPLETADA' ? 'success' : est === 'CANCELADA' ? 'danger' : 'warning';
        return <Badge variant={badgeVar}>{est}</Badge>;
      },
    },
    {
      header: 'Acciones de Estado',
      render: (v) => {
        if (v.estadoModificado) {
          return (
            <span
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: 'var(--bg-glass)',
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
              }}
              title="El estado de esta venta ya fue modificado 1 vez y se encuentra bloqueado"
            >
              <Lock size={12} color="var(--brand-gold)" />
              Bloqueado (1/1)
            </span>
          );
        }

        const isCurrentCancel = v.estado === 'CANCELADA';
        const targetState = isCurrentCancel ? 'COMPLETADA' : 'CANCELADA';

        return (
          <Button
            size="sm"
            variant={isCurrentCancel ? 'brand' : 'ghost'}
            loading={loadingEstadoId === v.idVenta}
            onClick={() => handleCambiarEstado(v.idVenta, targetState)}
            style={{
              fontSize: '0.74rem',
              padding: '0.25rem 0.6rem',
              color: isCurrentCancel ? '#111' : 'var(--brand-red)',
            }}
          >
            {isCurrentCancel ? 'Reactivar Venta' : 'Cancelar Venta'}
          </Button>
        );
      },
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
