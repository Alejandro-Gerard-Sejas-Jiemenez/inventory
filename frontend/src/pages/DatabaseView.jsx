import React from 'react';
import { Database, CheckCircle, Table, ExternalLink } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DataTable } from '../components/common/DataTable';

export function DatabaseView() {
  const tables = [
    { name: 'modelos', pk: 'id_modelo', fks: '-', desc: 'Líneas y modelos de productos con marca' },
    { name: 'colores', pk: 'id_color', fks: '-', desc: 'Catálogo de colores con código HEX' },
    { name: 'materiales', pk: 'id_material', fks: '-', desc: 'Materiales de fabricación (aluminio, carbono, etc.)' },
    { name: 'proveedores', pk: 'id_proveedor', fks: '-', desc: 'Empresas distribuidoras y contactos' },
    { name: 'productos', pk: 'id_producto', fks: 'id_modelo, id_material, id_color', desc: 'Catálogo con SKU, stocks y precios' },
    { name: 'imagenes_producto', pk: 'id_imagen', fks: 'id_producto', desc: 'Galería de fotos por producto' },
    { name: 'clientes', pk: 'id_cliente', fks: '-', desc: 'Directorio de compradores y empresas' },
    { name: 'usuarios', pk: 'id_usuario', fks: '-', desc: 'Cuentas del sistema con roles (ADMIN, VENDEDOR, etc.)' },
    { name: 'ventas', pk: 'id_venta', fks: 'id_usuario, id_cliente', desc: 'Cabecera de ventas y estado de transacción' },
    { name: 'detalle_ventas', pk: 'id_detalle', fks: 'id_venta, id_producto', desc: 'Líneas de productos vendidos y precios' },
    { name: 'compras', pk: 'id_compra', fks: 'id_usuario, id_proveedor', desc: 'Cabecera de compras y órdenes de entrada' },
    { name: 'detalle_compras', pk: 'id_detalle_compra', fks: 'id_compra, id_producto', desc: 'Líneas de productos comprados' },
    { name: 'movimientos_stock', pk: 'id_movimiento', fks: 'id_producto, id_usuario', desc: 'Kardex: auditoría de entradas, salidas y ajustes' },
    { name: 'descuentos_por_cantidad', pk: 'id_descuento', fks: 'id_producto', desc: 'Reglas de precios por volumen' },
    { name: 'configuracion', pk: 'id_config', fks: '-', desc: 'Parámetros clave-valor del sistema' },
    { name: 'bitacora', pk: 'id_bitacora', fks: 'id_usuario', desc: 'Registro de auditoría e IP de todas las operaciones' },
  ];

  const columns = [
    { header: '#', width: '50px', render: (_, idx) => <span style={{ color: 'var(--text-muted)' }}>{idx + 1}</span> },
    {
      header: 'Tabla',
      accessor: 'name',
      render: (t) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Table size={15} style={{ color: 'var(--brand-gold)' }} />
          <code style={{ fontWeight: 700, color: 'var(--text-white)' }}>{t.name}</code>
        </div>
      ),
    },
    {
      header: 'Clave Primaria (PK)',
      accessor: 'pk',
      render: (t) => <code style={{ color: 'var(--brand-gold)' }}>{t.pk}</code>,
    },
    {
      header: 'Claves Foráneas (FK)',
      accessor: 'fks',
      render: (t) => <code style={{ color: 'var(--text-secondary)' }}>{t.fks}</code>,
    },
    {
      header: 'Propósito en el Negocio',
      accessor: 'desc',
      render: (t) => <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)' }}>{t.desc}</span>,
    },
    {
      header: 'Estado JPA',
      render: () => <Badge variant="success" icon={CheckCircle}>Mapeada</Badge>,
    },
  ];

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Esquema de Base de Datos Relacional</h2>
          <p>16 Tablas Normalizadas en H2 Database y Mapeadas en Spring Data JPA</p>
        </div>
        <a
          href="http://localhost:8088/h2-console"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <Button variant="secondary" icon={ExternalLink}>
            Abrir Consola H2 SQL
          </Button>
        </a>
      </div>

      <Card style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-gold-bg)',
              color: 'var(--brand-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Database size={22} />
          </div>
          <div>
            <strong style={{ color: 'var(--text-white)' }}>Monolito Modular & Persistencia H2 Local</strong>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              Backend: Spring Boot 3.4.2 (Puerto 8088) · Base de datos en archivo <code>./data/inventariodb</code> · Frontend: React 19 + Vite
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle icon={Database} subtitle="Estructura de tablas distribuidas en los 5 módulos funcionales">
          Tablas del Sistema (16)
        </CardTitle>
        <CardBody>
          <DataTable
            columns={columns}
            data={tables}
            keyExtractor={(t) => t.name}
          />
        </CardBody>
      </Card>
    </div>
  );
}
