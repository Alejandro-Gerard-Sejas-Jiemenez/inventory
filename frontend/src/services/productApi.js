import { http, API_BASE_URL, handleResponse } from './httpClient';

export const productApi = {
  getProductos: ({ idModelo, idCategoria, search, lowStock } = {}) => {
    const params = new URLSearchParams();
    if (idModelo) params.append('idModelo', idModelo);
    if (idCategoria) params.append('idCategoria', idCategoria);
    if (search) params.append('search', search);
    if (lowStock) params.append('lowStock', 'true');
    const url = `${API_BASE_URL}/productos${params.toString() ? '?' + params.toString() : ''}`;
    return fetch(url).then(handleResponse);
  },
  createProducto: (data) => http.post('/productos', data),
  updateProducto: (id, data) => http.put(`/productos/${id}`, data),
  deleteProducto: (id) => http.delete(`/productos/${id}`),
};
