/**
 * Barrel Export Centralizado para el módulo de componentes de Tienda.
 * Permite importar componentes limpios desde '../components/tienda' con soporte para tree-shaking.
 */

// Layout
export { TiendaHeader } from './layout/TiendaHeader';
export { TiendaFooter } from './layout/TiendaFooter';

// Landing Page
export { TiendaLandingHero } from './landing/TiendaLandingHero';
export { TiendaEditorialFeatured } from './landing/TiendaEditorialFeatured';
export { FeaturedCaseCard } from './landing/FeaturedCaseCard';
export { TiendaCategoryGrid } from './landing/TiendaCategoryGrid';
export { TiendaSocialProof } from './landing/TiendaSocialProof';
export { TiendaManifesto } from './landing/TiendaManifesto';
export { TiendaTrustSignals } from './landing/TiendaTrustSignals';

// Catalog
export { TiendaDeviceSelector } from './catalog/TiendaDeviceSelector';
export { TiendaSearchCapsule } from './catalog/TiendaSearchCapsule';
export { ProductoCard } from './catalog/ProductoCard';

// Cart & Checkout
export { CarritoDrawer } from './cart/CarritoDrawer';
export { CarritoItem } from './cart/CarritoItem';
export { CheckoutWhatsAppModal } from './cart/CheckoutWhatsAppModal';

// Product Detail Modal & Subcomponents
export { ProductoDetalleModal } from './product-detail/ProductoDetalleModal';
export { ProductoGallery } from './product-detail/ProductoGallery';
export { ProductoVariantSelector } from './product-detail/ProductoVariantSelector';
export { ProductoPurchaseBar } from './product-detail/ProductoPurchaseBar';
