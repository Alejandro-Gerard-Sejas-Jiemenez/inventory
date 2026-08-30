import React from 'react';
import { Database, CheckCircle, Table, ExternalLink } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { AlertBanner } from '../components/common/AlertBanner';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { DataTable } from '../components/common/DataTable';
import { DATABASE_SCHEMA_TABLES } from '../data/databaseSchema';

export function DatabaseView() {
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
      <PageHeader
        title="Esquema de Base de Datos Relacional"
        subtitle="16 Tablas Normalizadas en H2 Database y Mapeadas en Spring Data JPA"
        actions={
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
        }
      />

      <AlertBanner
        variant="brand"
        icon={Database}
        title="Monolito Modular & Persistencia H2 Local"
        message="Backend: Spring Boot 3.4.2 (Puerto 8088) · Base de datos en archivo ./data/inventariodb · Frontend: React 19 + Vite"
      />

      <Card>
        <CardTitle icon={Database} subtitle="Estructura de tablas distribuidas en los 5 módulos funcionales">
          Tablas del Sistema ({DATABASE_SCHEMA_TABLES.length})
        </CardTitle>
        <CardBody>
          <DataTable
            columns={columns}
            data={DATABASE_SCHEMA_TABLES}
            keyExtractor={(t) => t.name}
          />
        </CardBody>
      </Card>
    </div>
  );
}
