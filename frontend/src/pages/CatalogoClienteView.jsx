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

  // Paginación de la tienda (8 productos por página para navegación ágil)
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Comercial E-Commerce (Inspirado en Shein / Importadora Miranda) */}
      <header
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.75rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
          }}
        >
          {/* Logo Oficial de la Empresa y Nombre de Marca */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}
            onClick={() => {
              setSelectedCategoria('ALL');
              setSelectedMarca('ALL');
              setSearch('');
              setCurrentPage(1);
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
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
                style={{
                  margin: 0,
                  fontSize: '1.15rem',
                  color: 'var(--text-white)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                LOS CASERITOS
              </h1>
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--brand-gold)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Tienda Oficial
              </span>
            </div>
          </div>

          {/* Barra de Búsqueda Central con Estilo Redondeado Moderno */}
          <div
            style={{
              flex: 1,
              maxWidth: '560px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '1rem',
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
                padding: '0.65rem 1rem 0.65rem 2.8rem',
                backgroundColor: 'rgba(11, 15, 25, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                color: 'var(--text-white)',
                fontSize: '0.84rem',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              className="shein-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Acciones: Bolsa de Compras y Botón Admin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            {/* Botón Mi Bolsa */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 1rem',
                borderRadius: '999px',
                backgroundColor: 'var(--brand-gold)',
                color: '#111',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(245, 158, 11, 0.25)',
                transition: 'transform 0.15s ease',
              }}
            >
              <ShoppingBag size={17} />
              <span>Mi Bolsa</span>
              {totalCartUnits > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--brand-red)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    padding: '0.12rem 0.45rem',
                    borderRadius: '999px',
                    marginLeft: '0.15rem',
                  }}
                >
                  {totalCartUnits}
                </span>
              )}
            </button>

            {/* Enlace al Panel Administrador */}
            <button
              type="button"
              onClick={onGoToAdmin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.85rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              title="Acceso restringido para administradores"
            >
              <LayoutDashboard size={15} />
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
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <ShieldCheck size={18} />
          <span>{orderSuccessMessage}</span>
        </div>
      )}

      {/* Hero Banner Boutique (Compacto y Elegante estilo Miranda/Shein) */}
      <section style={{ maxWidth: '1280px', margin: '1rem auto 0', padding: '0 1.25rem', width: '100%' }}>
        <div
          style={{
            padding: '1.4rem 1.6rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.2rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          }}
        >
          <div style={{ maxWidth: '620px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.7rem',
                fontWeight: 800,
                color: 'var(--brand-gold)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
              }}
            >
              <Sparkles size={13} />
              <span>Colección Oficial & Multirubro</span>
            </div>
            <h2
              style={{
                margin: '0 0 0.35rem 0',
                fontSize: '1.45rem',
                color: 'var(--text-white)',
                fontWeight: 800,
                letterSpacing: '-0.01em',
              }}
            >
              Elige tus productos y pide directamente por WhatsApp
            </h2>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              Agrega los artículos a tu bolsa virtual y despacharemos tu orden de inmediato con atención personalizada.
            </p>
          </div>

          {/* Micro Insignias de Confianza */}
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <Truck size={16} style={{ color: 'var(--brand-gold)' }} />
              <span>Envíos Rápidos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <ShieldCheck size={16} style={{ color: 'var(--brand-gold)' }} />
              <span>Garantía Oficial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 600 }}>
              <MessageCircle size={16} style={{ color: 'var(--brand-gold)' }} />
              <span>Atención 1 a 1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Categorías Horizontal Estilo Shein / Miranda (Pill Tabs) */}
      <section style={{ maxWidth: '1280px', margin: '1rem auto 0', padding: '0 1.25rem', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.45rem',
            overflowX: 'auto',
            paddingBottom: '0.3rem',
            scrollbarWidth: 'none',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setSelectedCategoria('ALL');
              setCurrentPage(1);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '999px',
              border: selectedCategoria === 'ALL' ? '1px solid var(--brand-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: selectedCategoria === 'ALL' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.6)',
              color: selectedCategoria === 'ALL' ? 'var(--brand-gold)' : 'var(--text-secondary)',
              fontWeight: selectedCategoria === 'ALL' ? 700 : 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
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
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  border: isSelected ? '1px solid var(--brand-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                  color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {c.nombre}
              </button>
            );
          })}
        </div>
      </section>

      {/* Barra de Filtros Secundarios y Conteo de Resultados */}
      <section style={{ maxWidth: '1280px', margin: '0.8rem auto 0', padding: '0 1.25rem', width: '100%' }}>
        <div
          style={{
            padding: '0.65rem 1rem',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          {/* Contador de Productos */}
          <div style={{ color: 'var(--text-secondary)' }}>
            Mostrando <strong style={{ color: 'var(--text-white)' }}>{filteredProductos.length}</strong> productos
            {selectedCategoria !== 'ALL' && (
              <span> en <strong style={{ color: 'var(--brand-gold)' }}>{categorias.find((c) => String(c.idCategoria) === String(selectedCategoria))?.nombre}</strong></span>
            )}
          </div>

          {/* Filtros de Marca, Disponibilidad y Orden */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            {/* Selector de Marca */}
            {marcas.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Marca:</span>
                <select
                  value={selectedMarca}
                  onChange={(e) => {
                    setSelectedMarca(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.78rem',
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

            {/* Checkbox solo con stock */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
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

            {/* Ordenamiento por Precio */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.78rem',
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

      {/* Grid de Productos (Catálogo E-Commerce) */}
      <main style={{ maxWidth: '1280px', margin: '1.2rem auto', padding: '0 1.25rem', width: '100%', flex: 1 }}>
        {filteredProductos.length === 0 ? (
          <div
            style={{
              padding: '3.5rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(30, 41, 59, 0.4)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <RotateCcw size={36} opacity={0.35} color="var(--brand-gold)" />
            <h3 style={{ margin: 0, color: 'var(--text-white)', fontSize: '1.1rem' }}>
              No se encontraron productos coincidentes
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Prueba cambiando la categoría, los filtros de marca o borrando el término de búsqueda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategoria('ALL');
                setSelectedMarca('ALL');
                setOnlyInStock(false);
              }}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.2rem',
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

            {/* Paginación de la Tienda */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  marginTop: '2rem',
                  paddingBottom: '1rem',
                }}
              >
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    color: 'var(--text-primary)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.4 : 1,
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
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: 'var(--radius-sm)',
                      border: pageNum === currentPage ? '1px solid var(--brand-gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: pageNum === currentPage ? 'var(--brand-gold)' : 'rgba(30, 41, 59, 0.6)',
                      color: pageNum === currentPage ? '#111' : 'var(--text-secondary)',
                      fontWeight: pageNum === currentPage ? 800 : 500,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(30, 41, 59, 0.6)',
                    color: 'var(--text-primary)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    opacity: currentPage === totalPages ? 0.4 : 1,
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

      {/* Footer de la Tienda Pública */}
      <footer
        style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(11, 15, 25, 0.95)',
          padding: '1.5rem 1.25rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src={logoImg} alt="Logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span style={{ fontSize: '0.84rem', color: 'var(--text-white)', fontWeight: 700 }}>
              Los Caseritos · Catálogo Digital
            </span>
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
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
