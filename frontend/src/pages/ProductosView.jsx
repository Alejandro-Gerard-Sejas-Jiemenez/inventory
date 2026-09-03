import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, FolderTree } from 'lucide-react';
import { ProductoModal } from '../components/ProductoModal';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardBody } from '../components/common/Card';
import { InputField } from '../components/common/InputField';
import { SelectField } from '../components/common/SelectField';
import { Button } from '../components/common/Button';
import { DataTable } from '../components/common/DataTable';
import { getProductoColumns } from '../components/productos/ProductoColumns';

export function ProductosView({
  productos = [],
  categorias = [],
  marcas = [],
  modelos = [],
  materiales = [],
  colores = [],
  propietarios = [],
  loading = false,
  onSaveProducto,
  onDeleteProducto,
  onOpenMovimiento,
  filterLowStock,
  setFilterLowStock,
  searchQuery,
  setSearchQuery,
  selectedCategoria,
  setSelectedCategoria,
  selectedModelo,
  setSelectedModelo,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const handleCreate = () => {
    setEditingProducto(null);
    setModalOpen(true);
  };

  const handleEdit = (prod) => {
    setEditingProducto(prod);
    setModalOpen(true);
  };

  const columns = getProductoColumns({
    onOpenMovimiento,
    onEdit: handleEdit,
    onDelete: onDeleteProducto,
  });

  return (
    <div className="view-container">
      <PageHeader
        title="Catálogo Multirubro de Productos"
        subtitle="Control de stock, precios, marcas y categorización vinculados a Los Caseritos"
        actions={
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              variant={filterLowStock ? 'danger' : 'secondary'}
              onClick={() => setFilterLowStock(!filterLowStock)}
              icon={AlertTriangle}
            >
              {filterLowStock ? 'Ver Todos' : 'Filtrar Stock Crítico'}
            </Button>
            <Button variant="brand" onClick={handleCreate} icon={Plus}>
              Nuevo Producto
            </Button>
          </div>
        }
      />

      <Card>
        <CardBody>
          <div className="table-controls" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            <div className="search-bar">
              <InputField
                placeholder="Buscar por SKU, nombre o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>

            <SelectField
              placeholder="Todas las Categorías"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              options={categorias.map((c) => ({
                value: c.idCategoria,
                label: c.nombre,
              }))}
              icon={FolderTree}
            />

            <SelectField
              placeholder="Todos los Modelos"
              value={selectedModelo}
              onChange={(e) => setSelectedModelo(e.target.value)}
              options={modelos.map((m) => ({
                value: m.idModelo,
                label: `${m.nombre} ${m.marca?.nombre ? `(${m.marca.nombre})` : ''}`,
              }))}
              icon={Filter}
            />
          </div>

          <DataTable
            columns={columns}
            data={productos}
            loading={loading}
            keyExtractor={(p) => p.idProducto}
            emptyMessage="No se encontraron productos coincidentes con los filtros."
          />
        </CardBody>
      </Card>

      <ProductoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={onSaveProducto}
        producto={editingProducto}
        categorias={categorias}
        marcas={marcas}
        modelos={modelos}
        materiales={materiales}
        colores={colores}
        propietarios={propietarios}
      />
    </div>
  );
}
