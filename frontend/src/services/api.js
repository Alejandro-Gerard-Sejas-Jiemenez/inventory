const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8089/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `Error: ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
      if (errorData.validationErrors) {
        const details = Object.entries(errorData.validationErrors)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        errorMessage = `${errorMessage} (${details})`;
      }
    } catch {
      // Ignorar parse error
    }
    throw new Error(errorMessage);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

export const api = {
  // Dashboard
  getDashboardStats: () => fetch(`${API_BASE_URL}/dashboard/stats`).then(handleResponse),

  // Categorías
  getCategorias: () => fetch(`${API_BASE_URL}/categorias`).then(handleResponse),
  createCategoria: (data) => fetch(`${API_BASE_URL}/categorias`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateCategoria: (id, data) => fetch(`${API_BASE_URL}/categorias/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteCategoria: (id) => fetch(`${API_BASE_URL}/categorias/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Marcas
  getMarcas: () => fetch(`${API_BASE_URL}/marcas`).then(handleResponse),
  createMarca: (data) => fetch(`${API_BASE_URL}/marcas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateMarca: (id, data) => fetch(`${API_BASE_URL}/marcas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteMarca: (id) => fetch(`${API_BASE_URL}/marcas/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Modelos
  getModelos: () => fetch(`${API_BASE_URL}/modelos`).then(handleResponse),
  createModelo: (data) => fetch(`${API_BASE_URL}/modelos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateModelo: (id, data) => fetch(`${API_BASE_URL}/modelos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteModelo: (id) => fetch(`${API_BASE_URL}/modelos/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Colores
  getColores: () => fetch(`${API_BASE_URL}/colores`).then(handleResponse),
  createColor: (data) => fetch(`${API_BASE_URL}/colores`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteColor: (id) => fetch(`${API_BASE_URL}/colores/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Materiales
  getMateriales: () => fetch(`${API_BASE_URL}/materiales`).then(handleResponse),
  createMaterial: (data) => fetch(`${API_BASE_URL}/materiales`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteMaterial: (id) => fetch(`${API_BASE_URL}/materiales/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Proveedores
  getProveedores: () => fetch(`${API_BASE_URL}/proveedores`).then(handleResponse),
  createProveedor: (data) => fetch(`${API_BASE_URL}/proveedores`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateProveedor: (id, data) => fetch(`${API_BASE_URL}/proveedores/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteProveedor: (id) => fetch(`${API_BASE_URL}/proveedores/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Clientes
  getClientes: () => fetch(`${API_BASE_URL}/clientes`).then(handleResponse),
  createCliente: (data) => fetch(`${API_BASE_URL}/clientes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateCliente: (id, data) => fetch(`${API_BASE_URL}/clientes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteCliente: (id) => fetch(`${API_BASE_URL}/clientes/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Usuarios
  getUsuarios: () => fetch(`${API_BASE_URL}/usuarios`).then(handleResponse),

  // Productos
  getProductos: ({ idModelo, idCategoria, search, lowStock } = {}) => {
    const params = new URLSearchParams();
    if (idModelo) params.append('idModelo', idModelo);
    if (idCategoria) params.append('idCategoria', idCategoria);
    if (search) params.append('search', search);
    if (lowStock) params.append('lowStock', 'true');
    const url = `${API_BASE_URL}/productos${params.toString() ? '?' + params.toString() : ''}`;
    return fetch(url).then(handleResponse);
  },
  createProducto: (data) => fetch(`${API_BASE_URL}/productos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateProducto: (id, data) => fetch(`${API_BASE_URL}/productos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteProducto: (id) => fetch(`${API_BASE_URL}/productos/${id}`, { method: 'DELETE' }).then(handleResponse),

  // Ventas
  getVentas: () => fetch(`${API_BASE_URL}/ventas`).then(handleResponse),
  registrarVenta: (data) => fetch(`${API_BASE_URL}/ventas`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  cancelarVenta: (id) => fetch(`${API_BASE_URL}/ventas/${id}/cancelar`, { method: 'POST' }).then(handleResponse),

  // Compras
  getCompras: () => fetch(`${API_BASE_URL}/compras`).then(handleResponse),
  registrarCompra: (data) => fetch(`${API_BASE_URL}/compras`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),

  // Movimientos
  getMovimientos: (idProducto) => {
    const url = idProducto ? `${API_BASE_URL}/movimientos?idProducto=${idProducto}` : `${API_BASE_URL}/movimientos`;
    return fetch(url).then(handleResponse);
  },
  registrarMovimiento: (data) => fetch(`${API_BASE_URL}/movimientos`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),

  // Bitácora
  getBitacora: () => fetch(`${API_BASE_URL}/bitacora`).then(handleResponse),

  // Configuración
  getConfiguracion: () => fetch(`${API_BASE_URL}/configuracion`).then(handleResponse),

  // Autenticación
  login: (credentials) =>
    fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(handleResponse),
};
