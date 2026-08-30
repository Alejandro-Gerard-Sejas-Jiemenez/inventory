import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, RefreshCw } from 'lucide-react';

export function StockModal({ isOpen, onClose, onSave, producto }) {
  const [tipoMovimiento, setTipoMovimiento] = useState('ENTRADA');
  const [cantidad, setCantidad] = useState(1);
  const [motivo, setMotivo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTipoMovimiento('ENTRADA');
      setCantidad(1);
      setMotivo('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !producto) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cantidad <= 0) {
      setError('La cantidad debe ser mayor a 0');
      return;
    }
    if (tipoMovimiento === 'SALIDA' && cantidad > producto.stock) {
      setError(`Stock insuficiente. El stock actual es ${producto.stock}`);
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        productoId: producto.id,
        tipoMovimiento,
        cantidad: parseInt(cantidad, 10),
        motivo,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al procesar el movimiento');
    } finally {
      setLoading(false);
    }
  };

  const getExpectedStock = () => {
    const qty = parseInt(cantidad, 10) || 0;
    if (tipoMovimiento === 'ENTRADA') return producto.stock + qty;
    if (tipoMovimiento === 'SALIDA') return Math.max(0, producto.stock - qty);
    if (tipoMovimiento === 'AJUSTE') return qty;
    return producto.stock;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h3>Registrar Movimiento de Stock</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {producto.nombre} (SKU: {producto.codigo})
            </span>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244,63,94,0.15)', color: '#fb7185', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                type="button"
                className={`btn ${tipoMovimiento === 'ENTRADA' ? 'btn-success' : 'btn-secondary'}`}
                onClick={() => setTipoMovimiento('ENTRADA')}
              >
                <ArrowDownRight size={16} /> Entrada
              </button>
              <button
                type="button"
                className={`btn ${tipoMovimiento === 'SALIDA' ? 'btn-danger' : 'btn-secondary'}`}
                onClick={() => setTipoMovimiento('SALIDA')}
              >
                <ArrowUpRight size={16} /> Salida
              </button>
              <button
                type="button"
                className={`btn ${tipoMovimiento === 'AJUSTE' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTipoMovimiento('AJUSTE')}
              >
                <RefreshCw size={16} /> Ajuste
              </button>
            </div>

            <div style={{ padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Stock Actual</span>
                <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{producto.stock} uds</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Stock Resultante</span>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {getExpectedStock()} uds
                </p>
              </div>
            </div>

            <div className="form-group">
              <label>
                {tipoMovimiento === 'AJUSTE' ? 'Nuevo Stock Total *' : 'Cantidad a transferir *'}
              </label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Motivo o Referencia (Opcional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Factura #4021, reposición de proveedor, venta directa..."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Procesando...' : 'Confirmar Movimiento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
