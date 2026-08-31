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
import { CatalogoClienteView } from './pages/CatalogoClienteView';
import { MovimientoModal } from './components/MovimientoModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { api } from './services/api';

export function App() {
  // Modo de aplicación: 'tienda' (catálogo clientes) o 'admin' (panel protegido)
  const [appMode, setAppMode] = useState('tienda');
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Estado de autenticación del administrador
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('inventario_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Carrito de compras global
  const [cartItems, setCartItems] = useState([]);

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
  const [_loading, setLoading] = useState(false);

  // Filtros productos
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [_filterLowStock, _setFilterLowStock] = useState(false);

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
        lowStock: _filterLowStock || undefined,
      });
      setProductos(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  }, [selectedCategoria, selectedModelo, searchQuery, _filterLowStock]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Manejo de Acceso y Autenticación Admin
  const handleGoToAdmin = () => {
    if (currentUser) {
      setAppMode('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem('inventario_user', JSON.stringify(user));
    } catch {
      // Ignorar storage error
    }
    setAppMode('admin');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('inventario_user');
    } catch {
      // Ignorar storage error
    }
    setAppMode('tienda');
  };

  // Manejadores del Carrito de Compras
  const handleAddToCart = (producto) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.idProducto === producto.idProducto);
      const stockMax = producto.stockActual ?? 999;
      if (existing) {
        if (existing.cantidad >= stockMax) return prev;
        return prev.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const handleUpdateCartQuantity = (idProducto, cantidad) => {
    if (cantidad <= 0) {
      handleRemoveCartItem(idProducto);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.idProducto === idProducto) {
          const maxStock = item.stockActual ?? 999;
          const finalCant = Math.min(cantidad, maxStock);
          return { ...item, cantidad: finalCant };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (idProducto) => {
    setCartItems((prev) => prev.filter((item) => item.idProducto !== idProducto));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Handlers CRUD Admin
  const handleSaveProducto = async (productoData) => {
    if (productoData.idProducto) {
      await api.updateProducto(productoData.idProducto, productoData);
    } else {
      await api.createProducto(productoData);
    }
    loadProductos();
    loadData();
  };

  const handleDeleteProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await api.deleteProducto(id);
      loadProductos();
      loadData();
    }
  };

  const handleOpenMovimientoModal = (producto) => {
    setSelectedProductoForMov(producto);
    setMovimientoModalOpen(true);
  };

  const handleSaveMovimiento = async (movData) => {
    await api.createMovimiento(movData);
    loadProductos();
    loadData();
  };

  const handleRegistrarVenta = async (ventaData) => {
    await api.createVenta(ventaData);
    loadProductos();
    loadData();
  };

  const handleRegistrarCompra = async (compraData) => {
    await api.createCompra(compraData);
    loadProductos();
    loadData();
  };

  const handleCreateCliente = async (clienteData) => {
    await api.createCliente(clienteData);
    loadData();
  };

  const handleCreateProveedor = async (provData) => {
    await api.createProveedor(provData);
    loadData();
  };

  const handleCreateCategoria = async (catData) => {
    await api.createCategoria(catData);
    loadData();
  };

  const handleDeleteCategoria = async (id) => {
    if (window.confirm('¿Eliminar esta categoría?')) {
      await api.deleteCategoria(id);
      loadData();
    }
  };

  const handleCreateMarca = async (marcaData) => {
    await api.createMarca(marcaData);
    loadData();
  };

  const handleDeleteMarca = async (id) => {
    if (window.confirm('¿Eliminar esta marca?')) {
      await api.deleteMarca(id);
      loadData();
    }
  };

  const handleCreateModelo = async (modData) => {
    await api.createModelo(modData);
    loadData();
  };

  const handleDeleteModelo = async (id) => {
    if (window.confirm('¿Eliminar este modelo?')) {
      await api.deleteModelo(id);
      loadData();
    }
  };

  const handleCreateColor = async (colData) => {
    await api.createColor(colData);
    loadData();
  };

  const handleDeleteColor = async (id) => {
    if (window.confirm('¿Eliminar este color?')) {
      await api.deleteColor(id);
      loadData();
    }
  };

  const handleCreateMaterial = async (matData) => {
    await api.createMaterial(matData);
    loadData();
  };

  const handleDeleteMaterial = async (id) => {
    if (window.confirm('¿Eliminar este material?')) {
      await api.deleteMaterial(id);
      loadData();
    }
  };

  // Si el modo es 'tienda', renderiza la Tienda Pública
  if (appMode === 'tienda') {
    return (
      <>
        <CatalogoClienteView
          productos={productos}
          categorias={categorias}
          marcas={marcas}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onRemoveCartItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onGoToAdmin={handleGoToAdmin}
        />

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // Si el modo es 'admin' y el usuario no está autenticado, redirigir
  if (appMode === 'admin' && !currentUser) {
    return (
      <AdminLoginModal
        isOpen={true}
        onClose={() => setAppMode('tienda')}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  // Panel de Control Administrador Protegido
  return (
    <div className="app-layout">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        stats={stats}
        onSwitchToTienda={() => setAppMode('tienda')}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {currentTab === 'dashboard' && (
          <DashboardView
            stats={stats}
            lowStockProducts={productos.filter(
              (p) => p.activo && p.stockActual <= p.stockMinimo
            )}
            onOpenMovimiento={handleOpenMovimientoModal}
            onSelectTab={setCurrentTab}
          />
        )}

        {currentTab === 'productos' && (
          <ProductosView
            productos={productos}
            categorias={categorias}
            modelos={modelos}
            materiales={materiales}
            colores={colores}
            onSaveProducto={handleSaveProducto}
            onDeleteProducto={handleDeleteProducto}
            onOpenMovimiento={handleOpenMovimientoModal}
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
