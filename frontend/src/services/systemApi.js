import { http } from './httpClient';

export const systemApi = {
  getDashboardStats: () => http.get('/dashboard/stats'),
  getUsuarios: () => http.get('/usuarios'),
  getBitacora: () => http.get('/bitacora'),
  getConfiguracion: () => http.get('/configuracion'),
  login: (credentials) => http.post('/usuarios/login', credentials),
};
