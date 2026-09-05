import React, { useState, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { TiendaHeader } from '../components/tienda/TiendaHeader';
import { TiendaLandingHero } from '../components/tienda/TiendaLandingHero';
import { TiendaEditorialFeatured } from '../components/tienda/TiendaEditorialFeatured';
import { TiendaCategoryGrid } from '../components/tienda/TiendaCategoryGrid';
import { TiendaSocialProof } from '../components/tienda/TiendaSocialProof';
import { TiendaManifesto } from '../components/tienda/TiendaManifesto';
import { TiendaTrustSignals } from '../components/tienda/TiendaTrustSignals';
import { TiendaFooter } from '../components/tienda/TiendaFooter';
import { ProductoDetalleModal } from '../components/tienda/ProductoDetalleModal';
import { CarritoDrawer } from '../components/tienda/CarritoDrawer';
import { CheckoutWhatsAppModal } from '../components/tienda/CheckoutWhatsAppModal';
import { useTiendaCatalog } from '../hooks/useTiendaCatalog';

/**
 * Vista Principal de la Tienda (Landing Page Oficial).
 * Enfocada exclusivamente en la presentación editorial de la marca Los Caseritos:
 * Hero fotográfico con fundas reales, colección destacada, cuadrícula de categorías centralizada,
 * pruebas sociales de clientes y pie de página con índices.
 */
export function CatalogoClienteView({
  productos = [],
  categorias = [],
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
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreFeatured = () => {
    const el = document.getElementById('destacados');
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
      {/* 1. Header Translúcido con Categorías */}
      <TiendaHeader
        theme={catalog.theme}
        onToggleTheme={catalog.toggleTheme}
        totalCartUnits={totalCartUnits}
        onOpenCart={() => setIsCartOpen(true)}
        onGoToAdmin={onGoToAdmin}
        onResetCatalog={catalog.handleResetCatalog}
        categorias={categorias}
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

      {/* 2. Hero Landing Oficial con Fotografía Real de Funda */}
      <TiendaLandingHero
        productos={productos}
        onExploreCatalog={handleExploreCatalog}
        onExploreFeatured={handleExploreFeatured}
      />

      {/* 3. Colección de Fundas Destacadas (Fotografías Reales) */}
      <TiendaEditorialFeatured
        productos={productos}
        onOpenDetail={(p) => setSelectedProductForDetail(p)}
        onExploreCatalog={handleExploreCatalog}
      />

      {/* 4. Cuadrícula de Categorías Centralizada (Sin "Todo" y solo categorías activas) */}
      <TiendaCategoryGrid
        categorias={categorias}
        selectedCategoria={catalog.selectedCategoria}
        onSelectCategoria={(catId) => catalog.setSelectedCategoria(catId)}
      />

      {/* 5. Reseñas y Calificaciones Reales de Clientes */}
      <TiendaSocialProof />

      {/* 6. Manifiesto de Marca Oficial */}
      <TiendaManifesto />

      {/* 7. Señales de Confianza y Calidad */}
      <TiendaTrustSignals />

      {/* 8. Footer Oficial con Índices */}
      <TiendaFooter categorias={categorias} />

      {/* 9. Drawer de Carrito */}
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

      {/* 10. Modal de Checkout WhatsApp */}
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

      {/* 11. Modal de Detalle de Producto para Clientes */}
      <ProductoDetalleModal
        producto={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

export default CatalogoClienteView;
