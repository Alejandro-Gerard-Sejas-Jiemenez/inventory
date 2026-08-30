import React, { useState } from 'react';
import { Truck, Plus, CheckCircle, Building, Trash2, ShoppingBag } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { InputField } from '../components/common/InputField';
import { SelectField } from '../components/common/SelectField';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';

export function ComprasView({
  compras = [],
  proveedores = [],
  productos = [],
  usuarios = [],
  onRegistrarCompra,
  onCreateProveedor,
}) {
  const [subTab, setSubTab] = useState('compras');
  const [showNuevaCompra, setShowNuevaCompra] = useState(false);
  const [showNuevoProveedor, setShowNuevoProveedor] = useState(false);
  const [loading, setLoading] = useState(false);

  // Formulario Compra
  const [selectedProveedor, setSelectedProveedor] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [itemsCompra, setItemsCompra] = useState([{ idProducto: '', cantidad: 5, precioCompra: 0 }]);

  // Formulario Proveedor
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const handleAddItem = () => {
    setItemsCompra([...itemsCompra, { idProducto: '', cantidad: 5, precioCompra: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItemsCompra(itemsCompra.filter((_, i) => i !== index));
  };

  const handleProductChange = (index, prodId) => {
    const prod = productos.find((p) => p.idProducto === parseInt(prodId, 10));
    const newItems = [...itemsCompra];
    newItems[index].idProducto = prodId;
    newItems[index].precioCompra = prod ? prod.precioCompra : 0;
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

  const handleSubmitCompra = async (e) => {
    e.preventDefault();
    if (!selectedProveedor) {
      alert('Por favor selecciona un proveedor');
      return;
    }
    if (itemsCompra.some((i) => !i.idProducto)) {
      alert('Selecciona un producto para cada línea de compra');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        idUsuario: usuarios.length > 0 ? usuarios[0].idUsuario : 1,
        idProveedor: parseInt(selectedProveedor, 10),
        observaciones,
        detalles: itemsCompra.map((i) => ({
          idProducto: parseInt(i.idProducto, 10),
          cantidad: i.cantidad,
          precioCompra: parseFloat(i.precioCompra),
        })),
      };

      await onRegistrarCompra(payload);
      setShowNuevaCompra(false);
      setItemsCompra([{ idProducto: '', cantidad: 5, precioCompra: 0 }]);
      setObservaciones('');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProveedor = async (e) => {
    e.preventDefault();
    if (!nuevoProveedor.nombre) return;
    try {
      setLoading(true);
      await onCreateProveedor(nuevoProveedor);
      setShowNuevoProveedor(false);
      setNuevoProveedor({ nombre: '', contacto: '', email: '', telefono: '', direccion: '' });
    } finally {
      setLoading(false);
    }
  };

  const tabsConfig = [
    { id: 'compras', label: 'Historial de Compras', count: compras.length, icon: Truck },
    { id: 'proveedores', label: 'Proveedores Registrados', count: proveedores.length, icon: Building },
  ];

  const comprasColumns = [
    { header: '# Orden', accessor: 'idCompra', width: '90px', render: (c) => <Badge variant="brand">#{c.idCompra}</Badge> },
    { header: 'Fecha & Hora', render: (c) => <span>{c.fecha} {c.hora}</span> },
    { header: 'Proveedor', render: (c) => <strong style={{ color: 'var(--text-white)' }}>{c.proveedor?.nombre}</strong> },
    { header: 'Registrado Por', render: (c) => <span style={{ color: 'var(--text-secondary)' }}>{c.usuario?.nombre || 'Admin'}</span> },
    {
      header: 'Total Compra',
      render: (c) => (
        <strong style={{ color: 'var(--brand-gold)', fontSize: '1rem' }}>
          Bs. {Number(c.total).toFixed(2)}
        </strong>
      ),
    },
    {
      header: 'Estado',
      render: (c) => <Badge variant="success">{c.estado || 'COMPLETADA'}</Badge>,
    },
  ];

  const proveedoresColumns = [
    { header: 'ID', accessor: 'idProveedor', width: '70px', render: (pr) => <span style={{ color: 'var(--text-muted)' }}>#{pr.idProveedor}</span> },
    { header: 'Empresa / Proveedor', render: (pr) => <strong style={{ color: 'var(--text-white)' }}>{pr.nombre}</strong> },
    { header: 'Contacto', render: (pr) => pr.contacto || '-' },
    { header: 'Teléfono', render: (pr) => pr.telefono || '-' },
    { header: 'Email', render: (pr) => pr.email || '-' },
    { header: 'Dirección', render: (pr) => <span style={{ color: 'var(--text-muted)' }}>{pr.direccion || '-'}</span> },
  ];

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Módulo de Compras & Proveedores</h2>
          <p>Gestión de adquisiciones, costeo y catálogo de distribuidores para Los Caseritos</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Tabs tabs={tabsConfig} activeTab={subTab} onChange={setSubTab} />
          {subTab === 'compras' ? (
            <Button
              variant={showNuevaCompra ? 'secondary' : 'brand'}
              onClick={() => setShowNuevaCompra(!showNuevaCompra)}
              icon={Plus}
            >
              {showNuevaCompra ? 'Cerrar Formulario' : 'Nueva Orden de Compra'}
            </Button>
          ) : (
            <Button
              variant={showNuevoProveedor ? 'secondary' : 'brand'}
              onClick={() => setShowNuevoProveedor(!showNuevoProveedor)}
              icon={Plus}
            >
              {showNuevoProveedor ? 'Cerrar Formulario' : 'Nuevo Proveedor'}
            </Button>
          )}
        </div>
      </div>

      {subTab === 'compras' && (
        <>
          {showNuevaCompra && (
            <Card style={{ borderColor: 'var(--brand-gold)' }}>
              <CardTitle icon={ShoppingBag} subtitle="Reabastecer stock de productos desde un proveedor mayorista">
                Registrar Orden de Compra
              </CardTitle>
              <CardBody>
                <form onSubmit={handleSubmitCompra} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <SelectField
                      label="Proveedor"
                      value={selectedProveedor}
                      onChange={(e) => setSelectedProveedor(e.target.value)}
                      placeholder="Seleccione el proveedor..."
                      options={proveedores.map((pr) => ({
                        value: pr.idProveedor,
                        label: `${pr.nombre} ${pr.contacto ? `(${pr.contacto})` : ''}`,
                      }))}
                      required
                    />

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
                            label="Producto"
                            value={item.idProducto}
                            onChange={(e) => handleProductChange(idx, e.target.value)}
                            placeholder="Seleccionar..."
                            options={productos.map((p) => ({
                              value: p.idProducto,
                              label: `${p.sku} - ${p.nombre} (Stock: ${p.stockActual})`,
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

                    <Button type="submit" variant="brand" icon={CheckCircle} loading={loading} size="lg">
                      Confirmar Compra e Incrementar Stock
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardTitle icon={Truck} subtitle="Historial cronológico de compras registradas">
              Órdenes de Compra Realizadas
            </CardTitle>
            <CardBody>
              <DataTable
                columns={comprasColumns}
                data={compras}
                keyExtractor={(c) => c.idCompra}
                emptyMessage="No se han registrado órdenes de compra todavía."
              />
            </CardBody>
          </Card>
        </>
      )}

      {subTab === 'proveedores' && (
        <>
          {showNuevoProveedor && (
            <Card style={{ borderColor: 'var(--brand-gold)' }}>
              <CardTitle icon={Building} subtitle="Registrar nueva empresa proveedora o distribuidor">
                Nuevo Proveedor
              </CardTitle>
              <CardBody>
                <form onSubmit={handleSubmitProveedor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <InputField
                      label="Empresa / Razón Social"
                      placeholder="Ej. Distribuidora Tecnológica Los Andes"
                      value={nuevoProveedor.nombre}
                      onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })}
                      required
                    />

                    <InputField
                      label="Persona de Contacto"
                      placeholder="Ej. Ing. Carlos Mendoza"
                      value={nuevoProveedor.contacto}
                      onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, contacto: e.target.value })}
                    />

                    <InputField
                      label="Teléfono / WhatsApp"
                      placeholder="Ej. +591 71234567"
                      value={nuevoProveedor.telefono}
                      onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, telefono: e.target.value })}
                    />

                    <InputField
                      label="Correo Electrónico"
                      type="email"
                      placeholder="proveedor@empresa.com"
                      value={nuevoProveedor.email}
                      onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, email: e.target.value })}
                    />
                  </div>

                  <InputField
                    label="Dirección / Ubicación"
                    placeholder="Ej. Av. Comercio #450, Centro"
                    value={nuevoProveedor.direccion}
                    onChange={(e) => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })}
                  />

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <Button variant="secondary" onClick={() => setShowNuevoProveedor(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" variant="brand" icon={Plus} loading={loading}>
                      Guardar Proveedor
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardTitle icon={Building} subtitle="Directorio de proveedores registrados">
              Listado de Proveedores ({proveedores.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={proveedoresColumns}
                data={proveedores}
                keyExtractor={(pr) => pr.idProveedor}
                emptyMessage="No hay proveedores registrados aún."
              />
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
