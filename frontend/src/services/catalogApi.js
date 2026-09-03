import { http } from './httpClient';

export const catalogApi = {
  // Categorías
  getCategorias: () => http.get('/categorias'),
  createCategoria: (data) => http.post('/categorias', data),
  updateCategoria: (id, data) => http.put(`/categorias/${id}`, data),
  deleteCategoria: (id) => http.delete(`/categorias/${id}`),
  restaurarCategoria: (id) => http.put(`/categorias/${id}/restaurar`),

  // Marcas
  getMarcas: () => http.get('/marcas'),
  createMarca: (data) => http.post('/marcas', data),
  updateMarca: (id, data) => http.put(`/marcas/${id}`, data),
  deleteMarca: (id) => http.delete(`/marcas/${id}`),
  restaurarMarca: (id) => http.put(`/marcas/${id}/restaurar`),

  // Modelos
  getModelos: () => http.get('/modelos'),
  createModelo: (data) => http.post('/modelos', data),
  updateModelo: (id, data) => http.put(`/modelos/${id}`, data),
  deleteModelo: (id) => http.delete(`/modelos/${id}`),
  restaurarModelo: (id) => http.put(`/modelos/${id}/restaurar`),

  // Colores
  getColores: () => http.get('/colores'),
  createColor: (data) => http.post('/colores', data),
  deleteColor: (id) => http.delete(`/colores/${id}`),
  restaurarColor: (id) => http.put(`/colores/${id}/restaurar`),

  // Materiales
  getMateriales: () => http.get('/materiales'),
  createMaterial: (data) => http.post('/materiales', data),
  deleteMaterial: (id) => http.delete(`/materiales/${id}`),
  restaurarMaterial: (id) => http.put(`/materiales/${id}/restaurar`),

  // Propietarios
  getPropietarios: () => http.get('/propietarios'),
  createPropietario: (data) => http.post('/propietarios', data),
  deletePropietario: (id) => http.delete(`/propietarios/${id}`),
  restaurarPropietario: (id) => http.put(`/propietarios/${id}/restaurar`),

  // Proveedores
  getProveedores: () => http.get('/proveedores'),
  createProveedor: (data) => http.post('/proveedores', data),
  updateProveedor: (id, data) => http.put(`/proveedores/${id}`, data),
  deleteProveedor: (id) => http.delete(`/proveedores/${id}`),
};
