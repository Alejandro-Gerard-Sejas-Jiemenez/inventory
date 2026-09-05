import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RotateCcw, Home, ShieldCheck } from 'lucide-react';
import {
  TiendaHeader,
  TiendaDeviceSelector,
  TiendaSearchCapsule,
  TiendaFooter,
  ProductoCard,
  ProductoDetalleModal,
  CarritoDrawer,
  CheckoutWhatsAppModal,
} from '../components/tienda';
import { useTiendaCatalog } from '../hooks/useTiendaCatalog';

/**
 * Vista de Categoría / Catálogo Dedicado (pag/pag).
 * Muestra el selector de modelo de teléfono, la cápsula de filtros y las tarjetas de productos
 * correspondientes a la categoría seleccionada en la URL.
 */
export function CategoriaProductosView({
  productos = [],
  categorias = [],
  marcas = [],
  cartItems = [],
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onClearCart,
  onGoToAdmin,
}) {
  const { idCategoria } = useParams();
  const catalog = useTiendaCatalog(productos);

  // Sincronizar categoría de la ruta
  useEffect(() => {
    if (idCategoria) {
      catalog.setSelectedCategoria(idCategoria);
      catalog.setCurrentPage(1);
    } else {
      catalog.setSelectedCategoria('ALL');
    }
  }, [idCategoria]);

  // Categoría actual
  const currentCategory = useMemo(() => {
    if (!idCategoria || idCategoria === 'ALL') return null;
    return categorias.find((c) => String(c.idCategoria) === String(idCategoria));
  }, [idCategoria, categorias]);

  // Modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState('');

  const totalCartUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  }, [cartItems]);

  const handleOrderSuccess = () => {
    if (onClearCart) onClearCart();
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setOrderSuccessMessage('¡Tu pedido ha sido enviado con éxito por WhatsApp! La bolsa de pedidos se ha vaciado.');
    setTimeout(() => setOrderSuccessMessage(''), 8000);
  };

  // Productos de la categoría actual para el selector de modelos
  const categoryProducts = useMemo(() => {
    if (!idCategoria || idCategoria === 'ALL') return productos;
    return productos.filter((p) => {
      const catId = p.categoria?.idCategoria ?? p.categoria?.id ?? p.idCategoria ?? (typeof p.categoria === 'object' ? null : p.categoria);
      return String(catId) === String(idCategoria);
    });
  }, [productos, idCategoria]);

  return (
    <div
      data-theme={catalog.theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        backgroundImage:
          catalog.theme === 'light'
            ? 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(239, 68, 68, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.05) 0%, transparent 60%)'
            : 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Header con categorías en el navbar */}
      <TiendaHeader
        theme={catalog.theme}
        onToggleTheme={catalog.toggleTheme}
        totalCartUnits={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onGoToAdmin={onGoToAdmin}
        categorias={categorias}
        activeCatId={idCategoria}
      />

      {/* Notificación de Pedido Exitoso */}
      {orderSuccessMessage && (
        <div
          style={{
            maxWidth: '1280px',
            margin: '1rem auto 0',
            padding: '0.85rem 1.25rem',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: 'var(--brand-green)',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.86rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(16, 185, 129, 0.15)',
          }}
        >
          <ShieldCheck size={18} />
          <span>{orderSuccessMessage}</span>
        </div>
      )}

      {/* Encabezado Editorial de la Categoría */}
      <section
        style={{
          padding: '2.2rem 0 1.4rem',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              marginBottom: '1rem',
            }}
          >
            <Link
              to="/"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: 600,
              }}
            >
              <Home size={14} />
              <span>Inicio</span>
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: 'var(--brand-gold)', fontWeight: 700 }}>
              {currentCategory ? currentCategory.nombre : 'Catálogo Completo'}
            </span>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span
                  style={{
                    width: '24px',
                    height: '3px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #FF6B00 0%, #EF4444 100%)',
                  }}
                />
                <span
                  className="font-headline"
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    fontWeight: 800,
                    color: 'var(--brand-gold)',
                  }}
                >
                  COLECCIÓN OFICIAL
                </span>
              </div>
              <h1
                className="font-headline"
                style={{
                  fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
                  fontWeight: 900,
                  color: 'var(--text-white)',
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                {currentCategory ? currentCategory.nombre : 'Todas las Fundas'}
              </h1>
              {currentCategory?.descripcion && (
                <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '600px' }}>
                  {currentCategory.descripcion}
                </p>
              )}
            </div>

            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Total disponible:{' '}
              <strong style={{ color: 'var(--brand-gold)', fontWeight: 800 }}>
                {catalog.filteredProductos.length}
              </strong>{' '}
              {catalog.filteredProductos.length === 1 ? 'modelo' : 'modelos'}
            </span>
          </div>
        </div>
      </section>

      {/* Selector de Dispositivos / Modelo (BURGA / CASETiFY Pattern) */}
      <TiendaDeviceSelector
        productos={categoryProducts}
        selectedDeviceModel={catalog.selectedDeviceModel}
        onSelectDeviceModel={(modelName) => {
          catalog.setSelectedDeviceModel(modelName);
          catalog.setCurrentPage(1);
        }}
      />

      {/* Cápsula de Búsqueda y Filtros de Marca/Orden */}
      <TiendaSearchCapsule
        search={catalog.search}
        onSearchChange={(q) => {
          catalog.setSearch(q);
          catalog.setCurrentPage(1);
        }}
        onClearSearch={() => catalog.setSearch('')}
        marcas={marcas}
        selectedMarca={catalog.selectedMarca}
        onSelectMarca={(mId) => {
          catalog.setSelectedMarca(mId);
          catalog.setCurrentPage(1);
        }}
        sortBy={catalog.sortBy}
        onSelectSortBy={(s) => catalog.setSortBy(s)}
        onTriggerSearch={() => {
          const gridEl = document.getElementById('productos-grid');
          if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Barra de Conteo y Restablecimiento */}
      <section style={{ maxWidth: '1280px', margin: '0.9rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <div>
            Mostrando <strong style={{ color: 'var(--text-white)' }}>{catalog.filteredProductos.length}</strong> fundas
            {currentCategory && (
              <span> en <strong style={{ color: 'var(--brand-gold)' }}>{currentCategory.nombre}</strong></span>
            )}
            {catalog.selectedMarca !== 'ALL' && (
              <span> de <strong style={{ color: 'var(--brand-gold)' }}>{marcas.find((m) => String(m.idMarca) === String(catalog.selectedMarca))?.nombre}</strong></span>
            )}
            {catalog.selectedDeviceModel !== 'ALL' && (
              <span> para <strong style={{ color: 'var(--brand-gold)' }}>{catalog.selectedDeviceModel}</strong></span>
            )}
          </div>
          {(catalog.search || catalog.selectedMarca !== 'ALL' || catalog.selectedDeviceModel !== 'ALL' || catalog.sortBy !== 'featured') && (
            <button
              type="button"
              onClick={catalog.handleResetCatalog}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--brand-red)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Restablecer filtros
            </button>
          )}
        </div>
      </section>

      {/* Cuadrícula de Productos */}
      <main id="productos-grid" style={{ maxWidth: '1280px', margin: '1.2rem auto', padding: '0 1.4rem', width: '100%', flex: 1 }}>
        {catalog.filteredProductos.length === 0 ? (
          <div
            style={{
              padding: '3.5rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <RotateCcw size={34} opacity={0.35} color="var(--brand-gold)" />
            <h3 style={{ margin: 0, color: 'var(--text-white)', fontSize: '1.05rem', fontWeight: 700 }}>
              No se encontraron fundas con esos filtros
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              Intenta seleccionando otro modelo de celular o quitando los términos de búsqueda.
            </p>
            <button
              type="button"
              onClick={catalog.handleResetCatalog}
              className="apple-btn-tactile"
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                backgroundColor: 'var(--brand-gold)',
                color: '#111',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <>
            <div className="tienda-product-grid">
              {catalog.paginatedProductos.map((prod) => {
                const cartItem = cartItems.find((ci) => ci.idProducto === prod.idProducto);
                return (
                  <ProductoCard
                    key={prod.idProducto}
                    producto={prod}
                    onAddToCart={onAddToCart}
                    onOpenDetail={(p) => setSelectedProductForDetail(p)}
                    cartQuantity={cartItem?.cantidad || 0}
                  />
                );
              })}
            </div>

            {/* Paginación */}
            {catalog.totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  marginTop: '2.4rem',
                  paddingBottom: '1.5rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => catalog.setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={catalog.currentPage === 1}
                  className="apple-btn-tactile"
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    cursor: catalog.currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: catalog.currentPage === 1 ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: catalog.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => catalog.setCurrentPage(pageNum)}
                    className="apple-btn-tactile"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      border: pageNum === catalog.currentPage ? '1px solid var(--brand-gold)' : '1px solid var(--border-color)',
                      backgroundColor: pageNum === catalog.currentPage ? 'var(--brand-gold)' : 'var(--bg-card)',
                      color: pageNum === catalog.currentPage ? '#111' : 'var(--text-secondary)',
                      fontWeight: pageNum === catalog.currentPage ? 800 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => catalog.setCurrentPage((p) => Math.min(catalog.totalPages, p + 1))}
                  disabled={catalog.currentPage === catalog.totalPages}
                  className="apple-btn-tactile"
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    cursor: catalog.currentPage === catalog.totalPages ? 'not-allowed' : 'pointer',
                    opacity: catalog.currentPage === catalog.totalPages ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer con Índices */}
      <TiendaFooter categorias={categorias} />

      {/* Drawer de Carrito */}
      <CarritoDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onClearCart={onClearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Modal de Checkout WhatsApp */}
      <CheckoutWhatsAppModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Modal de Detalle de Producto para Clientes */}
      <ProductoDetalleModal
        producto={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

export default CategoriaProductosView;
