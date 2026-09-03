import { catalogApi } from './catalogApi';
import { productApi } from './productApi';
import { transactionApi } from './transactionApi';
import { systemApi } from './systemApi';

/**
 * API Client Facade centralizado para el frontend.
 * Compone todos los submódulos de servicio REST sin romper importaciones existentes.
 */
export const api = {
  ...catalogApi,
  ...productApi,
  ...transactionApi,
  ...systemApi,
};
