import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { Button } from '../common/Button';
import { METODOS_PAGO } from '../../data/paymentMethods';

export function NuevaVentaPOSForm({
  clientes = [],
  productos = [],
  usuarios = [],
  onSubmit,
  onClose,
}) {
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedMetodo, setSelectedMetodo] = useState('EFECTIVO');
  const [observaciones, setObservaciones] = useState('');
  const [itemsVenta, setItemsVenta] = useState([{ idProducto: '', cantidad: 1, precioUnitario: 0 }]);
  const [loading, setLoading] = useState(false);

  const handleAddItem = () => {
    setItemsVenta([...itemsVenta, { idProducto: '', cantidad: 1, precioUnitario: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItemsVenta(itemsVenta.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, prodId) => {
    const prod = productos.find((p) => p.idProducto === parseInt(prodId, 10));
    const newItems = [...itemsVenta];
    newItems[index].idProducto = prodId;
    newItems[index].precioUnitario = prod ? prod.precioUnitario : 0;
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
    if (itemsVenta.some((i) => !i.idProducto)) {
      alert('Por favor selecciona un producto para cada línea de venta');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : 1,
        idCliente: selectedCliente ? parseInt(selectedCliente, 10) : null,
        metodoPago: selectedMetodo,
        observaciones,
        detalles: itemsVenta.map((i) => ({
          idProducto: parseInt(i.idProducto, 10),
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
              label="Cliente"
              value={selectedCliente}
              onChange={(e) => setSelectedCliente(e.target.value)}
              placeholder="Venta Rápida (Sin registrar cliente)"
              options={clientes.map((c) => ({
                value: c.idCliente,
                label: `${c.nombre} ${c.telefono ? `(${c.telefono})` : ''}`,
              }))}
            />

            <SelectField
              label="Método de Pago"
              value={selectedMetodo}
              onChange={(e) => setSelectedMetodo(e.target.value)}
              options={METODOS_PAGO}
              required
            />

            <InputField
              label="Observaciones / Nota"
              placeholder="Ej. Descuento aplicado / Envío a domicilio"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>

          <div>
            <label className="form-field-label" style={{ marginBottom: '0.75rem' }}>
              Productos a Vender *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {itemsVenta.map((item, idx) => {
                const prod = productos.find((p) => p.idProducto === parseInt(item.idProducto, 10));
                const maxStock = prod ? prod.stockActual : 999;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(200px, 2fr) minmax(100px, 1fr) minmax(120px, 1fr) minmax(110px, 1fr) auto',
                      gap: '0.75rem',
                      alignItems: 'end',
                      padding: '0.75rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <SelectField
                      label="Producto"
                      value={item.idProducto}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                      placeholder="Seleccionar..."
                      options={productos.map((p) => ({
                        value: p.idProducto,
                        label: `${p.sku} - ${p.nombre} (Disp: ${p.stockActual})`,
                      }))}
                      required
                    />

                    <InputField
                      label="Cantidad"
                      type="number"
                      min="1"
                      max={maxStock}
                      value={item.cantidad}
                      onChange={(e) => handleCantidadChange(idx, e.target.value)}
                      required
                    />

                    <InputField
                      label="Precio Venta (Bs.)"
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.precioUnitario}
                      onChange={(e) => handlePrecioChange(idx, e.target.value)}
                      required
                    />

                    <div style={{ paddingBottom: '0.65rem' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</div>
                      <strong style={{ color: 'var(--brand-gold)', fontSize: '0.95rem' }}>
                        Bs. {((item.cantidad * (item.precioUnitario || 0)) || 0).toFixed(2)}
                      </strong>
                    </div>

                    {itemsVenta.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(idx)}
                        style={{ color: 'var(--brand-red)', marginBottom: '0.4rem' }}
                        icon={Trash2}
                      />
                    )}
                  </div>
                );
              })}

              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddItem}
                style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
                icon={Plus}
              >
                Añadir otro producto al carrito
              </Button>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Total a Cobrar:</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
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
