import { http, API_BASE_URL, handleResponse } from './httpClient';

export const transactionApi = {
  // Ventas
  getVentas: () => http.get('/ventas'),
  registrarVenta: (data) => http.post('/ventas', data),
  cancelarVenta: (id) => http.post(`/ventas/${id}/cancelar`),
  cambiarEstadoVenta: (id, nuevoEstado, idUsuario) =>
    http.put(`/ventas/${id}/estado?nuevoEstado=${nuevoEstado}${idUsuario ? `&idUsuario=${idUsuario}` : ''}`),

  // Compras
  getCompras: () => http.get('/compras'),
  registrarCompra: (data) => http.post('/compras', data),
  cambiarEstadoCompra: (id, nuevoEstado, idUsuario) =>
    http.put(`/compras/${id}/estado?nuevoEstado=${nuevoEstado}${idUsuario ? `&idUsuario=${idUsuario}` : ''}`),

  // Movimientos (Kardex)
  getMovimientos: (idProducto) => {
    const url = idProducto ? `/movimientos?idProducto=${idProducto}` : '/movimientos';
    return http.get(url);
  },
  registrarMovimiento: (data) => http.post('/movimientos', data),
};

