import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
 * Componente Raíz de la Aplicación con Enrutamiento.
 */
export function App() {
  const navigate = useNavigate();

  // Hooks desacoplados
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
      navigate('/admin');
    } else {
      openLoginModal();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Enrutamiento de toda la aplicación
  return (
    <>
      <Routes>
        {/* === RUTA PÚBLICA (CATÁLOGO CLIENTES) === */}
        <Route
          path="/"
          element={
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
          }
        />

        {/* === RUTAS ADMINISTRATIVAS === */}
        <Route
          path="/admin/*"
          element={
            currentUser ? (
              <div className="app-layout">
                {/* Barra Lateral de Navegación Admin */}
                <Sidebar
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />

                {/* Contenedor Principal de Vistas Admin */}
                <main className="main-content">
                  <Routes>
                    <Route 
                      path="/" 
                      element={<Navigate to="dashboard" replace />} 
                    />
                    
                    <Route
                      path="dashboard"
                      element={
                        <DashboardView
                          stats={inventory.stats}
                          ventas={inventory.ventas}
                          movimientos={inventory.movimientos}
                          productos={inventory.productos}
                          categorias={inventory.categorias}
                          proveedores={inventory.proveedores}
                        />
                      }
                    />

                    <Route
                      path="productos"
                      element={
                        <ProductosView
                          productos={inventory.productos}
                          categorias={inventory.categorias}
                          marcas={inventory.marcas}
                          modelos={inventory.modelos}
                          materiales={inventory.materiales}
                          colores={inventory.colores}
                          propietarios={inventory.propietarios}
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
                          onCreateCategoria={inventory.createCategoria}
                          onCreateMaterial={inventory.createMaterial}
                          onCreatePropietario={inventory.createPropietario}
                          onCreateModelo={inventory.createModelo}
                          onCreateColor={inventory.createColor}
                        />
                      }
                    />

                    <Route
                      path="ventas"
                      element={
                        <VentasView
                          ventas={inventory.ventas}
                          productos={inventory.productos}
                          usuarios={inventory.usuarios}
                          currentUser={currentUser}
                          onRegistrarVenta={inventory.registrarVenta}
                        />
                      }
                    />

                    <Route
                      path="compras"
                      element={
                        <ComprasView
                          compras={inventory.compras}
                          productos={inventory.productos}
                          proveedores={inventory.proveedores}
                          usuarios={inventory.usuarios}
                          currentUser={currentUser}
                          onRegistrarCompra={inventory.registrarCompra}
                          onCreateProveedor={inventory.createProveedor}
                        />
                      }
                    />

                    <Route
                      path="catalogos"
                      element={
                        <CatalogosView
                          categorias={inventory.categorias}
                          marcas={inventory.marcas}
                          modelos={inventory.modelos}
                          materiales={inventory.materiales}
                          colores={inventory.colores}
                          propietarios={inventory.propietarios}
                          proveedores={inventory.proveedores}
                          onCreateCategoria={inventory.createCategoria}
                          onDeleteCategoria={inventory.deleteCategoria}
                          onRestaurarCategoria={inventory.restaurarCategoria}
                          onCreateMarca={inventory.createMarca}
                          onDeleteMarca={inventory.deleteMarca}
                          onRestaurarMarca={inventory.restaurarMarca}
                          onCreateModelo={inventory.createModelo}
                          onDeleteModelo={inventory.deleteModelo}
                          onRestaurarModelo={inventory.restaurarModelo}
                          onCreateColor={inventory.createColor}
                          onDeleteColor={inventory.deleteColor}
                          onRestaurarColor={inventory.restaurarColor}
                          onCreateMaterial={inventory.createMaterial}
                          onDeleteMaterial={inventory.deleteMaterial}
                          onRestaurarMaterial={inventory.restaurarMaterial}
                          onCreatePropietario={inventory.createPropietario}
                          onDeletePropietario={inventory.deletePropietario}
                          onRestaurarPropietario={inventory.restaurarPropietario}
                          onCreateProveedor={inventory.createProveedor}
                        />
                      }
                    />

                    <Route
                      path="movimientos"
                      element={
                        <MovimientosView
                          movimientos={inventory.movimientos}
                          productos={inventory.productos}
                          onSaveMovimiento={inventory.saveMovimiento}
                        />
                      }
                    />

                    <Route
                      path="database"
                      element={<DatabaseView />}
                    />

                    <Route
                      path="bitacora"
                      element={
                        <BitacoraView
                          bitacora={inventory.bitacora}
                          usuarios={inventory.usuarios}
                        />
                      }
                    />
                    
                    {/* Ruta por defecto en /admin */}
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            ) : (
              // Si intenta entrar a /admin pero no hay usuario, redirigir al inicio o abrir modal
              <Navigate to="/" replace />
            )
          }
        />

        {/* Cualquier otra ruta redirige a tienda */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Modales Globales */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={(user) => {
          login(user);
          navigate('/admin');
        }}
      />

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
    </>
  );
}

export default App;
