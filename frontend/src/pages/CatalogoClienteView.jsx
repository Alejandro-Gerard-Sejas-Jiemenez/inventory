import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  Sun,
  Moon,
  ArrowRight,
  Zap,
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
  const [onlyInStock, setOnlyInStock] = useState(false);
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
    setOrderSuccessMessage('¡Tu pedido ha sido enviado con éxito por WhatsApp! Nos contactaremos de inmediato para coordinar la entrega.');
    setTimeout(() => setOrderSuccessMessage(''), 8000);
  };

  return (
    <div
      data-theme={theme}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      {/* Header Translúcido Estilo Apple Liquid Glass */}
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
            padding: '0.85rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
          }}
        >
          {/* Emblema Oficial de la Empresa Resaltado */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => {
              setSelectedCategoria('ALL');
              setSelectedMarca('ALL');
              setSearch('');
              setCurrentPage(1);
            }}
            className="apple-btn-tactile"
          >
            <div className="brand-logo-badge">
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
                  fontSize: '1.2rem',
                  color: 'var(--text-white)',
                  letterSpacing: '0.04em',
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
                Catálogo Oficial & Tienda
              </span>
            </div>
          </div>

          {/* Buscador Central Apple con Borde Especular */}
          <div
            className="apple-search-bar"
            style={{
              flex: 1,
              maxWidth: '520px',
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
              className="apple-search-input"
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
                color: 'var(--input-text)',
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

          {/* Acciones: Toggle de Tema, Bolsa y Acceso Admin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            {/* Toggle de Tema Claro / Oscuro */}
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn apple-btn-tactile"
              title={theme === 'dark' ? 'Cambiar a Tema Claro' : 'Cambiar a Tema Oscuro'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Botón Mi Bolsa */}
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
                boxShadow: '0 2px 14px var(--brand-gold-glow)',
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
                padding: '0.52rem 0.9rem',
                borderRadius: '999px',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-white)',
                border: '1px solid var(--border-color)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
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

      {/* Bento Grid Showcase Arquitectura Espacial (Liquid Glass + Spatial UI) */}
      <section style={{ maxWidth: '1280px', margin: '1.4rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div className="bento-grid">
          {/* Tarjeta Principal Bento Hero */}
          <div className="bento-card-main">
            <div
              className="apple-label-small"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.7rem',
                color: 'var(--brand-gold)',
                marginBottom: '0.6rem',
              }}
            >
              <Sparkles size={14} />
              <span>Experiencia de Compra Digital · Los Caseritos</span>
            </div>
            <h2
              className="apple-hero-title"
              style={{
                margin: '0 0 0.6rem 0',
                fontSize: '1.85rem',
                color: 'var(--text-white)',
              }}
            >
              Elige tus productos y pide directamente por WhatsApp
            </h2>
            <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '520px' }}>
              Catálogo multirubro con stock disponible en tiempo real. Agrega a tu bolsa y coordinamos tu despacho de inmediato.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  const gridEl = document.getElementById('productos-grid');
                  if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--brand-gold)',
                  color: '#111',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px var(--brand-gold-glow)',
                }}
              >
                <span>Explorar Catálogo</span>
                <ArrowRight size={15} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                <Zap size={14} style={{ color: 'var(--brand-gold)' }} />
                <span>Respuesta Inmediata</span>
              </div>
            </div>
          </div>

          {/* Sub-Tarjetas Bento en Columna */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Tile 1: Despachos y Cobertura */}
            <div className="bento-card-sub">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-gold)',
                  }}
                >
                  <Truck size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-white)', fontWeight: 700 }}>
                    Envíos Garantizados
                  </h4>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Despachos rápidos y seguros a nivel nacional
                  </span>
                </div>
              </div>
            </div>

            {/* Tile 2: Garantía Oficial Caseritos */}
            <div className="bento-card-sub">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-red)',
                  }}
                >
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-white)', fontWeight: 700 }}>
                    Garantía Los Caseritos
                  </h4>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                    Atención personalizada 1 a 1 en cada compra
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación Segmentada de Categorías Apple Segmented Control */}
      <section style={{ maxWidth: '1280px', margin: '1.4rem auto 0', padding: '0 1.4rem', width: '100%' }}>
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

      {/* Barra de Filtros Secundarios y Conteo de Resultados */}
      <section style={{ maxWidth: '1280px', margin: '0.9rem auto 0', padding: '0 1.4rem', width: '100%' }}>
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          {/* Conteo de Resultados */}
          <div style={{ color: 'var(--text-secondary)' }}>
            Mostrando <strong style={{ color: 'var(--text-white)' }}>{filteredProductos.length}</strong> productos
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
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
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
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
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

      {/* Grid de Productos con Tarjetas Apple Liquid Glass */}
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
              onClick={() => {
                setSearch('');
                setSelectedCategoria('ALL');
                setSelectedMarca('ALL');
                setOnlyInStock(false);
              }}
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.3rem',
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

      {/* Footer Minimalista Apple */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          padding: '1.5rem 1.4rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src={logoImg} alt="Logo" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-white)', fontWeight: 700 }}>
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
