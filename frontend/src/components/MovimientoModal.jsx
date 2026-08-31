import React, { useState, useEffect } from 'react';
import { Check, Calculator } from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { OperacionSegmentSelector } from './movimientos/OperacionSegmentSelector';
import { OperacionesDirectLinks } from './movimientos/OperacionesDirectLinks';

/**
 * Modal para Ajuste Rápido de Stock Físico.
 * Responsabilidad: Cálculo en tiempo real del nuevo stock proyectado y confirmación de movimiento.
 */
export function MovimientoModal({
  isOpen,
  onClose,
  onSave,
  producto,
  usuarios = [],
  onNavigateTab,
}) {
  const [tipoOperacion, setTipoOperacion] = useState('ENTRADA');
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (producto) {
      setTipoOperacion('ENTRADA');
      setCantidad(1);
      setMotivo('');
    }
    setError('');
  }, [producto, isOpen]);

  if (!isOpen || !producto) return null;

  const stockActual = producto.stockActual ?? 0;
  const cantNum = parseInt(cantidad, 10) || 0;

  // Calcular el nuevo stock proyectado en tiempo real
  let stockFinal = stockActual;
  if (tipoOperacion === 'ENTRADA') {
    stockFinal = stockActual + cantNum;
  } else if (tipoOperacion === 'SALIDA') {
    stockFinal = Math.max(0, stockActual - cantNum);
  } else if (tipoOperacion === 'AJUSTE') {
    stockFinal = cantNum;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cantNum <= 0 && tipoOperacion !== 'AJUSTE') {
      setError('La cantidad debe ser mayor a 0');
      return;
    }
    if (tipoOperacion === 'SALIDA' && cantNum > stockActual) {
      setError(`Stock insuficiente. El stock actual es de ${stockActual} unidades.`);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        idProducto: producto.idProducto,
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : null,
        tipo: tipoOperacion,
        cantidad: cantNum,
        motivo:
          motivo.trim() ||
          (tipoOperacion === 'ENTRADA'
            ? 'Ingreso manual de stock'
            : tipoOperacion === 'SALIDA'
            ? 'Salida/Merma de stock'
            : 'Calibración por conteo físico'),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al registrar el movimiento');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToVentas = () => {
    onClose();
    if (onNavigateTab) onNavigateTab('ventas');
  };

  const handleGoToCompras = () => {
    onClose();
    if (onNavigateTab) onNavigateTab('compras');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajuste Rápido de Stock"
      subtitle="Modificación de existencias físicas para Los Caseritos"
      icon={Calculator}
      maxWidth="540px"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="brand"
            onClick={handleSubmit}
            loading={loading}
            icon={Check}
          >
            Confirmar Ajuste
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-red-bg)',
              color: 'var(--brand-red)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* Producto Seleccionado */}
        <Card style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Artículo Seleccionado:</div>
          <strong style={{ color: 'var(--text-white)', fontSize: '0.98rem' }}>{producto.nombre}</strong>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.3rem', fontSize: '0.82rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>SKU: <code>{producto.sku}</code></span>
            <span>Stock Actual: <strong style={{ color: 'var(--brand-gold)' }}>{stockActual} unid.</strong></span>
          </div>
        </Card>

        {/* Selector de Operación (Ingreso / Salida / Ajuste) */}
        <OperacionSegmentSelector
          tipoOperacion={tipoOperacion}
          onSelectTipo={(t) => {
            setTipoOperacion(t);
            setError('');
          }}
        />

        {/* Input de Cantidad Dinámica */}
        <InputField
          label={
            tipoOperacion === 'ENTRADA'
              ? 'Cantidad a Sumar (+)'
              : tipoOperacion === 'SALIDA'
              ? 'Cantidad a Restar (-)'
              : 'Nuevo Stock Real Exacto (=)'
          }
          type="number"
          min={tipoOperacion === 'AJUSTE' ? '0' : '1'}
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        {/* Resumen del Cálculo Resultante */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Stock Final Proyectado:</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
            {stockFinal} unidades
          </span>
        </div>

        <InputField
          label="Motivo o Referencia (Opcional)"
          placeholder="Ej. Conteo físico, rotura, merma, regalo promocional..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />

        {/* Enlaces Rápidos a Ventas y Compras */}
        <OperacionesDirectLinks
          onGoToVentas={handleGoToVentas}
          onGoToCompras={handleGoToCompras}
        />
      </form>
    </Modal>
  );
}
