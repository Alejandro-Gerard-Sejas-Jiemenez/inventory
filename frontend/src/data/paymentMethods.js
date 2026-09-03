/**
 * Métodos de Pago disponibles en el sistema
 */
export const METODOS_PAGO = [
  { value: 'EFECTIVO', label: 'Efectivo en Caja' },
  { value: 'TRANSFERENCIA', label: 'Pago QR / Transferencia' },
  { value: 'TARJETA_DEBITO', label: 'Tarjeta Débito' },
  { value: 'TARJETA_CREDITO', label: 'Tarjeta Crédito' },
  { value: 'OTRO', label: 'Otro Medio de Pago' },
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
