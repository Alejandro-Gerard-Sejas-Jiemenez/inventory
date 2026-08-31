import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageCircle,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import logoImg from '../assets/logo.png';
import { ProductoCard } from '../components/tienda/ProductoCard';
import { CarritoDrawer } from '../components/tienda/CarritoDrawer';
import { CheckoutWhatsAppModal } from '../components/tienda/CheckoutWhatsAppModal';

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
  const [search, setSearch] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('ALL');
  const [selectedMarca, setSelectedMarca] = useState('ALL');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc'

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

    // Filtro por categoría
    if (selectedCategoria !== 'ALL') {
      list = list.filter(
        (p) => String(p.categoria?.idCategoria) === String(selectedCategoria)
      );
    }

    // Filtro por marca
    if (selectedMarca !== 'ALL') {
      list = list.filter(
        (p) => String(p.modelo?.marca?.idMarca) === String(selectedMarca)
      );
    }

    // Filtro solo con stock disponible
    if (onlyInStock) {
      list = list.filter((p) => (p.stockActual ?? 0) > 0);
    }

    // Búsqueda por texto (nombre, modelo, marca, color)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        const nombre = p.nombre?.toLowerCase() || '';
        const modelo = p.modelo?.nombre?.toLowerCase() || '';
        const marca = p.modelo?.marca?.nombre?.toLowerCase() || '';
        const color = p.color?.nombre?.toLowerCase() || '';
        const categoria = p.categoria?.nombre?.toLowerCase() || '';
        return (
          nombre.includes(q) ||
          modelo.includes(q) ||
          marca.includes(q) ||
          color.includes(q) ||
          categoria.includes(q)
        );
      });
    }

    // Ordenamiento comercial
    if (sortBy === 'price-asc') {
      list.sort((a, b) => Number(a.precioUnitario) - Number(b.precioUnitario));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => Number(b.precioUnitario) - Number(a.precioUnitario));
    }

    return list;
  }, [productos, selectedCategoria, selectedMarca, onlyInStock, search, sortBy]);

  // Paginación calculada
  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / PAGE_SIZE));
  const paginatedProductos = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProductos.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProductos, currentPage, PAGE_SIZE]);

  const totalCartUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  }, [cartItems]);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleOrderSuccess = () => {
    onClearCart();
    setOrderSuccessMessage('¡Tu pedido ha sido enviado con éxito por WhatsApp! Nos contactaremos a la brevedad para coordinar la entrega.');
    setTimeout(() => setOrderSuccessMessage(''), 8000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#070A12',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245, 158, 11, 0.08), transparent 70%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Transparente con Cristal Esmerilado (Apple Translucent Chrome) */}
      <header
        className="apple-glass-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.8rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
          }}
        >
          {/* Logotipo Oficial con Micro-Interacción */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => {
              setSelectedCategoria('ALL');
              setSelectedMarca('ALL');
              setSearch('');
              setCurrentPage(1);
            }}
            className="apple-btn-tactile"
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={logoImg}
                alt="Los Caseritos Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <div>
              <h1
                className="apple-display-heading"
                style={{
                  margin: 0,
                  fontSize: '1.15rem',
                  color: '#FFFFFF',
                }}
              >
                LOS CASERITOS
              </h1>
              <span
                className="apple-label-small"
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--brand-gold)',
                  display: 'block',
                  marginTop: '-1px',
                }}
              >
                Catálogo Oficial
              </span>
            </div>
          </div>

          {/* Buscador Central Redondeado con Foco Fluido */}
          <div
            className="apple-search-bar"
            style={{
              flex: 1,
              maxWidth: '540px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '999px',
              padding: '0.2rem 0.5rem',
            }}
          >
            <Search
              size={16}
              style={{
                marginLeft: '0.6rem',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Buscar productos, modelos, marcas o colores..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'var(--text-white)',
                fontSize: '0.84rem',
                outline: 'none',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="apple-btn-tactile"
                style={{
                  marginRight: '0.4rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Acciones: Bolsa y Acceso Admin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Botón Mi Bolsa con Resorte Táctil */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="apple-btn-tactile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                backgroundColor: 'var(--brand-gold)',
                color: '#111',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: '0 2px 14px rgba(245, 158, 11, 0.28)',
              }}
            >
              <ShoppingBag size={16} />
              <span>Mi Bolsa</span>
              {totalCartUnits > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--brand-red)',
                    color: '#fff',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    padding: '0.1rem 0.42rem',
                    borderRadius: '999px',
                    marginLeft: '0.1rem',
                  }}
                >
                  {totalCartUnits}
                </span>
              )}
            </button>

            {/* Enlace al Panel Admin */}
            <button
              type="button"
              onClick={onGoToAdmin}
              className="apple-btn-tactile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.52rem 0.85rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Acceso restringido para administradores"
            >
              <LayoutDashboard size={14} />
              <span>Panel Admin</span>
            </button>
          </div>
        </div>
      </header>

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
            borderRadius: '14px',
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

      {/* Hero Banner Minimalista con Estilo Apple / Editorial */}
      <section style={{ maxWidth: '1280px', margin: '1.2rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div
          style={{
            padding: '1.8rem 2rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(26, 34, 53, 0.6) 0%, rgba(13, 17, 28, 0.8) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div
              className="apple-label-small"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.68rem',
                color: 'var(--brand-gold)',
                marginBottom: '0.4rem',
              }}
            >
              <Sparkles size={13} />
              <span>Catálogo Digital · Los Caseritos</span>
            </div>
            <h2
              className="apple-display-heading"
              style={{
                margin: '0 0 0.4rem 0',
                fontSize: '1.65rem',
                color: '#FFFFFF',
              }}
            >
              Elige tus productos y realiza tu pedido directo por WhatsApp
            </h2>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              Explora nuestra variedad multirubro con stock en tiempo real, agrégalos a tu bolsa y coordina tu despacho al instante.
            </p>
          </div>

          {/* Insignias de Confianza con Vidrio Esmerilado */}
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)' }}>
                <Truck size={16} />
              </div>
              <span>Despachos Rápidos</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)' }}>
                <ShieldCheck size={16} />
              </div>
              <span>Garantía Oficial</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)' }}>
                <MessageCircle size={16} />
              </div>
              <span>Atención 1 a 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación Segmentada de Categorías (Apple Segmented Style) */}
      <section style={{ maxWidth: '1280px', margin: '1.2rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div
          className="apple-segmented-container"
          style={{
            display: 'flex',
            gap: '0.4rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setSelectedCategoria('ALL');
              setCurrentPage(1);
            }}
            className="apple-pill-tab"
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              border: selectedCategoria === 'ALL' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
              backgroundColor: selectedCategoria === 'ALL' ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
              color: selectedCategoria === 'ALL' ? 'var(--brand-gold)' : 'var(--text-secondary)',
              fontWeight: selectedCategoria === 'ALL' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Todas las Categorías
          </button>

          {categorias.map((c) => {
            const isSelected = String(selectedCategoria) === String(c.idCategoria);
            return (
              <button
                key={c.idCategoria}
                type="button"
                onClick={() => {
                  setSelectedCategoria(c.idCategoria);
                  setCurrentPage(1);
                }}
                className="apple-pill-tab"
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '999px',
                  border: isSelected ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.18)' : 'transparent',
                  color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.nombre}
              </button>
            );
          })}
        </div>
      </section>

      {/* Barra de Filtros Secundarios y Conteo Óptico */}
      <section style={{ maxWidth: '1280px', margin: '0.9rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          {/* Conteo */}
          <div style={{ color: 'var(--text-secondary)' }}>
            Mostrando <strong style={{ color: '#FFFFFF' }}>{filteredProductos.length}</strong> productos
            {selectedCategoria !== 'ALL' && (
              <span> en <strong style={{ color: 'var(--brand-gold)' }}>{categorias.find((c) => String(c.idCategoria) === String(selectedCategoria))?.nombre}</strong></span>
            )}
          </div>

          {/* Selectores de Marca y Orden */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
            {marcas.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>Marca:</span>
                <select
                  value={selectedMarca}
                  onChange={(e) => {
                    setSelectedMarca(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    backgroundColor: 'rgba(10, 14, 23, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.76rem',
                    outline: 'none',
                  }}
                >
                  <option value="ALL">Todas las marcas</option>
                  {marcas.map((m) => (
                    <option key={m.idMarca} value={m.idMarca}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => {
                  setOnlyInStock(e.target.checked);
                  setCurrentPage(1);
                }}
                style={{ accentColor: 'var(--brand-gold)' }}
              />
              <span>Solo disponibles</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <SlidersHorizontal size={13} style={{ color: 'var(--text-muted)' }} />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: 'rgba(10, 14, 23, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.76rem',
                  outline: 'none',
                }}
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Productos con Tarjetas de Cristal */}
      <main style={{ maxWidth: '1280px', margin: '1.2rem auto', padding: '0 1.4rem', width: '100%', flex: 1 }}>
        {filteredProductos.length === 0 ? (
          <div
            style={{
              padding: '3.5rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(20, 27, 45, 0.4)',
              borderRadius: '20px',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
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
              onClick={() => {
                setSearch('');
                setSelectedCategoria('ALL');
                setSelectedMarca('ALL');
                setOnlyInStock(false);
              }}
              className="apple-btn-tactile"
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.25rem',
              }}
            >
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

            {/* Paginación Segmentada */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  marginTop: '2.2rem',
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
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: 'rgba(20, 27, 45, 0.6)',
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
                      border: pageNum === currentPage ? '1px solid var(--brand-gold)' : '1px solid rgba(255, 255, 255, 0.06)',
                      backgroundColor: pageNum === currentPage ? 'var(--brand-gold)' : 'rgba(20, 27, 45, 0.6)',
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
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: 'rgba(20, 27, 45, 0.6)',
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

      {/* Footer Minimalista */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          backgroundColor: 'rgba(7, 10, 18, 0.95)',
          padding: '1.5rem 1.4rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src={logoImg} alt="Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 700 }}>
              Los Caseritos · Catálogo Digital
            </span>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Los Caseritos. Todos los derechos reservados. Desarrollado por Alejandro Gerard Sejas.
          </div>
        </div>
      </footer>

      {/* Drawer Lateral del Carrito de Compras */}
      <CarritoDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onClearCart={onClearCart}
        onCheckout={handleOpenCheckout}
      />

      {/* Modal de Checkout y Envío a WhatsApp */}
      <CheckoutWhatsAppModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={handleBackToCart}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
