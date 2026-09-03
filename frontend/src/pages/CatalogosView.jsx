import React, { useState, useMemo } from 'react';
import { Tag, Palette, Box, Layers, FolderTree, Award, Users } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardTitle, CardBody } from '../components/common/Card';
import { DataTable } from '../components/common/DataTable';
import { Tabs } from '../components/common/Tabs';
import { NuevaCategoriaForm } from '../components/catalogos/NuevaCategoriaForm';
import { NuevaMarcaForm } from '../components/catalogos/NuevaMarcaForm';
import { NuevoModeloForm } from '../components/catalogos/NuevoModeloForm';
import { NuevoMaterialForm } from '../components/catalogos/NuevoMaterialForm';
import { NuevoColorForm } from '../components/catalogos/NuevoColorForm';
import { NuevoPropietarioForm } from '../components/catalogos/NuevoPropietarioForm';
import {
  getCategoriaColumns,
  getMarcaColumns,
  getModeloColumns,
  getMaterialColumns,
  getColorColumns,
  getPropietarioColumns,
} from '../components/catalogos/catalogosColumns';

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

  const categoriaCols = useMemo(() => getCategoriaColumns(onDeleteCategoria, onRestaurarCategoria), [onDeleteCategoria, onRestaurarCategoria]);
  const marcaCols = useMemo(() => getMarcaColumns(onDeleteMarca, onRestaurarMarca), [onDeleteMarca, onRestaurarMarca]);
  const modeloCols = useMemo(() => getModeloColumns(onDeleteModelo, onRestaurarModelo), [onDeleteModelo, onRestaurarModelo]);
  const materialCols = useMemo(() => getMaterialColumns(onDeleteMaterial, onRestaurarMaterial), [onDeleteMaterial, onRestaurarMaterial]);
  const colorCols = useMemo(() => getColorColumns(onDeleteColor, onRestaurarColor), [onDeleteColor, onRestaurarColor]);
  const propietarioCols = useMemo(() => getPropietarioColumns(onDeletePropietario, onRestaurarPropietario), [onDeletePropietario, onRestaurarPropietario]);

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
                columns={categoriaCols}
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
                columns={marcaCols}
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
          {!showInactive && (
            <NuevoModeloForm
              marcas={marcas.filter(m => m.activo !== false)}
              onSubmit={onCreateModelo}
              onCreateMarca={onCreateMarca}
            />
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Layers} subtitle={showInactive ? "Modelos desactivados" : "Modelos activos vinculados a su marca"}>
              {showInactive ? "Modelos Inactivos" : "Listado de Modelos"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={modeloCols}
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
                columns={materialCols}
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
                columns={colorCols}
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
                columns={propietarioCols}
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
