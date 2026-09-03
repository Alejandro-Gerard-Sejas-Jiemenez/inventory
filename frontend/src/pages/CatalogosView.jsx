import React, { useState } from 'react';
import { Trash2, Tag, Palette, Box, Layers, FolderTree, Award, Users, RefreshCw } from 'lucide-react';
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
import { NuevoPropietarioForm } from '../components/catalogos/NuevoPropietarioForm';

export function CatalogosView({
  categorias = [],
  marcas = [],
  modelos = [],
  materiales = [],
  colores = [],
  propietarios = [],
  onCreateCategoria,
  onDeleteCategoria,
  onRestaurarCategoria,
  onCreateMarca,
  onDeleteMarca,
  onRestaurarMarca,
  onCreateModelo,
  onDeleteModelo,
  onRestaurarModelo,
  onCreateColor,
  onDeleteColor,
  onRestaurarColor,
  onCreateMaterial,
  onDeleteMaterial,
  onRestaurarMaterial,
  onCreatePropietario,
  onDeletePropietario,
  onRestaurarPropietario,
}) {
  const [activeSubTab, setActiveSubTab] = useState('categorias');
  const [showInactive, setShowInactive] = useState(false);

  const filterActive = (list) => {
    return list.filter((item) => (showInactive ? item.activo === false : item.activo !== false));
  };

  const tabsConfig = [
    { id: 'categorias', label: 'Categorías', count: filterActive(categorias).length, icon: FolderTree },
    { id: 'marcas', label: 'Marcas', count: filterActive(marcas).length, icon: Award },
    { id: 'modelos', label: 'Modelos', count: filterActive(modelos).length, icon: Box },
    { id: 'materiales', label: 'Materiales', count: filterActive(materiales).length, icon: Tag },
    { id: 'colores', label: 'Colores', count: filterActive(colores).length, icon: Palette },
    { id: 'propietarios', label: 'Propietarios', count: filterActive(propietarios).length, icon: Users },
  ];

  const renderActions = (id, isActive, onDelete, onRestore) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
      {isActive ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          style={{ color: 'var(--brand-red)' }}
          icon={Trash2}
          aria-label="Desactivar"
        />
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRestore(id)}
          style={{ color: 'var(--brand-green)' }}
          icon={RefreshCw}
          aria-label="Restaurar"
        />
      )}
    </div>
  );

  const renderStatus = (isActive) => (
    <Badge variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Activo' : 'Inactivo'}</Badge>
  );

  const categoriaColumns = [
    { header: 'ID', accessor: 'idCategoria', width: '70px', render: (cat) => <span style={{ color: 'var(--text-muted)' }}>#{cat.idCategoria}</span> },
    { header: 'Categoría', accessor: 'nombre', render: (cat) => <strong style={{ color: 'var(--text-white)' }}>{cat.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (cat) => <span style={{ color: 'var(--text-secondary)' }}>{cat.descripcion || '-'}</span> },
    { header: 'Estado', render: (cat) => renderStatus(cat.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (cat) => renderActions(cat.idCategoria, cat.activo !== false, onDeleteCategoria, onRestaurarCategoria),
    },
  ];

  const marcaColumns = [
    { header: 'ID', accessor: 'idMarca', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMarca}</span> },
    { header: 'Marca / Fabricante', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idMarca, m.activo !== false, onDeleteMarca, onRestaurarMarca),
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
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idModelo, m.activo !== false, onDeleteModelo, onRestaurarModelo),
    },
  ];

  const materialColumns = [
    { header: 'ID', accessor: 'idMaterial', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMaterial}</span> },
    { header: 'Material', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (m) => <span style={{ color: 'var(--text-secondary)' }}>{m.descripcion || '-'}</span> },
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idMaterial, m.activo !== false, onDeleteMaterial, onRestaurarMaterial),
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
    { header: 'Estado', render: (c) => renderStatus(c.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (c) => renderActions(c.idColor, c.activo !== false, onDeleteColor, onRestaurarColor),
    },
  ];

  const propietarioColumns = [
    { header: 'ID', accessor: 'idPropietario', width: '70px', render: (p) => <span style={{ color: 'var(--text-muted)' }}>#{p.idPropietario}</span> },
    { header: 'Propietario / Dueño', accessor: 'nombre', render: (p) => <strong style={{ color: 'var(--text-white)' }}>{p.nombre}</strong> },
    { header: 'Estado', render: (p) => renderStatus(p.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (p) => renderActions(p.idPropietario, p.activo !== false, onDeletePropietario, onRestaurarPropietario),
    },
  ];

  return (
    <div className="view-container">
      <PageHeader
        title="Catálogos & Atributos del Sistema"
        subtitle="Gestión multirubro de Categorías, Marcas, Modelos, Materiales, Colores y Propietarios"
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <input 
                type="checkbox" 
                id="showInactive" 
                checked={showInactive} 
                onChange={(e) => setShowInactive(e.target.checked)} 
              />
              <label htmlFor="showInactive">Ver Inactivos</label>
            </div>
            <Tabs tabs={tabsConfig} activeTab={activeSubTab} onChange={setActiveSubTab} />
          </div>
        }
      />

      {activeSubTab === 'categorias' && (
        <div className="grid-split-form">
          {!showInactive && <NuevaCategoriaForm onSubmit={onCreateCategoria} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={FolderTree} subtitle={showInactive ? "Categorías desactivadas" : "Rubros y agrupaciones de productos"}>
              {showInactive ? "Categorías Inactivas" : "Listado de Categorías"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={categoriaColumns}
                data={filterActive(categorias)}
                keyExtractor={(cat) => cat.idCategoria}
                showSearch={true}
                searchPlaceholder="Buscar categoría..."
                emptyMessage={showInactive ? "No hay categorías inactivas." : "No hay categorías registradas aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'marcas' && (
        <div className="grid-split-form">
          {!showInactive && <NuevaMarcaForm onSubmit={onCreateMarca} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Award} subtitle={showInactive ? "Marcas desactivadas" : "Fabricantes y marcas registradas"}>
              {showInactive ? "Marcas Inactivas" : "Listado de Marcas"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={marcaColumns}
                data={filterActive(marcas)}
                keyExtractor={(m) => m.idMarca}
                showSearch={true}
                searchPlaceholder="Buscar marca..."
                emptyMessage={showInactive ? "No hay marcas inactivas." : "No hay marcas registradas aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'modelos' && (
        <div className="grid-split-form">
          {!showInactive && <NuevoModeloForm marcas={marcas.filter(m => m.activo !== false)} onSubmit={onCreateModelo} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Layers} subtitle={showInactive ? "Modelos desactivados" : "Modelos activos vinculados a su marca"}>
              {showInactive ? "Modelos Inactivos" : "Listado de Modelos"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={modeloColumns}
                data={filterActive(modelos)}
                keyExtractor={(m) => m.idModelo}
                showSearch={true}
                searchPlaceholder="Buscar modelo o marca..."
                emptyMessage={showInactive ? "No hay modelos inactivos." : "No hay modelos registrados aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'materiales' && (
        <div className="grid-split-form">
          {!showInactive && <NuevoMaterialForm onSubmit={onCreateMaterial} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Layers} subtitle={showInactive ? "Materiales desactivados" : "Materiales activos en el catálogo"}>
              {showInactive ? "Materiales Inactivos" : "Listado de Materiales"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={materialColumns}
                data={filterActive(materiales)}
                keyExtractor={(m) => m.idMaterial}
                showSearch={true}
                searchPlaceholder="Buscar material..."
                emptyMessage={showInactive ? "No hay materiales inactivos." : "No hay materiales registrados aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'colores' && (
        <div className="grid-split-form">
          {!showInactive && <NuevoColorForm onSubmit={onCreateColor} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Palette} subtitle={showInactive ? "Colores desactivados" : "Colores disponibles para productos"}>
              {showInactive ? "Colores Inactivos" : "Listado de Colores"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={colorColumns}
                data={filterActive(colores)}
                keyExtractor={(c) => c.idColor}
                showSearch={true}
                searchPlaceholder="Buscar color o código..."
                emptyMessage={showInactive ? "No hay colores inactivos." : "No hay colores registrados aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'propietarios' && (
        <div className="grid-split-form">
          {!showInactive && <NuevoPropietarioForm onSubmit={onCreatePropietario} />}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Users} subtitle={showInactive ? "Propietarios desactivados" : "Dueños e inversores del inventario"}>
              {showInactive ? "Propietarios Inactivos" : "Listado de Propietarios"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={propietarioColumns}
                data={filterActive(propietarios)}
                keyExtractor={(p) => p.idPropietario}
                showSearch={true}
                searchPlaceholder="Buscar propietario..."
                emptyMessage={showInactive ? "No hay propietarios inactivos." : "No hay propietarios registrados aún."}
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
