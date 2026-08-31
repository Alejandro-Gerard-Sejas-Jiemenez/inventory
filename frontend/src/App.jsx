import React, { useState } from 'react';
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
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { useInventoryData } from './hooks/useInventoryData';

/**
 * Componente Raíz de la Aplicación (Orquestador de Vistas y Modos).
 * Responsabilidad: Enrutamiento de alto nivel y composición de vistas.
 */
export function App() {
  // Modo de aplicación: 'tienda' (catálogo clientes) o 'admin' (panel de administración)
  const [appMode, setAppMode] = useState('tienda');
  const [currentTab, setCurrentTab] = useState('dashboard');

  // Hooks desacoplados por responsabilidad (Clean Architecture & SRP)
  const { currentUser, isLoginModalOpen, login, logout, openLoginModal, closeLoginModal } = useAuth();
  const { cartItems, addToCart, updateCartQuantity, removeCartItem, clearCart } = useCart();
  const inventory = useInventoryData();

  // Modal de ajuste rápido de stock
  const [movimientoModalOpen, setMovimientoModalOpen] = useState(false);
  const [selectedProductoForMov, setSelectedProductoForMov] = useState(null);

  const handleOpenMovimientoModal = (producto) => {
    setSelectedProductoForMov(producto);
    setMovimientoModalOpen(true);
  };

  const handleGoToAdmin = () => {
    if (currentUser) {
      setAppMode('admin');
    } else {
      openLoginModal();
    }
  };

  const handleLogout = () => {
    logout();
    setAppMode('tienda');
  };

  // 1. Modo Tienda Pública para Clientes
  if (appMode === 'tienda') {
    return (
      <>
        <CatalogoClienteView
          productos={inventory.productos}
          categorias={inventory.categorias}
          marcas={inventory.marcas}
          cartItems={cartItems}
          onAddToCart={addToCart}
          onUpdateCartQuantity={updateCartQuantity}
          onRemoveCartItem={removeCartItem}
          onClearCart={clearCart}
          onGoToAdmin={handleGoToAdmin}
        />

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onLoginSuccess={(user) => {
            login(user);
            setAppMode('admin');
          }}
        />
      </>
    );
  }

  // 2. Modo Admin sin sesión activa: forzar modal de login
  if (appMode === 'admin' && !currentUser) {
    return (
      <AdminLoginModal
        isOpen={true}
        onClose={() => setAppMode('tienda')}
        onLoginSuccess={(user) => {
          login(user);
          setAppMode('admin');
        }}
      />
    );
  }

  // 3. Modo Admin con sesión activa: Panel de Administración
  return (
    <div className="app-layout">
      {/* Barra Lateral de Navegación Admin */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onLogout={handleLogout}
        onGoToTienda={() => setAppMode('tienda')}
      />

      {/* Contenedor Principal de Vistas Admin */}
      <main className="main-content">
        {currentTab === 'dashboard' && (
          <DashboardView
            stats={inventory.stats}
            ventas={inventory.ventas}
            movimientos={inventory.movimientos}
            productos={inventory.productos}
            categorias={inventory.categorias}
            proveedores={inventory.proveedores}
            onTabChange={setCurrentTab}
          />
        )}

        {currentTab === 'productos' && (
          <ProductosView
            productos={inventory.productos}
            categorias={inventory.categorias}
            marcas={inventory.marcas}
            modelos={inventory.modelos}
            materiales={inventory.materiales}
            colores={inventory.colores}
            searchQuery={inventory.searchQuery}
            setSearchQuery={inventory.setSearchQuery}
            selectedCategoria={inventory.selectedCategoria}
            setSelectedCategoria={inventory.setSelectedCategoria}
            selectedModelo={inventory.selectedModelo}
            setSelectedModelo={inventory.setSelectedModelo}
            filterLowStock={inventory.filterLowStock}
            setFilterLowStock={inventory.setFilterLowStock}
            onSaveProducto={inventory.saveProducto}
            onDeleteProducto={inventory.deleteProducto}
            onOpenMovimiento={handleOpenMovimientoModal}
          />
        )}

        {currentTab === 'ventas' && (
          <VentasView
            ventas={inventory.ventas}
            productos={inventory.productos}
            clientes={inventory.clientes}
            usuarios={inventory.usuarios}
            currentUser={currentUser}
            onRegistrarVenta={inventory.registrarVenta}
            onCreateCliente={inventory.createCliente}
          />
        )}

        {currentTab === 'compras' && (
          <ComprasView
            compras={inventory.compras}
            productos={inventory.productos}
            proveedores={inventory.proveedores}
            usuarios={inventory.usuarios}
            currentUser={currentUser}
            onRegistrarCompra={inventory.registrarCompra}
            onCreateProveedor={inventory.createProveedor}
          />
        )}

        {currentTab === 'catalogos' && (
          <CatalogosView
            categorias={inventory.categorias}
            marcas={inventory.marcas}
            modelos={inventory.modelos}
            materiales={inventory.materiales}
            colores={inventory.colores}
            proveedores={inventory.proveedores}
            clientes={inventory.clientes}
            onCreateCategoria={inventory.createCategoria}
            onDeleteCategoria={inventory.deleteCategoria}
            onCreateMarca={inventory.createMarca}
            onDeleteMarca={inventory.deleteMarca}
            onCreateModelo={inventory.createModelo}
            onDeleteModelo={inventory.deleteModelo}
            onCreateColor={inventory.createColor}
            onDeleteColor={inventory.deleteColor}
            onCreateMaterial={inventory.createMaterial}
            onDeleteMaterial={inventory.deleteMaterial}
            onCreateProveedor={inventory.createProveedor}
            onCreateCliente={inventory.createCliente}
          />
        )}

        {currentTab === 'movimientos' && (
          <MovimientosView
            movimientos={inventory.movimientos}
            productos={inventory.productos}
            onSaveMovimiento={inventory.saveMovimiento}
          />
        )}

        {currentTab === 'database' && (
          <DatabaseView />
        )}

        {currentTab === 'bitacora' && (
          <BitacoraView
            bitacora={inventory.bitacora}
            usuarios={inventory.usuarios}
          />
        )}
      </main>

      {/* Modal Reutilizable para Movimiento Rápido de Stock */}
      <MovimientoModal
        isOpen={movimientoModalOpen}
        onClose={() => {
          setMovimientoModalOpen(false);
          setSelectedProductoForMov(null);
        }}
        producto={selectedProductoForMov}
        usuarios={inventory.usuarios}
        currentUser={currentUser}
        onSave={async (movData) => {
          await inventory.saveMovimiento(movData);
          setMovimientoModalOpen(false);
          setSelectedProductoForMov(null);
        }}
      />
    </div>
  );
}

export default App;
