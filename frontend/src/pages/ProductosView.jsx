import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react';
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
  modelos = [],
  materiales = [],
  colores = [],
  loading = false,
  onSaveProducto,
  onDeleteProducto,
  onOpenMovimiento,
  filterLowStock,
  setFilterLowStock,
  searchQuery,
  setSearchQuery,
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
        title="Catálogo de Productos & Existencias"
        subtitle="Control de stock, precios y atributos vinculados a Los Caseritos"
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
          <div className="table-controls">
            <div className="search-bar">
              <InputField
                placeholder="Buscar por SKU, nombre o descripción..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
              />
            </div>
            <div style={{ minWidth: '220px' }}>
              <SelectField
                placeholder="Todos los Modelos"
                value={selectedModelo}
                onChange={(e) => setSelectedModelo(e.target.value)}
                options={modelos.map((m) => ({
                  value: m.idModelo,
                  label: `${m.nombre} (${m.marca || 'S/M'})`,
                }))}
                icon={Filter}
              />
            </div>
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
        modelos={modelos}
        materiales={materiales}
        colores={colores}
      />
    </div>
  );
}
