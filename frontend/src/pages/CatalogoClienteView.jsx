import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCw,
  LayoutDashboard,
  FolderTree,
} from 'lucide-react';
import { ProductoCard } from '../components/tienda/ProductoCard';
import { CarritoDrawer } from '../components/tienda/CarritoDrawer';
import { CheckoutWhatsAppModal } from '../components/tienda/CheckoutWhatsAppModal';
import { Pagination } from '../components/common/Pagination';

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

  // Paginación de la tienda (8 o 12 productos por página)
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

    // Filtro solo en stock
    if (onlyInStock) {
      list = list.filter((p) => (p.stockActual ?? 0) > 0);
    }

    // Filtro por búsqueda de texto
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.nombre?.toLowerCase().includes(q) ||
          p.modelo?.nombre?.toLowerCase().includes(q) ||
          p.modelo?.marca?.nombre?.toLowerCase().includes(q) ||
          p.categoria?.nombre?.toLowerCase().includes(q) ||
          p.color?.nombre?.toLowerCase().includes(q) ||
          p.descripcion?.toLowerCase().includes(q)
      );
    }

    // Ordenamiento
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.precioUnitario - b.precioUnitario);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.precioUnitario - a.precioUnitario);
    }

    return list;
  }, [productos, selectedCategoria, selectedMarca, onlyInStock, search, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredProductos.length / PAGE_SIZE);
  const paginatedProductos = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProductos.slice(start, start + PAGE_SIZE);
  }, [filteredProductos, currentPage]);

  const totalCartUnits = cartItems.reduce((acc, i) => acc + i.cantidad, 0);

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
    setOrderSuccessMessage('¡Tu pedido ha sido enviado con éxito por WhatsApp! Nos contactaremos a la brevedad.');
    setTimeout(() => setOrderSuccessMessage(''), 8000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Banner Informativo */}
      <div
        style={{
          backgroundColor: 'var(--brand-gold)',
          color: '#111',
          padding: '0.4rem 1rem',
          fontSize: '0.76rem',
          fontWeight: 700,
          textAlign: 'center',
          letterSpacing: '0.02em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.2rem',
        }}
      >
        <span>Envíos directos y garantizados a todo el país</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span>Atención y pedidos inmediatos por WhatsApp</span>
      </div>

      {/* Header Comercial E-Commerce */}
      <header
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0.85rem 1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo y Nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => { setSelectedCategoria('ALL'); setSearch(''); }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-gold)',
                color: '#111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.2rem',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}
            >
              C
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-white)', fontWeight: 800, lineHeight: 1.1 }}>
                LOS CASERITOS
              </h1>
              <span style={{ fontSize: '0.7rem', color: 'var(--brand-gold)', fontWeight: 600 }}>
                Catálogo Digital & Tienda
              </span>
            </div>
          </div>

          {/* Barra de Búsqueda Central */}
          <div
            style={{
              flex: 1,
              maxWidth: '520px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '0.85rem',
                color: 'var(--brand-gold)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Buscar por producto, modelo, marca o color..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.6rem',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-white)',
                fontSize: '0.86rem',
                outline: 'none',
                transition: 'var(--transition)',
              }}
              className="shein-search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Botones de Acción (Carrito y Acceso Admin) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Botón Carrito con Contador Flotante */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.55rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-gold)',
                color: '#111',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.15s ease',
              }}
            >
              <ShoppingBag size={18} />
              <span>Mi Bolsa</span>
              {totalCartUnits > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--brand-red)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '0.1rem 0.45rem',
                    borderRadius: 'var(--radius-sm)',
                    marginLeft: '0.2rem',
                  }}
                >
                  {totalCartUnits}
                </span>
              )}
            </button>

            {/* Enlace al Panel Administrador con Candado si no está autenticado */}
            <button
              type="button"
              onClick={onGoToAdmin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              title="Acceso restringido para administradores"
            >
              <LayoutDashboard size={16} />
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
            padding: '0.85rem 1.2rem',
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

      {/* Hero Banner Comercial Promocional */}
      <section style={{ maxWidth: '1280px', margin: '1.2rem auto 0', padding: '0 1.2rem', width: '100%' }}>
        <div
          style={{
            padding: '2rem 1.8rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(220, 38, 38, 0.12) 50%, var(--bg-card) 100%)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.76rem',
                fontWeight: 800,
                color: 'var(--brand-gold)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '0.6rem',
              }}
            >
              <Sparkles size={13} />
              CATÁLOGO OFICIAL ACTUALIZADO EN TIEMPO REAL
            </span>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', color: 'var(--text-white)', fontWeight: 900 }}>
              Explora Nuestro Catálogo Multirubro
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Selecciona los productos que deseas, agrégalos a tu bolsa y haz tu pedido directamente por WhatsApp para coordinar el envío de inmediato.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              <Truck size={18} style={{ color: 'var(--brand-gold)' }} />
              <span>Despachos Rápidos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--brand-gold)' }} />
              <span>Garantía de Calidad</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              <RefreshCw size={18} style={{ color: 'var(--brand-gold)' }} />
              <span>Stock Verificado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Categorías Horizontal Estilo Shein / Miranda */}
      <section style={{ maxWidth: '1280px', margin: '1.2rem auto 0', padding: '0 1.2rem', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
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
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-sm)',
              border: selectedCategoria === 'ALL' ? '1px solid var(--brand-gold)' : '1px solid var(--border-color)',
              backgroundColor: selectedCategoria === 'ALL' ? 'var(--brand-gold-bg)' : 'var(--bg-card)',
              color: selectedCategoria === 'ALL' ? 'var(--brand-gold)' : 'var(--text-secondary)',
              fontWeight: selectedCategoria === 'ALL' ? 700 : 500,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition)',
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
                  padding: '0.55rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '1px solid var(--brand-gold)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--brand-gold-bg)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--brand-gold)' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)',
                }}
              >
                {c.nombre}
              </button>
            );
          })}
        </div>
      </section>

      {/* Contenido Principal: Filtros Secundarios y Cuadrícula de Productos */}
      <main style={{ maxWidth: '1280px', margin: '1rem auto 2rem', padding: '0 1.2rem', width: '100%', flex: 1 }}>
        {/* Barra de Filtros Secundarios */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
            marginBottom: '1.2rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Filtro por Marca */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Marca:</span>
              <select
                value={selectedMarca}
                onChange={(e) => {
                  setSelectedMarca(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '0.35rem 0.65rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-white)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  cursor: 'pointer',
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

            {/* Checkbox solo en stock */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => {
                  setOnlyInStock(e.target.checked);
                  setCurrentPage(1);
                }}
                style={{ accentColor: 'var(--brand-gold)', cursor: 'pointer' }}
              />
              <span>Solo disponibles con stock</span>
            </label>
          </div>

          {/* Ordenamiento y Contador */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ordenar:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.35rem 0.65rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-white)',
                  fontSize: '0.8rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Menor Precio</option>
                <option value="price-desc">Mayor Precio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Productos Estilo Shein / Miranda */}
        {filteredProductos.length === 0 ? (
          <div
            style={{
              padding: '4rem 1rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}
          >
            <FolderTree size={40} opacity={0.4} style={{ marginBottom: '0.8rem' }} />
            <h3 style={{ color: 'var(--text-white)', margin: '0 0 0.4rem 0', fontSize: '1.1rem' }}>
              No se encontraron productos
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              Intenta cambiar los filtros seleccionados o el término de búsqueda.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {paginatedProductos.map((prod) => {
              const cartItem = cartItems.find((ci) => ci.idProducto === prod.idProducto);
              return (
                <ProductoCard
                  key={prod.idProducto}
                  producto={prod}
                  cartQuantity={cartItem?.cantidad || 0}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div style={{ marginTop: '2rem' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      {/* Footer Público de la Tienda */}
      <footer
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-color)',
          padding: '1.5rem 1.2rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <strong style={{ color: 'var(--text-white)' }}>LOS CASERITOS · Sistema de Pedidos y Catálogo Oficial</strong>
          <span>Atención al cliente y confirmaciones directas por WhatsApp</span>
        </div>
      </footer>

      {/* Drawer Lateral de Carrito */}
      <CarritoDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onClearCart={onClearCart}
        onProceedToCheckout={handleOpenCheckout}
      />

      {/* Modal de Checkout por WhatsApp */}
      <CheckoutWhatsAppModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onBackToCart={handleBackToCart}
        onSuccessOrder={handleOrderSuccess}
      />
    </div>
  );
}
