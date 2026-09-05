import { useState, useMemo } from 'react';

// Helper síncrono para obtener colores por modelo
export const getColorsForModel = (producto, modelName) => {
  if (!Array.isArray(producto?.variantes) || producto.variantes.length === 0) {
    if (producto?.color?.nombre) {
      return [{
        nombre: producto.color.nombre,
        hex: producto.color.codigoHex || '#888888',
        variante: null,
      }];
    }
    return [];
  }

  const map = new Map();
  producto.variantes.forEach((v) => {
    const nombreMod = v.modelo?.nombre || producto.modelo?.nombre;
    if (!modelName || nombreMod === modelName) {
      const colorObj = v.color || producto.color;
      if (colorObj?.nombre && !map.has(colorObj.nombre)) {
        map.set(colorObj.nombre, {
          nombre: colorObj.nombre,
          hex: colorObj.codigoHex || '#888888',
          variante: v,
        });
      }
    }
  });
  return Array.from(map.values());
};

/**
 * Hook para gestionar el estado y resolución de variantes en el Detalle de Producto.
 * Responsabilidad: Manejo de modelos, colores, variantes JPA y stock síncrono.
 */
export function useProductoDetalleVariants(producto, onAddToCart, onClose) {
  const [cantidad, setCantidad] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Modelos únicos disponibles
  const modelosUnicos = useMemo(() => {
    if (!Array.isArray(producto?.variantes) || producto.variantes.length === 0) {
      return producto?.modelo?.nombre ? [producto.modelo.nombre] : [];
    }
    const set = new Set();
    producto.variantes.forEach((v) => {
      const nombreMod = v.modelo?.nombre || producto.modelo?.nombre;
      if (nombreMod) set.add(nombreMod);
    });
    return Array.from(set);
  }, [producto]);

  // Modelo y Color iniciales
  const initialModel = modelosUnicos[0] || '';
  const initialColors = useMemo(() => getColorsForModel(producto, initialModel), [producto, initialModel]);
  const initialColorName = initialColors[0]?.nombre || '';

  const [selectedModelo, setSelectedModelo] = useState(initialModel);
  const [selectedColorName, setSelectedColorName] = useState(initialColorName);

  const coloresDelModelo = useMemo(() => {
    return getColorsForModel(producto, selectedModelo);
  }, [producto, selectedModelo]);

  const handleSelectModelo = (modName) => {
    const newColors = getColorsForModel(producto, modName);
    setSelectedModelo(modName);
    setSelectedColorName(newColors[0]?.nombre || '');
  };

  // Variante específica coincidente
  const selectedVariante = useMemo(() => {
    if (!Array.isArray(producto?.variantes) || producto.variantes.length === 0) return null;
    return producto.variantes.find((v) => {
      const matchMod = !selectedModelo || (v.modelo?.nombre || producto.modelo?.nombre) === selectedModelo;
      const matchCol = !selectedColorName || (v.color?.nombre || producto.color?.nombre) === selectedColorName;
      return matchMod && matchCol;
    }) || producto.variantes[0];
  }, [producto, selectedModelo, selectedColorName]);

  // Stock
  const stockTotal = (producto?.variantes && producto.variantes.length > 0)
    ? producto.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0)
    : (producto?.stockActual ?? 0);

  const currentVariantStock = selectedVariante ? (selectedVariante.stockActual || 0) : stockTotal;
  const isOutOfStock = currentVariantStock <= 0;
  const reachedLimit = cantidad >= currentVariantStock;

  const handleAddToCart = () => {
    if (isOutOfStock || cantidad <= 0) return;
    if (onAddToCart) {
      onAddToCart(producto, selectedVariante, cantidad);
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      if (onClose) onClose();
    }, 900);
  };

  return {
    cantidad,
    setCantidad,
    addedAnimation,
    modelosUnicos,
    selectedModelo,
    handleSelectModelo,
    coloresDelModelo,
    selectedColorName,
    setSelectedColorName,
    selectedVariante,
    currentVariantStock,
    isOutOfStock,
    reachedLimit,
    handleAddToCart,
  };
}
