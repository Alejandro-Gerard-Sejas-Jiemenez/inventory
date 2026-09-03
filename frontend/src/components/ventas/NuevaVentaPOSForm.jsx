import React, { useState, useMemo } from 'react';
import { CreditCard, Plus, CheckCircle } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { SelectField } from '../common/SelectField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';
import { METODOS_PAGO } from '../../data/paymentMethods';
import { VentaDetalleRow } from './VentaDetalleRow';

/**
 * Formulario de Punto de Venta (POS) para emisión de ventas directas.
 * Responsabilidad: Gestión del encabezado de venta, método de pago, cliente y totales.
 */
export function NuevaVentaPOSForm({
  productos = [],
  usuarios = [],
  onSubmit,
  onClose,
}) {
  const [selectedMetodo, setSelectedMetodo] = useState('EFECTIVO');
  const [observaciones, setObservaciones] = useState('');
  const [itemsVenta, setItemsVenta] = useState([{ idVariante: '', cantidad: 1, precioUnitario: 0 }]);
  const [loading, setLoading] = useState(false);

  // Aplanar productos -> variantes para el selector
  const variantesDisponibles = useMemo(() => {
    return productos.flatMap(p => 
      (p.variantes || []).map(v => ({
        idVariante: v.idVariante,
        idProducto: p.idProducto,
        nombreCompuesto: `${p.nombre} ${v.modelo?.nombre ? `- ${v.modelo.nombre}` : ''} ${v.color?.nombre ? `(${v.color.nombre})` : ''}`,
        stockActual: v.stockActual,
        precioUnitario: p.precioUnitario
      }))
    );
  }, [productos]);

  const handleAddItem = () => {
    setItemsVenta([...itemsVenta, { idVariante: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItemsVenta(itemsVenta.filter((_, i) => i !== index));
  };

  const handleVarianteChange = (index, varId) => {
    const variante = variantesDisponibles.find((v) => String(v.idVariante) === String(varId));
    const newItems = [...itemsVenta];
    newItems[index].idVariante = varId;
    newItems[index].precioUnitario = variante ? variante.precioUnitario : 0;
    setItemsVenta(newItems);
  };

  const handleCantidadChange = (index, qty) => {
    const newItems = [...itemsVenta];
    newItems[index].cantidad = parseInt(qty, 10) || 1;
    setItemsVenta(newItems);
  };

  const handlePrecioChange = (index, pr) => {
    const newItems = [...itemsVenta];
    newItems[index].precioUnitario = parseFloat(pr) || 0;
    setItemsVenta(newItems);
  };

  const totalCalculado = itemsVenta.reduce((acc, item) => {
    return acc + item.cantidad * (parseFloat(item.precioUnitario) || 0);
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemsVenta.some((i) => !i.idVariante)) {
      alert('Por favor selecciona un producto (variante) para cada línea de venta');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : 1,
        metodoPago: selectedMetodo,
        observaciones,
        detalles: itemsVenta.map((i) => ({
          idVariante: parseInt(i.idVariante, 10),
          cantidad: i.cantidad,
          precioUnitario: parseFloat(i.precioUnitario),
        })),
      };

      await onSubmit(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderColor: 'var(--brand-gold)' }}>
      <CardTitle icon={CreditCard} subtitle="Emisión de orden de venta y actualización de stock">
        Punto de Venta (POS)
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <SelectField
              label="Método de Pago"
              value={selectedMetodo}
              onChange={(e) => setSelectedMetodo(e.target.value)}
              options={METODOS_PAGO.map((m) => ({
                value: m.value,
                label: m.label,
              }))}
              required
            />
          </div>

          {/* Líneas de Venta */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <label className="form-field-label" style={{ margin: 0 }}>
                Productos a Vender ({itemsVenta.length})
              </label>
              <Button type="button" variant="secondary" size="sm" icon={Plus} onClick={handleAddItem}>
                Añadir Producto
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {itemsVenta.map((item, index) => (
                <VentaDetalleRow
                  key={index}
                  item={item}
                  index={index}
                  variantesDisponibles={variantesDisponibles}
                  onVarianteChange={handleVarianteChange}
                  onCantidadChange={handleCantidadChange}
                  onPrecioChange={handlePrecioChange}
                  onRemove={handleRemoveItem}
                  canRemove={itemsVenta.length > 1}
                />
              ))}
            </div>
          </div>

          <TextAreaField
            label="Observaciones de la Venta (Opcional)"
            placeholder="Notas de entrega, número de comprobante..."
            rows={2}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />

          {/* Footer con Total y Acciones */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total de la Venta:</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--brand-gold)' }}>
                Bs. {totalCalculado.toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" variant="brand" icon={CheckCircle} loading={loading} size="lg">
                Cobrar y Descontar Inventario
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
