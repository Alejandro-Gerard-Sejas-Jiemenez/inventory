import React, { useState, useMemo } from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { TiendaHeader } from '../components/tienda/TiendaHeader';
import { TiendaHeroLanding } from '../components/tienda/TiendaHeroLanding';
import { TiendaCategoryNav } from '../components/tienda/TiendaCategoryNav';
import { TiendaSearchCapsule } from '../components/tienda/TiendaSearchCapsule';
import { TiendaFooter } from '../components/tienda/TiendaFooter';
import { ProductoCard } from '../components/tienda/ProductoCard';
import { ProductoDetalleModal } from '../components/tienda/ProductoDetalleModal';
import { CarritoDrawer } from '../components/tienda/CarritoDrawer';
import { CheckoutWhatsAppModal } from '../components/tienda/CheckoutWhatsAppModal';
import { useTiendaCatalog } from '../hooks/useTiendaCatalog';

/**
 * Vista Principal del Catálogo de Clientes (E-commerce).
 * Responsabilidad única: Presentación y composición de la tienda pública.
 */
export function CatalogoClienteView({
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
  const catalog = useTiendaCatalog(productos);

  // Control de Modales (Carrito, Checkout y Detalle de Producto)
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

  const handleExploreCatalog = () => {
    const el = document.getElementById('productos-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      data-theme={catalog.theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        backgroundImage:
          catalog.theme === 'light'
            ? 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(239, 68, 68, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.05) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(239, 68, 68, 0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* 1. Header Translúcido */}
      <TiendaHeader
        theme={catalog.theme}
        onToggleTheme={catalog.toggleTheme}
        totalCartUnits={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onGoToAdmin={onGoToAdmin}
        onResetCatalog={catalog.handleResetCatalog}
      />

      {/* Alerta de Pedido Exitoso */}
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

      {/* 2. Hero Landing Page inspirada en VGOM */}
      <TiendaHeroLanding
        onExploreCatalog={handleExploreCatalog}
        onOpenWhatsAppCheckout={() => {
          if (cartItems.length > 0) {
            setIsCheckoutOpen(true);
          } else {
            handleExploreCatalog();
          }
        }}
      />

      {/* 3. Barra de Navegación Centrada por Categorías Activas */}
      <TiendaCategoryNav
        categorias={categorias}
        selectedCategoria={catalog.selectedCategoria}
        onSelectCategoria={(catId) => {
          catalog.setSelectedCategoria(catId);
          catalog.setCurrentPage(1);
        }}
      />

      {/* 3. Cápsula de Búsqueda y Filtros de Marca/Orden */}
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

      {/* 4. Barra de Conteo y Restablecimiento */}
      <section style={{ maxWidth: '1280px', margin: '0.9rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <div>
            Mostrando <strong style={{ color: 'var(--text-white)' }}>{catalog.filteredProductos.length}</strong> productos
            {catalog.selectedCategoria !== 'ALL' && (
              <span> en <strong style={{ color: 'var(--brand-gold)' }}>{categorias.find((c) => String(c.idCategoria) === String(catalog.selectedCategoria))?.nombre}</strong></span>
            )}
            {catalog.selectedMarca !== 'ALL' && (
              <span> de <strong style={{ color: 'var(--brand-gold)' }}>{marcas.find((m) => String(m.idMarca) === String(catalog.selectedMarca))?.nombre}</strong></span>
            )}
          </div>
          {(catalog.search || catalog.selectedMarca !== 'ALL' || catalog.selectedCategoria !== 'ALL' || catalog.sortBy !== 'featured') && (
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

      {/* 5. Grid de Productos */}
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
              No se encontraron productos coincidentes
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              Intenta cambiando la categoría o ajustando los filtros de búsqueda.
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

      {/* 6. Footer */}
      <TiendaFooter />

      {/* 7. Drawer de Carrito */}
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

      {/* 8. Modal de Checkout WhatsApp */}
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

      {/* 9. Modal de Detalle de Producto para Clientes */}
      <ProductoDetalleModal
        producto={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
