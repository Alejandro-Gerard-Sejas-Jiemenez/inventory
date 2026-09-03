import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Layers,
  ArrowLeftRight,
  Database,
  FileText,
} from 'lucide-react';

/**
 * Elementos de Navegación del Sidebar
 */
export const SIDEBAR_MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badgeKey: null },
  { id: 'productos', label: 'Productos & Stock', icon: Package, badgeKey: 'totalProductos' },
  { id: 'ventas', label: 'Ventas', icon: ShoppingCart, badgeKey: 'totalVentas' },
  { id: 'compras', label: 'Compras & Proveedores', icon: Truck, badgeKey: 'totalProveedores' },
  { id: 'catalogos', label: 'Catálogos & Atributos', icon: Layers, badgeKey: 'totalModelos' },
  { id: 'movimientos', label: 'Kardex / Movimientos', icon: ArrowLeftRight, badgeKey: null },
  { id: 'bitacora', label: 'Bitácora del Sistema', icon: FileText, badgeKey: null },
  { id: 'database', label: 'Esquema BD (18 Tablas)', icon: Database, badgeKey: null },
];
