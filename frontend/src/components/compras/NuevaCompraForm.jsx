import React, { useState, useMemo } from 'react';
import { ShoppingBag, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../common/Card';
import { InputField } from '../common/InputField';
import { SelectField } from '../common/SelectField';
import { Button } from '../common/Button';
import { QuickCreateModal } from '../common/QuickCreateModal';

export function NuevaCompraForm({
  proveedores = [],
  productos = [],
  usuarios = [],
  onSubmit,
  onClose,
  onCreateProveedor,
}) {
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [itemsCompra, setItemsCompra] = useState([{ idVariante: '', cantidad: 5, precioCompra: 0 }]);
  const [loading, setLoading] = useState(false);
  const [showQuickProveedor, setShowQuickProveedor] = useState(false);

  // Aplanar productos -> variantes para el selector
  const variantesDisponibles = useMemo(() => {
    return productos.flatMap(p => 
      (p.variantes || []).map(v => ({
        idVariante: v.idVariante,
        idProducto: p.idProducto,
        nombreCompuesto: `${p.nombre} ${v.modelo?.nombre ? `- ${v.modelo.nombre}` : ''} ${v.color?.nombre ? `(${v.color.nombre})` : ''}`,
        sku: v.sku,
        stockActual: v.stockActual,
        precioCompra: p.precioCompra
      }))
    );
  }, [productos]);

  const handleAddItem = () => {
    setItemsCompra([...itemsCompra, { idVariante: '', cantidad: 5, precioCompra: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItemsCompra(itemsCompra.filter((_, i) => i !== index));
  };

  const handleVarianteChange = (index, varId) => {
    const variante = variantesDisponibles.find((v) => String(v.idVariante) === String(varId));
    const newItems = [...itemsCompra];
    newItems[index].idVariante = varId;
    newItems[index].precioCompra = variante ? variante.precioCompra : 0;
    setItemsCompra(newItems);
  };

  const handleCantidadChange = (index, qty) => {
    const newItems = [...itemsCompra];
    newItems[index].cantidad = parseInt(qty, 10) || 1;
    setItemsCompra(newItems);
  };

  const handlePrecioChange = (index, pr) => {
    const newItems = [...itemsCompra];
    newItems[index].precioCompra = parseFloat(pr) || 0;
    setItemsCompra(newItems);
  };

  const totalCalculado = itemsCompra.reduce((acc, item) => {
    return acc + item.cantidad * (parseFloat(item.precioCompra) || 0);
  }, 0);

  const handleQuickProveedorComplete = (created) => {
    setShowQuickProveedor(false);
    if (created && created.idProveedor) {
      setSelectedProveedor(created.idProveedor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProveedor) {
      alert('Por favor selecciona un proveedor');
      return;
    }
    if (itemsCompra.some((i) => !i.idVariante)) {
      alert('Selecciona un producto (variante) para cada línea de compra');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : 1,
        idProveedor: parseInt(selectedProveedor, 10),
        observaciones,
        detalles: itemsCompra.map((i) => ({
          idVariante: parseInt(i.idVariante, 10),
          cantidad: i.cantidad,
          precioCompra: parseFloat(i.precioCompra),
        })),
      };

      await onSubmit(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ borderColor: 'var(--brand-gold)' }}>
      <CardTitle icon={ShoppingBag} subtitle="Reabastecer stock de productos desde un proveedor mayorista">
        Registrar Orden de Compra
      </CardTitle>
      <CardBody>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-field-label" style={{ margin: 0 }}>Proveedor *</label>
                {onCreateProveedor && (
                  <button
                    type="button"
                    onClick={() => setShowQuickProveedor(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--brand-gold)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                    }}
                  >
                    <Plus size={12} />
                    <span>+ Crear Proveedor</span>
                  </button>
                )}
              </div>
              <SelectField
                value={selectedProveedor}
                onChange={(e) => setSelectedProveedor(e.target.value)}
                placeholder="Seleccione el proveedor..."
                options={proveedores.map((pr) => ({
                  value: pr.idProveedor,
                  label: `${pr.nombre} ${pr.contacto ? `(${pr.contacto})` : ''}`,
                }))}
                required
              />
            </div>

            <InputField
              label="N° Factura / Referencia Proveedor"
              placeholder="Ej. FAC-00921 / Nota de entrega"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>

          <div>
            <label className="form-field-label" style={{ marginBottom: '0.75rem' }}>
              Ítems a Reabastecer *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {itemsCompra.map((item, idx) => (
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
                    label="Producto (Variante)"
                    value={item.idVariante}
                    onChange={(e) => handleVarianteChange(idx, e.target.value)}
                    placeholder="Seleccionar..."
                    options={variantesDisponibles.map((v) => ({
                      value: v.idVariante,
                      label: `${v.sku} - ${v.nombreCompuesto} (Stock: ${v.stockActual})`,
                    }))}
                    required
                  />

                  <InputField
                    label="Cantidad"
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) => handleCantidadChange(idx, e.target.value)}
                    required
                  />

                  <InputField
                    label="Costo Unit. (Bs.)"
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.precioCompra}
                    onChange={(e) => handlePrecioChange(idx, e.target.value)}
                    required
                  />

                  <div style={{ paddingBottom: '0.65rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Subtotal</div>
                    <strong style={{ color: 'var(--brand-gold)', fontSize: '0.95rem' }}>
                      Bs. {((item.cantidad * (item.precioCompra || 0)) || 0).toFixed(2)}
                    </strong>
                  </div>

                  {itemsCompra.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(idx)}
                      style={{ color: 'var(--brand-red)', marginBottom: '0.4rem' }}
                      icon={Trash2}
                    />
                  )}
                </div>
              ))}

              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddItem}
                style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
                icon={Plus}
              >
                Añadir otra línea de producto
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
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Total Inversión de Compra:</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-gold)' }}>
                Bs. {totalCalculado.toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" variant="brand" icon={CheckCircle} loading={loading} size="lg">
                Confirmar Compra e Incrementar Stock
              </Button>
            </div>
          </div>
        </form>

        {onCreateProveedor && (
          <QuickCreateModal
            isOpen={showQuickProveedor}
            onClose={handleQuickProveedorComplete}
            type="proveedor"
            onCreate={onCreateProveedor}
          />
        )}
      </CardBody>
    </Card>
  );
}
