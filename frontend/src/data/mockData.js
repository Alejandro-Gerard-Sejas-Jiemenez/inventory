/**
 * Datos Mockup de Prueba y Semilla
 * Aislados completamente de la lógica y vistas de componentes.
 */

export const MOCK_MODELOS = [
  { idModelo: 1, nombre: 'MacBook Pro 14 M3', marca: 'Apple', descripcion: 'Portátil profesional con chip M3' },
  { idModelo: 2, nombre: 'XPS 15 InfinityEdge', marca: 'Dell', descripcion: 'Pantalla OLED 4K y procesador i9' },
  { idModelo: 3, nombre: 'ThinkPad X1 Carbon', marca: 'Lenovo', descripcion: 'Ultra liviano y chasis de carbono' },
  { idModelo: 4, nombre: 'Galaxy S24 Ultra', marca: 'Samsung', descripcion: 'Smartphone con S-Pen y cámara 200MP' },
  { idModelo: 5, nombre: 'AirPods Pro 2da Gen', marca: 'Apple', descripcion: 'Cancelación de ruido activa H2' },
];

export const MOCK_MATERIALES = [
  { idMaterial: 1, nombre: 'Aluminio Aeroespacial', descripcion: 'Estructura unibody de alta disipación' },
  { idMaterial: 2, nombre: 'Fibra de Carbono', descripcion: 'Máxima ligereza y resistencia a impactos' },
  { idMaterial: 3, nombre: 'Titanio Grado 5', descripcion: 'Acabado premium anticorrosivo' },
  { idMaterial: 4, nombre: 'Cristal Templado Ceramic Shield', descripcion: 'Protección contra rayaduras y caídas' },
];

export const MOCK_COLORES = [
  { idColor: 1, nombre: 'Gris Espacial', codigoHex: '#4B5563' },
  { idColor: 2, nombre: 'Plata Estelar', codigoHex: '#E2E8F0' },
  { idColor: 3, nombre: 'Negro Medianoche', codigoHex: '#111827' },
  { idColor: 4, nombre: 'Oro Caserito', codigoHex: '#F59E0B' },
  { idColor: 5, nombre: 'Rojo Carmesí', codigoHex: '#EF4444' },
];

export const MOCK_PROVEEDORES = [
  {
    idProveedor: 1,
    nombre: 'Tech Global Distribution SRL',
    contacto: 'Ing. Carlos Morales',
    telefono: '+591 71234567',
    email: 'contacto@techglobal.com',
    direccion: 'Av. América #1240, Cochabamba',
  },
  {
    idProveedor: 2,
    nombre: 'Importadora & Mayorista Los Andes',
    contacto: 'Lic. Mariana Fernández',
    telefono: '+591 78901234',
    email: 'ventas@losandesimport.com',
    direccion: 'Calle Comercio #560, La Paz',
  },
];

export const MOCK_CLIENTES = [
  {
    idCliente: 1,
    nombre: 'Empresa Constructora Alpha',
    telefono: '+591 76543210',
    email: 'adquisiciones@constructora-alpha.bo',
    direccion: 'Av. Las Palmas #320, Santa Cruz',
  },
  {
    idCliente: 2,
    nombre: 'Dr. Roberto Suárez',
    telefono: '+591 70123456',
    email: 'rsuarez@gmail.com',
    direccion: 'Zona Sur, Calle 15 #89, La Paz',
  },
];

export const MOCK_PRODUCTOS = [
  {
    idProducto: 1,
    sku: 'LAP-MBP14-M3-GRIS',
    nombre: 'MacBook Pro 14" M3 Pro 512GB',
    descripcion: 'Portátil de alta gama con pantalla Liquid Retina XDR de 14.2 pulgadas',
    modelo: MOCK_MODELOS[0],
    material: MOCK_MATERIALES[0],
    color: MOCK_COLORES[0],
    precioCompra: 12500.0,
    precioMayoreo: 14200.0,
    precioUnitario: 15499.0,
    stockActual: 12,
    stockMinimo: 4,
  },
  {
    idProducto: 2,
    sku: 'LAP-DELL-XPS15-OLED',
    nombre: 'Dell XPS 15 9530 i9 32GB 1TB',
    descripcion: 'Laptop para edición de video y renderizado 3D profesional',
    modelo: MOCK_MODELOS[1],
    material: MOCK_MATERIALES[1],
    color: MOCK_COLORES[2],
    precioCompra: 11800.0,
    precioMayoreo: 13500.0,
    precioUnitario: 14800.0,
    stockActual: 3,
    stockMinimo: 5,
  },
  {
    idProducto: 3,
    sku: 'TEL-S24U-TITANIO-ORO',
    nombre: 'Samsung Galaxy S24 Ultra 512GB',
    descripcion: 'Procesador Snapdragon 8 Gen 3 for Galaxy, cámara 200MP y S-Pen',
    modelo: MOCK_MODELOS[3],
    material: MOCK_MATERIALES[2],
    color: MOCK_COLORES[3],
    precioCompra: 6800.0,
    precioMayoreo: 7600.0,
    precioUnitario: 8400.0,
    stockActual: 18,
    stockMinimo: 5,
  },
];

export const MOCK_DASHBOARD_STATS = {
  totalProductos: 3,
  productosBajoStock: 1,
  totalVentas: 15,
  totalVentasMonto: 45200.0,
  totalCompras: 8,
  totalComprasMonto: 89400.0,
  totalModelos: 5,
  totalProveedores: 2,
  totalClientes: 2,
  totalMovimientos: 24,
};
