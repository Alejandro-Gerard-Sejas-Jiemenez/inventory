import React, { useState } from 'react';
import { ShoppingCart, Plus, CheckCircle, UserPlus, Users, Trash2, CreditCard } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { InputField } from '../components/common/InputField';
import { SelectField } from '../components/common/SelectField';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { METODOS_PAGO } from '../data/paymentMethods';

export function VentasView({
  ventas = [],
  clientes = [],
  productos = [],
  usuarios = [],
  onRegistrarVenta,
  onCreateCliente,
}) {
  const [subTab, setSubTab] = useState('ventas');
  const [showNuevaVenta, setShowNuevaVenta] = useState(false);
  const [showNuevoCliente, setShowNuevoCliente] = useState(false);
  const [loading, setLoading] = useState(false);

  // Formulario Venta
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedMetodo, setSelectedMetodo] = useState('EFECTIVO');
  const [observaciones, setObservaciones] = useState('');
  const [itemsVenta, setItemsVenta] = useState([{ idProducto: '', cantidad: 1, precioUnitario: 0 }]);

  // Formulario Cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

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

  const handleSubmitVenta = async (e) => {
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

      await onRegistrarVenta(payload);
      setShowNuevaVenta(false);
      setItemsVenta([{ idProducto: '', cantidad: 1, precioUnitario: 0 }]);
      setObservaciones('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCliente = async (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    try {
      setLoading(true);
      await onCreateCliente(nuevoCliente);
      setShowNuevoCliente(false);
      setNuevoCliente({ nombre: '', email: '', telefono: '', direccion: '' });
    } finally {
      setLoading(false);
    }
  };

  const tabsConfig = [
    { id: 'ventas', label: 'Historial de Ventas', count: ventas.length, icon: ShoppingCart },
    { id: 'clientes', label: 'Clientes Registrados', count: clientes.length, icon: Users },
  ];

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
      render: (v) => <Badge variant="success">{v.estado || 'COMPLETADA'}</Badge>,
    },
  ];

  const clientesColumns = [
    { header: 'ID', accessor: 'idCliente', width: '70px', render: (cl) => <span style={{ color: 'var(--text-muted)' }}>#{cl.idCliente}</span> },
    { header: 'Nombre / Razón Social', render: (cl) => <strong style={{ color: 'var(--text-white)' }}>{cl.nombre}</strong> },
    { header: 'Teléfono', render: (cl) => cl.telefono || '-' },
    { header: 'Correo Electrónico', render: (cl) => cl.email || '-' },
    { header: 'Dirección', render: (cl) => <span style={{ color: 'var(--text-muted)' }}>{cl.direccion || '-'}</span> },
  ];

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Módulo de Ventas & Facturación</h2>
          <p>Punto de venta con descuento automático de existencias en tiempo real</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Tabs tabs={tabsConfig} activeTab={subTab} onChange={setSubTab} />
          {subTab === 'ventas' ? (
            <Button
              variant={showNuevaVenta ? 'secondary' : 'brand'}
              onClick={() => setShowNuevaVenta(!showNuevaVenta)}
              icon={Plus}
            >
              {showNuevaVenta ? 'Cerrar Punto de Venta' : 'Nueva Venta (POS)'}
            </Button>
          ) : (
            <Button
              variant={showNuevoCliente ? 'secondary' : 'brand'}
              onClick={() => setShowNuevoCliente(!showNuevoCliente)}
              icon={UserPlus}
            >
              {showNuevoCliente ? 'Cerrar Formulario' : 'Nuevo Cliente'}
            </Button>
          )}
        </div>
      </div>

      {subTab === 'ventas' && (
        <>
          {showNuevaVenta && (
            <Card style={{ borderColor: 'var(--brand-gold)' }}>
              <CardTitle icon={CreditCard} subtitle="Emisión de orden de venta y actualización de stock">
                Punto de Venta (POS)
              </CardTitle>
              <CardBody>
                <form onSubmit={handleSubmitVenta} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

                    <Button type="submit" variant="brand" icon={CheckCircle} loading={loading} size="lg">
                      Cobrar y Descontar Inventario
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
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
                emptyMessage="No se han registrado ventas todavía."
              />
            </CardBody>
          </Card>
        </>
      )}

      {subTab === 'clientes' && (
        <>
          {showNuevoCliente && (
            <Card style={{ borderColor: 'var(--brand-gold)' }}>
              <CardTitle icon={UserPlus} subtitle="Registrar nuevo cliente para facturación y fidelización">
                Nuevo Cliente
              </CardTitle>
              <CardBody>
                <form onSubmit={handleSubmitCliente} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <InputField
                      label="Nombre Completo / Razón Social"
                      placeholder="Ej. Juan Pérez / Empresa SRL"
                      value={nuevoCliente.nombre}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                      required
                    />

                    <InputField
                      label="Teléfono / WhatsApp"
                      placeholder="Ej. +591 76543210"
                      value={nuevoCliente.telefono}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
                    />

                    <InputField
                      label="Correo Electrónico"
                      type="email"
                      placeholder="cliente@correo.com"
                      value={nuevoCliente.email}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
                    />

                    <InputField
                      label="Dirección"
                      placeholder="Ej. Calle Murillo #123, La Paz"
                      value={nuevoCliente.direccion}
                      onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <Button variant="secondary" onClick={() => setShowNuevoCliente(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="brand" icon={Plus} loading={loading}>
                      Guardar Cliente
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardTitle icon={Users} subtitle="Directorio de clientes registrados">
              Listado de Clientes ({clientes.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={clientesColumns}
                data={clientes}
                keyExtractor={(cl) => cl.idCliente}
                emptyMessage="No hay clientes registrados aún."
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
