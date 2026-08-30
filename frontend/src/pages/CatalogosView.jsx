import React, { useState } from 'react';
import { Trash2, Tag, Palette, Box, Layers, FolderTree, Award } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { NuevaCategoriaForm } from '../components/catalogos/NuevaCategoriaForm';
import { NuevaMarcaForm } from '../components/catalogos/NuevaMarcaForm';
import { NuevoModeloForm } from '../components/catalogos/NuevoModeloForm';
import { NuevoMaterialForm } from '../components/catalogos/NuevoMaterialForm';
import { NuevoColorForm } from '../components/catalogos/NuevoColorForm';

export function CatalogosView({
  categorias = [],
  marcas = [],
  modelos = [],
  materiales = [],
  colores = [],
  onCreateCategoria,
  onDeleteCategoria,
  onCreateMarca,
  onDeleteMarca,
  onCreateModelo,
  onDeleteModelo,
  onCreateColor,
  onDeleteColor,
  onCreateMaterial,
  onDeleteMaterial,
}) {
  const [activeSubTab, setActiveSubTab] = useState('categorias');

  const tabsConfig = [
    { id: 'categorias', label: 'Categorías', count: categorias.length, icon: FolderTree },
    { id: 'marcas', label: 'Marcas', count: marcas.length, icon: Award },
    { id: 'modelos', label: 'Modelos', count: modelos.length, icon: Box },
    { id: 'materiales', label: 'Materiales', count: materiales.length, icon: Tag },
    { id: 'colores', label: 'Colores', count: colores.length, icon: Palette },
  ];

  const categoriaColumns = [
    { header: 'ID', accessor: 'idCategoria', width: '70px', render: (cat) => <span style={{ color: 'var(--text-muted)' }}>#{cat.idCategoria}</span> },
    { header: 'Categoría', accessor: 'nombre', render: (cat) => <strong style={{ color: 'var(--text-white)' }}>{cat.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (cat) => <span style={{ color: 'var(--text-secondary)' }}>{cat.descripcion || '-'}</span> },
    {
      header: 'Acción',
      align: 'right',
      width: '80px',
      render: (cat) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteCategoria(cat.idCategoria)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Eliminar categoría"
        />
      ),
    },
  ];

  const marcaColumns = [
    { header: 'ID', accessor: 'idMarca', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMarca}</span> },
    { header: 'Marca / Fabricante', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    {
      header: 'Acción',
      align: 'right',
      width: '80px',
      render: (m) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDeleteMarca(m.idMarca)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Eliminar marca"
        />
      ),
    },
  ];

  const modeloColumns = [
    { header: 'ID', accessor: 'idModelo', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idModelo}</span> },
    { header: 'Modelo', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    {
      header: 'Marca Fabricante',
      render: (m) => <Badge variant="brand">{m.marca?.nombre || 'Genérica'}</Badge>,
    },
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
      <PageHeader
        title="Catálogos & Atributos del Sistema"
        subtitle="Gestión multirubro de Categorías, Marcas, Modelos, Materiales y Colores para Los Caseritos"
        actions={<Tabs tabs={tabsConfig} activeTab={activeSubTab} onChange={setActiveSubTab} />}
      />

      {activeSubTab === 'categorias' && (
        <div className="grid-split-form">
          <NuevaCategoriaForm onSubmit={onCreateCategoria} />
          <Card>
            <CardTitle icon={FolderTree} subtitle="Rubros y agrupaciones de productos">
              Listado de Categorías ({categorias.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={categoriaColumns}
                data={categorias}
                keyExtractor={(cat) => cat.idCategoria}
                emptyMessage="No hay categorías registradas aún."
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'marcas' && (
        <div className="grid-split-form">
          <NuevaMarcaForm onSubmit={onCreateMarca} />
          <Card>
            <CardTitle icon={Award} subtitle="Fabricantes y marcas registradas">
              Listado de Marcas ({marcas.length})
            </CardTitle>
            <CardBody>
              <DataTable
                columns={marcaColumns}
                data={marcas}
                keyExtractor={(m) => m.idMarca}
                emptyMessage="No hay marcas registradas aún."
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'modelos' && (
        <div className="grid-split-form">
          <NuevoModeloForm marcas={marcas} onSubmit={onCreateModelo} />
          <Card>
            <CardTitle icon={Layers} subtitle="Modelos activos vinculados a su marca">
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
          <NuevoMaterialForm onSubmit={onCreateMaterial} />
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
          <NuevoColorForm onSubmit={onCreateColor} />
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
