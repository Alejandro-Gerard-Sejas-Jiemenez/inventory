import React from 'react';
import {
  Package,
  AlertTriangle,
  DollarSign,
  ShoppingCart,
  Truck,
  Users,
  ArrowUpDown,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DataTable } from '../components/common/DataTable';

export function DashboardView({ stats, productos = [], onSelectTab }) {
  const navigate = useNavigate();

  const handleNavigate = (target) => {
    if (typeof onSelectTab === 'function') {
      onSelectTab(target);
    }
    navigate(`/admin/${target}`);
  };
  const lowStockProducts = productos.filter((p) => p.stockActual <= p.stockMinimo);

  const alertColumns = [
    {
      header: 'SKU',
      accessor: 'sku',
      width: '120px',
      render: (p) => <Badge variant="brand">{p.sku}</Badge>,
    },
    {
      header: 'Producto',
      accessor: 'nombre',
      render: (p) => <strong style={{ color: 'var(--text-white)' }}>{p.nombre}</strong>,
    },
    {
      header: 'Modelo',
      render: (p) => p.modelo?.nombre || '-',
    },
    {
      header: 'Stock Actual',
      render: (p) => (
        <strong style={{ color: 'var(--brand-red)' }}>{p.stockActual} unid.</strong>
      ),
    },
    {
      header: 'Stock Mínimo',
      render: (p) => `${p.stockMinimo} unid.`,
    },
    {
      header: 'Estado',
      render: () => <Badge variant="danger">Reponer Stock</Badge>,
    },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Panel de Control General"
        subtitle="Resumen integral y métricas en tiempo real de Los Caseritos"
        actions={
          <Button variant="brand" onClick={() => handleNavigate('productos')} icon={Package}>
            Gestionar Productos
          </Button>
        }
      />

      {/* Métricas Principales */}
      <div className="stats-grid">
        <StatCard
          title="Total Productos"
          value={stats?.totalProductos ?? 0}
          subtitle="Ítems activos en catálogo"
          icon={Package}
          color="brand"
          onClick={() => handleNavigate('productos')}
        />
        <StatCard
          title="Alertas de Stock Crítico"
          value={stats?.productosBajoStock ?? 0}
          subtitle={
            (stats?.productosBajoStock ?? 0) > 0
              ? 'Requieren reabastecimiento'
              : 'Niveles óptimos'
          }
          icon={AlertTriangle}
          color={(stats?.productosBajoStock ?? 0) > 0 ? 'danger' : 'neutral'}
          onClick={() => handleNavigate('productos')}
        />
        <StatCard
          title="Ventas Totales"
          value={`Bs. ${Number(stats?.totalVentasMonto ?? 0).toLocaleString('es-BO', {
            minimumFractionDigits: 2,
          })}`}
          subtitle="Ingresos brutos acumulados"
          icon={DollarSign}
          color="brand"
          onClick={() => handleNavigate('ventas')}
        />
        <StatCard
          title="Órdenes de Venta"
          value={stats?.totalVentas ?? 0}
          subtitle="Transacciones completadas"
          icon={ShoppingCart}
          color="brand"
          onClick={() => handleNavigate('ventas')}
        />
      </div>

      {/* Indicadores Secundarios */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <Card
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigate('catalogos')}
        >
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
              <Layers size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Modelos Registrados
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-white)',
                }}
              >
                {stats?.totalModelos ?? 0}
              </div>
            </div>
          </div>
        </Card>

        <Card
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigate('compras')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Proveedores Aliados
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-white)',
                }}
              >
                {stats?.totalProveedores ?? 0}
              </div>
            </div>
          </div>
        </Card>


        <Card
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigate('movimientos')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-red-bg)',
                color: 'var(--brand-red)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowUpDown size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Movimientos Kardex
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: 'var(--text-white)',
                }}
              >
                {stats?.totalMovimientos ?? 0}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla de Alertas de Stock Bajo */}
      <Card>
        <CardHeader
          action={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleNavigate('productos')}
              icon={ArrowRight}
            >
              Ver Todo el Catálogo
            </Button>
          }
        >
          <CardTitle
            icon={AlertTriangle}
            subtitle="Productos que se encuentran en o por debajo de su umbral mínimo de seguridad"
          >
            Alertas de Reabastecimiento
          </CardTitle>
        </CardHeader>

        <CardBody>
          <DataTable
            columns={alertColumns}
            data={lowStockProducts}
            keyExtractor={(p) => p.idProducto}
            emptyMessage="Todos los productos cuentan con niveles de stock adecuados."
          />
        </CardBody>
      </Card>
    </div>
  );
}
