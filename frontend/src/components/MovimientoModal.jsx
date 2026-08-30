import React, { useState, useEffect } from 'react';
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Scale,
  Check,
  ShoppingCart,
  Truck,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { Button } from './common/Button';
import { Card } from './common/Card';

export function MovimientoModal({
  isOpen,
  onClose,
  onSave,
  producto,
  usuarios = [],
  onNavigateTab,
}) {
  const [tipoOperacion, setTipoOperacion] = useState('ENTRADA'); // 'ENTRADA' | 'SALIDA' | 'AJUSTE'
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
    if (onNavigateTab) {
      onNavigateTab('ventas');
    }
  };

  const handleGoToCompras = () => {
    onClose();
    if (onNavigateTab) {
      onNavigateTab('compras');
    }
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

        {/* Pestañas / Segmentos de Operación Intuitivos */}
        <div>
          <label className="form-field-label">Selecciona el Tipo de Operación</label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              padding: '0.35rem',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setTipoOperacion('ENTRADA');
                setError('');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold-bg)' : 'transparent',
                color: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold)' : 'var(--text-secondary)',
                fontWeight: tipoOperacion === 'ENTRADA' ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <ArrowDownCircle size={18} style={{ color: tipoOperacion === 'ENTRADA' ? 'var(--brand-gold)' : 'var(--text-muted)' }} />
              <span>➕ Ingreso</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTipoOperacion('SALIDA');
                setError('');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: tipoOperacion === 'SALIDA' ? 'var(--brand-red-bg)' : 'transparent',
                color: tipoOperacion === 'SALIDA' ? 'var(--brand-red)' : 'var(--text-secondary)',
                fontWeight: tipoOperacion === 'SALIDA' ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <ArrowUpCircle size={18} style={{ color: tipoOperacion === 'SALIDA' ? 'var(--brand-red)' : 'var(--text-muted)' }} />
              <span>➖ Salida / Merma</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setTipoOperacion('AJUSTE');
                setError('');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.65rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: tipoOperacion === 'AJUSTE' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: tipoOperacion === 'AJUSTE' ? 'var(--text-white)' : 'var(--text-secondary)',
                fontWeight: tipoOperacion === 'AJUSTE' ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <Scale size={18} style={{ color: tipoOperacion === 'AJUSTE' ? 'var(--text-white)' : 'var(--text-muted)' }} />
              <span>⚖️ Ajuste Físico</span>
            </button>
          </div>
        </div>

        {/* Inputs dinámicos según pestaña */}
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

        {/* Acceso Rápido / Redirección a Ventas y Compras */}
        <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
            ¿Necesitas registrar operaciones comerciales completas?
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleGoToVentas}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShoppingCart size={14} style={{ color: 'var(--brand-gold)' }} />
                <span>Punto de Venta</span>
              </div>
              <ArrowRight size={12} />
            </button>

            <button
              type="button"
              onClick={handleGoToCompras}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={14} style={{ color: 'var(--brand-gold)' }} />
                <span>Orden de Compra</span>
              </div>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
