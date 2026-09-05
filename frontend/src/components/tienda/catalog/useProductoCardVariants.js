import { useMemo } from 'react';

/**
 * Hook de cálculo de inventario y variantes para ProductoCard.
 * Responsabilidad: Abstraer la resolución de stock, modelos y colores de un producto.
 */
export function useProductoCardVariants(producto, cartQuantity = 0) {
  const stockActual = useMemo(() => {
    if (Array.isArray(producto?.variantes) && producto.variantes.length > 0) {
      return producto.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0);
    }
    return producto?.stockActual ?? 0;
  }, [producto]);

  const isOutOfStock = stockActual <= 0;
  const remainingStock = Math.max(0, stockActual - cartQuantity);

  const mainImage = useMemo(() => {
    if (Array.isArray(producto?.imagenes) && producto.imagenes.length > 0 && producto.imagenes[0]?.url) {
      return producto.imagenes[0].url;
    }
    return producto?.imagenUrl || null;
  }, [producto]);

  const availableModels = useMemo(() => {
    const modelsSet = new Set();
    if (producto?.modelo?.nombre) {
      modelsSet.add(producto.modelo.nombre);
    }
    if (Array.isArray(producto?.variantes)) {
      producto.variantes.forEach((v) => {
        if (v.modelo?.nombre) {
          modelsSet.add(v.modelo.nombre);
        }
      });
    }
    return Array.from(modelsSet);
  }, [producto]);

  const availableColors = useMemo(() => {
    const colorsMap = new Map();

    if (producto?.color?.nombre) {
      colorsMap.set(producto.color.nombre, {
        nombre: producto.color.nombre,
        hex: producto.color.codigoHex || '#888888',
      });
    }

    if (Array.isArray(producto?.variantes)) {
      producto.variantes.forEach((v) => {
        if (v.color?.nombre) {
          colorsMap.set(v.color.nombre, {
            nombre: v.color.nombre,
            hex: v.color.codigoHex || '#888888',
          });
        }
      });
    }

    return Array.from(colorsMap.values());
  }, [producto]);

  return {
    stockActual,
    isOutOfStock,
    remainingStock,
    mainImage,
    availableModels,
    availableColors,
  };
}
