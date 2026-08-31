import React, { useState, useMemo, useEffect } from 'react';
import { ShieldCheck, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { TiendaHeader } from '../components/tienda/TiendaHeader';
import { TiendaCategoryNav } from '../components/tienda/TiendaCategoryNav';
import { TiendaSearchCapsule } from '../components/tienda/TiendaSearchCapsule';
import { TiendaFooter } from '../components/tienda/TiendaFooter';
import { ProductoCard } from '../components/tienda/ProductoCard';
import { CarritoDrawer } from '../components/tienda/CarritoDrawer';
import { CheckoutWhatsAppModal } from '../components/tienda/CheckoutWhatsAppModal';

/**
 * Vista Principal del Catálogo de Clientes (E-commerce).
 * Responsabilidad: Orquestación del catálogo, filtrado reactivo de productos y paginación.
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
  // Estado de Tema Claro / Oscuro
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('caseritos_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('caseritos_theme', nextTheme);
    } catch {
      // Ignorar error
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [search, setSearch] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('ALL');
  const [selectedMarca, setSelectedMarca] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  // Control del Drawer del Carrito y Modal WhatsApp
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccessMessage, setOrderSuccessMessage] = useState('');

  // Paginación de la tienda
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Filtrado reactivo de productos
  const filteredProductos = useMemo(() => {
    let list = [...productos].filter((p) => p.activo !== false);

    if (selectedCategoria !== 'ALL') {
      list = list.filter((p) => String(p.categoria?.idCategoria) === String(selectedCategoria));
    }

    if (selectedMarca !== 'ALL') {
      list = list.filter((p) => String(p.modelo?.marca?.idMarca) === String(selectedMarca));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        const nombre = p.nombre?.toLowerCase() || '';
        const modelo = p.modelo?.nombre?.toLowerCase() || '';
        const marca = p.modelo?.marca?.nombre?.toLowerCase() || '';
        const color = p.color?.nombre?.toLowerCase() || '';
        const material = p.material?.nombre?.toLowerCase() || '';
        const categoria = p.categoria?.nombre?.toLowerCase() || '';
        return (
          nombre.includes(q) ||
          modelo.includes(q) ||
          marca.includes(q) ||
          color.includes(q) ||
          material.includes(q) ||
          categoria.includes(q)
        );
      });
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => Number(a.precioUnitario) - Number(b.precioUnitario));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => Number(b.precioUnitario) - Number(a.precioUnitario));
    }

    return list;
  }, [productos, selectedCategoria, selectedMarca, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / PAGE_SIZE));
  const paginatedProductos = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProductos.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProductos, currentPage, PAGE_SIZE]);

  const totalCartUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  }, [cartItems]);

  const handleResetCatalog = () => {
    setSelectedCategoria('ALL');
    setSelectedMarca('ALL');
    setSearch('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const handleOrderSuccess = () => {
    onClearCart();
    setOrderSuccessMessage('¡Tu pedido ha sido enviado con éxito por WhatsApp! Nos contactaremos de inmediato para coordinar la entrega.');
    setTimeout(() => setOrderSuccessMessage(''), 8000);
  };

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        backgroundImage:
          theme === 'light'
            ? 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(239, 68, 68, 0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.05) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 50% 100%, rgba(239, 68, 68, 0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 60% 40% at 15% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 60%)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background 0.3s ease, color 0.3s ease',
      }}
    >
      {/* 1. Header Translúcido Apple Liquid Glass */}
      <TiendaHeader
        theme={theme}
        onToggleTheme={toggleTheme}
        totalCartUnits={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onGoToAdmin={onGoToAdmin}
        onResetCatalog={handleResetCatalog}
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

      {/* 2. Barra de Navegación por Categorías Estilo Airbnb */}
      <TiendaCategoryNav
        categorias={categorias}
        selectedCategoria={selectedCategoria}
        onSelectCategoria={(catId) => {
          setSelectedCategoria(catId);
          setCurrentPage(1);
        }}
      />

      {/* 3. Cápsula de Búsqueda y Filtros de Marca/Orden */}
      <TiendaSearchCapsule
        search={search}
        onSearchChange={(q) => {
          setSearch(q);
          setCurrentPage(1);
        }}
        onClearSearch={() => setSearch('')}
        marcas={marcas}
        selectedMarca={selectedMarca}
        onSelectMarca={(mId) => {
          setSelectedMarca(mId);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSelectSortBy={(s) => setSortBy(s)}
        onTriggerSearch={() => {
          const gridEl = document.getElementById('productos-grid');
          if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Barra de Conteo y Restablecimiento */}
      <section style={{ maxWidth: '1280px', margin: '0.9rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <div>
            Mostrando <strong style={{ color: 'var(--text-white)' }}>{filteredProductos.length}</strong> productos
            {selectedCategoria !== 'ALL' && (
              <span> en <strong style={{ color: 'var(--brand-gold)' }}>{categorias.find((c) => String(c.idCategoria) === String(selectedCategoria))?.nombre}</strong></span>
            )}
            {selectedMarca !== 'ALL' && (
              <span> de <strong style={{ color: 'var(--brand-gold)' }}>{marcas.find((m) => String(m.idMarca) === String(selectedMarca))?.nombre}</strong></span>
            )}
          </div>
          {(search || selectedMarca !== 'ALL' || selectedCategoria !== 'ALL' || sortBy !== 'featured') && (
            <button
              type="button"
              onClick={handleResetCatalog}
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
        {filteredProductos.length === 0 ? (
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
              onClick={handleResetCatalog}
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
              {paginatedProductos.map((prod) => {
                const cartItem = cartItems.find((ci) => ci.idProducto === prod.idProducto);
                return (
                  <ProductoCard
                    key={prod.idProducto}
                    producto={prod}
                    onAddToCart={onAddToCart}
                    cartQuantity={cartItem?.cantidad || 0}
                  />
                );
              })}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
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
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="apple-btn-tactile"
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.35 : 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className="apple-btn-tactile"
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      border: pageNum === currentPage ? '1px solid var(--brand-gold)' : '1px solid var(--border-color)',
                      backgroundColor: pageNum === currentPage ? 'var(--brand-gold)' : 'var(--bg-card)',
                      color: pageNum === currentPage ? '#111' : 'var(--text-secondary)',
                      fontWeight: pageNum === currentPage ? 800 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="apple-btn-tactile"
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.35 : 1,
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

      {/* 6. Footer Minimalista */}
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
    </div>
  );
}
