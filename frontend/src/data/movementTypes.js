/**
 * Tipos de Movimiento de Inventario (Kardex)
 */
export const TIPOS_MOVIMIENTO = [
  { value: 'ENTRADA', label: 'ENTRADA (Aumentar existencias)', variant: 'success' },
  { value: 'SALIDA', label: 'SALIDA (Disminuir existencias)', variant: 'danger' },
  { value: 'AJUSTE', label: 'AJUSTE (Fijar stock exacto)', variant: 'brand' },
];

export const TABS_CATALOGOS = [
  { id: 'modelos', label: 'Modelos' },
  { id: 'materiales', label: 'Materiales' },
  { id: 'colores', label: 'Colores' },
];
