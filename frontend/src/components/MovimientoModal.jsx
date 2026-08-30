import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';
import { Modal } from './common/Modal';
import { InputField } from './common/InputField';
import { SelectField } from './common/SelectField';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { TIPOS_MOVIMIENTO } from '../data/movementTypes';

export function MovimientoModal({ isOpen, onClose, onSave, producto, usuarios = [] }) {
  const [formData, setFormData] = useState({
    idProducto: '',
    idUsuario: '',
    tipo: 'ENTRADA',
    cantidad: 1,
    motivo: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (producto) {
      setFormData({
        idProducto: producto.idProducto,
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : '',
        tipo: 'ENTRADA',
        cantidad: 1,
        motivo: '',
      });
    }
    setError('');
  }, [producto, usuarios, isOpen]);

  if (!isOpen || !producto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.cantidad <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        idProducto: producto.idProducto,
        idUsuario: formData.idUsuario ? parseInt(formData.idUsuario, 10) : null,
        tipo: formData.tipo,
        cantidad: parseInt(formData.cantidad, 10),
        motivo: formData.motivo || `Ajuste manual de ${formData.tipo}`,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al registrar el movimiento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajuste Rápido de Stock"
      subtitle="Kardex de entradas, salidas y calibración física"
      icon={ArrowUpDown}
      maxWidth="500px"
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
            Aplicar Movimiento
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

        <Card style={{ padding: '0.9rem', backgroundColor: 'var(--bg-secondary)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Producto Seleccionado:</div>
          <strong style={{ color: 'var(--text-white)', fontSize: '1rem' }}>{producto.nombre}</strong>
          <div style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', marginTop: '0.2rem' }}>
            SKU: {producto.sku} · Stock Actual: <strong>{producto.stockActual} unid.</strong>
          </div>
        </Card>

        <SelectField
          label="Tipo de Operación"
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          options={TIPOS_MOVIMIENTO}
          required
        />

        <InputField
          label={formData.tipo === 'AJUSTE' ? 'Nuevo Stock Total' : 'Cantidad a Modificar'}
          type="number"
          min="1"
          value={formData.cantidad}
          onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
          required
        />

        <InputField
          label="Motivo o Referencia"
          placeholder="Ej. Conteo físico, rotura, merma, calibración..."
          value={formData.motivo}
          onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
        />
      </form>
    </Modal>
  );
}
