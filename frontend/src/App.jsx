import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './pages/DashboardView';
import { ProductosView } from './pages/ProductosView';
import { VentasView } from './pages/VentasView';
import { ComprasView } from './pages/ComprasView';
import { CatalogosView } from './pages/CatalogosView';
import { MovimientosView } from './pages/MovimientosView';
import { BitacoraView } from './pages/BitacoraView';
import { DatabaseView } from './pages/DatabaseView';
import { MovimientoModal } from './components/MovimientoModal';
import { api } from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [colores, setColores] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [bitacora, setBitacora] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtros productos
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  // Modal ajuste rápido
  const [movimientoModalOpen, setMovimientoModalOpen] = useState(false);
  const [selectedProductoForMov, setSelectedProductoForMov] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        statsData,
        categoriasData,
        marcasData,
        modelosData,
        materialesData,
        coloresData,
        proveedoresData,
        clientesData,
        usuariosData,
        ventasData,
        comprasData,
        movsData,
        bitacoraData,
      ] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getCategorias().catch(() => []),
        api.getMarcas().catch(() => []),
        api.getModelos().catch(() => []),
        api.getMateriales().catch(() => []),
        api.getColores().catch(() => []),
        api.getProveedores().catch(() => []),
        api.getClientes().catch(() => []),
        api.getUsuarios().catch(() => []),
        api.getVentas().catch(() => []),
        api.getCompras().catch(() => []),
        api.getMovimientos().catch(() => []),
        api.getBitacora().catch(() => []),
      ]);

      setStats(statsData);
      setCategorias(categoriasData);
      setMarcas(marcasData);
      setModelos(modelosData);
      setMateriales(materialesData);
      setColores(coloresData);
      setProveedores(proveedoresData);
      setClientes(clientesData);
      setUsuarios(usuariosData);
      setVentas(ventasData);
      setCompras(comprasData);
      setMovimientos(movsData);
      setBitacora(bitacoraData);
    } catch (err) {
      console.error('Error cargando datos maestros:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadProductos = useCallback(async () => {
    try {
      const data = await api.getProductos({
        idCategoria: selectedCategoria || undefined,
        idModelo: selectedModelo || undefined,
        search: searchQuery || undefined,
        lowStock: filterLowStock,
      });
      setProductos(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  }, [selectedCategoria, selectedModelo, searchQuery, filterLowStock]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Handlers Productos
  const handleSaveProducto = async (data) => {
    if (data.idProducto) {
      await api.updateProducto(data.idProducto, data);
    } else {
      await api.createProducto(data);
    }
    await loadProductos();
    await loadData();
  };

  const handleDeleteProducto = async (id) => {
    if (window.confirm('¿Seguro de dar de baja este producto?')) {
      await api.deleteProducto(id);
      await loadProductos();
      await loadData();
    }
  };

  // Handlers Catálogos
  const handleCreateCategoria = async (data) => {
    await api.createCategoria(data);
    await loadData();
  };
  const handleDeleteCategoria = async (id) => {
    await api.deleteCategoria(id);
    await loadData();
  };

  const handleCreateMarca = async (data) => {
    await api.createMarca(data);
    await loadData();
  };
  const handleDeleteMarca = async (id) => {
    await api.deleteMarca(id);
    await loadData();
  };

  const handleCreateModelo = async (data) => {
    await api.createModelo(data);
    await loadData();
  };
  const handleDeleteModelo = async (id) => {
    await api.deleteModelo(id);
    await loadData();
  };

  const handleCreateColor = async (data) => {
    await api.createColor(data);
    await loadData();
  };
  const handleDeleteColor = async (id) => {
    await api.deleteColor(id);
    await loadData();
  };

  const handleCreateMaterial = async (data) => {
    await api.createMaterial(data);
    await loadData();
  };
  const handleDeleteMaterial = async (id) => {
    await api.deleteMaterial(id);
    await loadData();
  };

  // Handlers Ventas y Clientes
  const handleRegistrarVenta = async (data) => {
    await api.registrarVenta(data);
    await loadData();
    await loadProductos();
  };
  const handleCreateCliente = async (data) => {
    await api.createCliente(data);
    await loadData();
  };

  // Handlers Compras y Proveedores
  const handleRegistrarCompra = async (data) => {
    await api.registrarCompra(data);
    await loadData();
    await loadProductos();
  };
  const handleCreateProveedor = async (data) => {
    await api.createProveedor(data);
    await loadData();
  };

  // Handlers Movimientos
  const handleSaveMovimiento = async (data) => {
    await api.registrarMovimiento(data);
    await loadProductos();
    await loadData();
  };

  const handleOpenMovimientoModal = (prod) => {
    setSelectedProductoForMov(prod);
    setMovimientoModalOpen(true);
  };

  return (
    <div className="app-layout">
      <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} stats={stats} />

      <main className="main-content">
        {currentTab === 'dashboard' && (
          <DashboardView stats={stats} productos={productos} onSelectTab={setCurrentTab} />
        )}

        {currentTab === 'productos' && (
          <ProductosView
            productos={productos}
            categorias={categorias}
            marcas={marcas}
            modelos={modelos}
            materiales={materiales}
            colores={colores}
            loading={loading}
            onSaveProducto={handleSaveProducto}
            onDeleteProducto={handleDeleteProducto}
            onOpenMovimiento={handleOpenMovimientoModal}
            filterLowStock={filterLowStock}
            setFilterLowStock={setFilterLowStock}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategoria={selectedCategoria}
            setSelectedCategoria={setSelectedCategoria}
            selectedModelo={selectedModelo}
            setSelectedModelo={setSelectedModelo}
          />
        )}

        {currentTab === 'ventas' && (
          <VentasView
            ventas={ventas}
            clientes={clientes}
            productos={productos}
            usuarios={usuarios}
            onRegistrarVenta={handleRegistrarVenta}
            onCreateCliente={handleCreateCliente}
          />
        )}

        {currentTab === 'compras' && (
          <ComprasView
            compras={compras}
            proveedores={proveedores}
            productos={productos}
            usuarios={usuarios}
            onRegistrarCompra={handleRegistrarCompra}
            onCreateProveedor={handleCreateProveedor}
          />
        )}

        {currentTab === 'catalogos' && (
          <CatalogosView
            categorias={categorias}
            marcas={marcas}
            modelos={modelos}
            materiales={materiales}
            colores={colores}
            onCreateCategoria={handleCreateCategoria}
            onDeleteCategoria={handleDeleteCategoria}
            onCreateMarca={handleCreateMarca}
            onDeleteMarca={handleDeleteMarca}
            onCreateModelo={handleCreateModelo}
            onDeleteModelo={handleDeleteModelo}
            onCreateColor={handleCreateColor}
            onDeleteColor={handleDeleteColor}
            onCreateMaterial={handleCreateMaterial}
            onDeleteMaterial={handleDeleteMaterial}
          />
        )}

        {currentTab === 'movimientos' && <MovimientosView movimientos={movimientos} />}

        {currentTab === 'bitacora' && <BitacoraView bitacora={bitacora} />}

        {currentTab === 'database' && <DatabaseView />}
      </main>

      <MovimientoModal
        isOpen={movimientoModalOpen}
        onClose={() => setMovimientoModalOpen(false)}
        onSave={handleSaveMovimiento}
        producto={selectedProductoForMov}
        usuarios={usuarios}
        onNavigateTab={setCurrentTab}
      />
    </div>
  );
}

export default App;
