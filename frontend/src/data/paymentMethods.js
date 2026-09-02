/**
 * Métodos de Pago disponibles en el sistema
 */
export const METODOS_PAGO = [
  { value: 'EFECTIVO', label: 'Efectivo en Caja' },
  { value: 'QR', label: 'Pago QR / Transferencia' },
  { value: 'TARJETA', label: 'Tarjeta Débito / Crédito' },
];

export const ESTADOS_VENTA = [
  { value: 'COMPLETADA', label: 'Completada', variant: 'success' },
  { value: 'PENDIENTE', label: 'Pendiente', variant: 'warning' },
  { value: 'CANCELADA', label: 'Cancelada', variant: 'danger' },
];

export const ESTADOS_COMPRA = [
  { value: 'COMPLETADA', label: 'Completada', variant: 'success' },
  { value: 'PENDIENTE', label: 'Pendiente', variant: 'warning' },
  { value: 'ANULADA', label: 'Anulada', variant: 'danger' },
];
