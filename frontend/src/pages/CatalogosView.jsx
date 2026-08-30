import React, { useState } from 'react';
import { Plus, Trash2, Tag, Palette, Box, Layers } from 'lucide-react';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { InputField } from '../components/common/InputField';
import { TextAreaField } from '../components/common/TextAreaField';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';

export function CatalogosView({
  modelos,
  materiales,
  colores,
  onCreateModelo,
  onDeleteModelo,
  onCreateColor,
  onDeleteColor,
  onCreateMaterial,
  onDeleteMaterial,
}) {
  const [activeSubTab, setActiveSubTab] = useState('modelos');
  const [loading, setLoading] = useState(false);

  // Forms State
  const [nuevoModelo, setNuevoModelo] = useState({ nombre: '', marca: '', descripcion: '' });
  const [nuevoColor, setNuevoColor] = useState({ nombre: '', codigoHex: '#F59E0B' });
  const [nuevoMaterial, setNuevoMaterial] = useState({ nombre: '', descripcion: '' });

  const handleModeloSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoModelo.nombre) return;
    try {
      setLoading(true);
      await onCreateModelo(nuevoModelo);
      setNuevoModelo({ nombre: '', marca: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  const handleColorSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoColor.nombre) return;
    try {
      setLoading(true);
      await onCreateColor(nuevoColor);
      setNuevoColor({ nombre: '', codigoHex: '#F59E0B' });
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoMaterial.nombre) return;
    try {
      setLoading(true);
      await onCreateMaterial(nuevoMaterial);
      setNuevoMaterial({ nombre: '', descripcion: '' });
    } finally {
      setLoading(false);
    }
  };

  const tabsConfig = [
    { id: 'modelos', label: 'Modelos', count: modelos.length, icon: Box },
    { id: 'materiales', label: 'Materiales', count: materiales.length, icon: Tag },
    { id: 'colores', label: 'Colores', count: colores.length, icon: Palette },
  ];

  // Table Columns Configurations
  const modeloColumns = [
    { header: 'ID', accessor: 'idModelo', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idModelo}</span> },
    { header: 'Modelo', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Marca', accessor: 'marca', render: (m) => <Badge variant="brand">{m.marca || 'Genérica'}</Badge> },
    { header: 'Descripción', accessor: 'descripcion', render: (m) => <span style={{ color: 'var(--text-secondary)' }}>{m.descripcion || '-'}</span> },
    {
      header: 'Acción',
      align: 'right',
      width: '80px',
      render: (m) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteModelo(m.idModelo)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Eliminar modelo"
        />
      ),
    },
  ];

  const materialColumns = [
    { header: 'ID', accessor: 'idMaterial', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMaterial}</span> },
    { header: 'Material', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (m) => <span style={{ color: 'var(--text-secondary)' }}>{m.descripcion || '-'}</span> },
    {
      header: 'Acción',
      align: 'right',
      width: '80px',
      render: (m) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteMaterial(m.idMaterial)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Eliminar material"
        />
      ),
    },
  ];

  const colorColumns = [
    { header: 'ID', accessor: 'idColor', width: '70px', render: (c) => <span style={{ color: 'var(--text-muted)' }}>#{c.idColor}</span> },
    {
      header: 'Muestra',
      width: '80px',
      render: (c) => (
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: c.codigoHex || '#888',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        />
      ),
    },
    { header: 'Color', accessor: 'nombre', render: (c) => <strong style={{ color: 'var(--text-white)' }}>{c.nombre}</strong> },
    { header: 'HEX', accessor: 'codigoHex', render: (c) => <code>{c.codigoHex || '-'}</code> },
    {
      header: 'Acción',
      align: 'right',
      width: '80px',
      render: (c) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteColor(c.idColor)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Eliminar color"
        />
      ),
    },
  ];

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Catálogos & Atributos del Sistema</h2>
          <p>Gestión modular de Modelos, Materiales y Colores para el inventario de Los Caseritos</p>
        </div>
        <Tabs tabs={tabsConfig} activeTab={activeSubTab} onChange={setActiveSubTab} />
      </div>

      {activeSubTab === 'modelos' && (
        <div className="grid-split-form">
          <Card>
            <CardTitle icon={Box} subtitle="Registrar nueva variante de modelo">
              Nuevo Modelo
            </CardTitle>
            <CardBody>
              <form onSubmit={handleModeloSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InputField
                  label="Nombre del Modelo"
                  placeholder="Ej. Galaxy Book 4 Pro / iPhone 15"
                  value={nuevoModelo.nombre}
                  onChange={(e) => setNuevoModelo({ ...nuevoModelo, nombre: e.target.value })}
                  required
                />
                <InputField
                  label="Marca / Fabricante"
                  placeholder="Ej. Apple, Samsung, Dell"
                  value={nuevoModelo.marca}
                  onChange={(e) => setNuevoModelo({ ...nuevoModelo, marca: e.target.value })}
                />
                <TextAreaField
                  label="Descripción"
                  placeholder="Detalles del modelo, procesador o serie..."
                  rows={3}
                  value={nuevoModelo.descripcion}
                  onChange={(e) => setNuevoModelo({ ...nuevoModelo, descripcion: e.target.value })}
                />
                <Button type="submit" variant="brand" icon={Plus} loading={loading}>
                  Guardar Modelo
                </Button>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardTitle icon={Layers} subtitle="Modelos activos en el catálogo">
              Listado de Modelos ({modelos.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={modeloColumns}
                data={modelos}
                keyExtractor={(m) => m.idModelo}
                emptyMessage="No hay modelos registrados aún."
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'materiales' && (
        <div className="grid-split-form">
          <Card>
            <CardTitle icon={Tag} subtitle="Registrar nuevo tipo de material">
              Nuevo Material
            </CardTitle>
            <CardBody>
              <form onSubmit={handleMaterialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InputField
                  label="Nombre del Material"
                  placeholder="Ej. Titanio Grado 5 / Silicona Premium"
                  value={nuevoMaterial.nombre}
                  onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, nombre: e.target.value })}
                  required
                />
                <TextAreaField
                  label="Descripción"
                  placeholder="Propiedades, textura o uso..."
                  rows={3}
                  value={nuevoMaterial.descripcion}
                  onChange={(e) => setNuevoMaterial({ ...nuevoMaterial, descripcion: e.target.value })}
                />
                <Button type="submit" variant="brand" icon={Plus} loading={loading}>
                  Guardar Material
                </Button>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardTitle icon={Layers} subtitle="Materiales activos en el catálogo">
              Listado de Materiales ({materiales.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={materialColumns}
                data={materiales}
                keyExtractor={(m) => m.idMaterial}
                emptyMessage="No hay materiales registrados aún."
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'colores' && (
        <div className="grid-split-form">
          <Card>
            <CardTitle icon={Palette} subtitle="Registrar nuevo tono de color">
              Nuevo Color
            </CardTitle>
            <CardBody>
              <form onSubmit={handleColorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <InputField
                  label="Nombre del Color"
                  placeholder="Ej. Amarillo Caserito / Negro Carbón"
                  value={nuevoColor.nombre}
                  onChange={(e) => setNuevoColor({ ...nuevoColor, nombre: e.target.value })}
                  required
                />
                <div className="form-field-group">
                  <label className="form-field-label">Código HEX & Muestra</label>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      style={{
                        width: '45px',
                        height: '42px',
                        padding: '2px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                      }}
                      value={nuevoColor.codigoHex}
                      onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
                    />
                    <input
                      type="text"
                      className="form-field-input"
                      value={nuevoColor.codigoHex}
                      onChange={(e) => setNuevoColor({ ...nuevoColor, codigoHex: e.target.value })}
                      placeholder="#F59E0B"
                    />
                  </div>
                </div>
                <Button type="submit" variant="brand" icon={Plus} loading={loading}>
                  Guardar Color
                </Button>
              </form>
            </CardBody>
          </Card>

          <Card>
            <CardTitle icon={Layers} subtitle="Colores disponibles para productos">
              Listado de Colores ({colores.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={colorColumns}
                data={colores}
                keyExtractor={(c) => c.idColor}
                emptyMessage="No hay colores registrados aún."
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
