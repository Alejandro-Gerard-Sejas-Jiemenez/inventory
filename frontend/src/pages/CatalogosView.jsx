import React, { useState, useMemo } from 'react';
import { Tag, Palette, Box, Layers, FolderTree, Award, Users, Edit, X } from 'lucide-react';
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
  onUpdateCategoria,
  onDeleteCategoria,
  onRestaurarCategoria,
  onCreateMarca,
  onUpdateMarca,
  onDeleteMarca,
  onRestaurarMarca,
  onCreateModelo,
  onUpdateModelo,
  onDeleteModelo,
  onRestaurarModelo,
  onCreateColor,
  onUpdateColor,
  onDeleteColor,
  onRestaurarColor,
  onCreateMaterial,
  onUpdateMaterial,
  onDeleteMaterial,
  onRestaurarMaterial,
  onCreatePropietario,
  onUpdatePropietario,
  onDeletePropietario,
  onRestaurarPropietario,
}) {
  const [activeSubTab, setActiveSubTab] = useState('categorias');
  const [showInactive, setShowInactive] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

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

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleSubmitForm = async (formData) => {
    if (editingItem) {
      if (activeSubTab === 'categorias' && onUpdateCategoria) {
        await onUpdateCategoria(editingItem.idCategoria, formData);
      } else if (activeSubTab === 'marcas' && onUpdateMarca) {
        await onUpdateMarca(editingItem.idMarca, formData);
      } else if (activeSubTab === 'modelos' && onUpdateModelo) {
        await onUpdateModelo(editingItem.idModelo, formData);
      } else if (activeSubTab === 'materiales' && onUpdateMaterial) {
        await onUpdateMaterial(editingItem.idMaterial, formData);
      } else if (activeSubTab === 'colores' && onUpdateColor) {
        await onUpdateColor(editingItem.idColor, formData);
      } else if (activeSubTab === 'propietarios' && onUpdatePropietario) {
        await onUpdatePropietario(editingItem.idPropietario, formData);
      }
      setEditingItem(null);
    } else {
      if (activeSubTab === 'categorias' && onCreateCategoria) {
        await onCreateCategoria(formData);
      } else if (activeSubTab === 'marcas' && onCreateMarca) {
        await onCreateMarca(formData);
      } else if (activeSubTab === 'modelos' && onCreateModelo) {
        await onCreateModelo(formData);
      } else if (activeSubTab === 'materiales' && onCreateMaterial) {
        await onCreateMaterial(formData);
      } else if (activeSubTab === 'colores' && onCreateColor) {
        await onCreateColor(formData);
      } else if (activeSubTab === 'propietarios' && onCreatePropietario) {
        await onCreatePropietario(formData);
      }
    }
  };

  const categoriaCols = useMemo(() => getCategoriaColumns(onDeleteCategoria, onRestaurarCategoria, handleEdit), [onDeleteCategoria, onRestaurarCategoria]);
  const marcaCols = useMemo(() => getMarcaColumns(onDeleteMarca, onRestaurarMarca, handleEdit), [onDeleteMarca, onRestaurarMarca]);
  const modeloCols = useMemo(() => getModeloColumns(onDeleteModelo, onRestaurarModelo, handleEdit), [onDeleteModelo, onRestaurarModelo]);
  const materialCols = useMemo(() => getMaterialColumns(onDeleteMaterial, onRestaurarMaterial, handleEdit), [onDeleteMaterial, onRestaurarMaterial]);
  const colorCols = useMemo(() => getColorColumns(onDeleteColor, onRestaurarColor, handleEdit), [onDeleteColor, onRestaurarColor]);
  const propietarioCols = useMemo(() => getPropietarioColumns(onDeletePropietario, onRestaurarPropietario, handleEdit), [onDeletePropietario, onRestaurarPropietario]);

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
                onChange={(e) => {
                  setShowInactive(e.target.checked);
                  setEditingItem(null);
                }} 
              />
              <label htmlFor="showInactive">Ver Inactivos</label>
            </div>
            <Tabs 
              tabs={tabsConfig} 
              activeTab={activeSubTab} 
              onChange={(tab) => {
                setActiveSubTab(tab);
                setEditingItem(null);
              }} 
            />
          </div>
        }
      />

      {activeSubTab === 'categorias' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevaCategoriaForm onSubmit={handleSubmitForm} initialData={editingItem} key={editingItem?.idCategoria || 'new-cat'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={FolderTree} subtitle={showInactive ? "Categorías desactivadas" : "Rubros y agrupaciones de productos"}>
              {showInactive ? "Categorías Inactivas" : "Listado de Categorías"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={categoriaCols}
                data={filterActive(categorias)}
                emptyMessage="No hay categorías registradas"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'marcas' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevaMarcaForm onSubmit={handleSubmitForm} initialData={editingItem} key={editingItem?.idMarca || 'new-mar'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Award} subtitle={showInactive ? "Marcas desactivadas" : "Fabricantes y marcas comerciales"}>
              {showInactive ? "Marcas Inactivas" : "Listado de Marcas"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={marcaCols}
                data={filterActive(marcas)}
                emptyMessage="No hay marcas registradas"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'modelos' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevoModeloForm onSubmit={handleSubmitForm} marcas={marcas} initialData={editingItem} key={editingItem?.idModelo || 'new-mod'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Box} subtitle={showInactive ? "Modelos desactivados" : "Dispositivos y versiones soportadas"}>
              {showInactive ? "Modelos Inactivos" : "Listado de Modelos"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={modeloCols}
                data={filterActive(modelos)}
                emptyMessage="No hay modelos registrados"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'materiales' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevoMaterialForm onSubmit={handleSubmitForm} initialData={editingItem} key={editingItem?.idMaterial || 'new-mat'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Tag} subtitle={showInactive ? "Materiales desactivados" : "Composición de productos (Silicona, Cuero, TPU...)"}>
              {showInactive ? "Materiales Inactivos" : "Listado de Materiales"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={materialCols}
                data={filterActive(materiales)}
                emptyMessage="No hay materiales registrados"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'colores' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevoColorForm onSubmit={handleSubmitForm} initialData={editingItem} key={editingItem?.idColor || 'new-col'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Palette} subtitle={showInactive ? "Colores desactivados" : "Gama cromática de variantes"}>
              {showInactive ? "Colores Inactivos" : "Listado de Colores"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={colorCols}
                data={filterActive(colores)}
                emptyMessage="No hay colores registrados"
              />
            </CardBody>
          </Card>
        </div>
      )}

      {activeSubTab === 'propietarios' && (
        <div className="grid-split-form">
          {!showInactive && (
            <div>
              {editingItem && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', background: 'var(--brand-gold-bg)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--brand-gold)', fontWeight: 700 }}>Modo Edición: {editingItem.nombre}</span>
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: 'var(--text-white)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              )}
              <NuevoPropietarioForm onSubmit={handleSubmitForm} initialData={editingItem} key={editingItem?.idPropietario || 'new-prop'} />
            </div>
          )}
          <Card style={{ gridColumn: showInactive ? '1 / -1' : 'auto' }}>
            <CardTitle icon={Users} subtitle={showInactive ? "Propietarios desactivados" : "Dueños de consignación de productos"}>
              {showInactive ? "Propietarios Inactivos" : "Listado de Propietarios"}
            </CardTitle>
            <CardBody>
              <DataTable
                columns={propietarioCols}
                data={filterActive(propietarios)}
                emptyMessage="No hay propietarios registrados"
              />
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
