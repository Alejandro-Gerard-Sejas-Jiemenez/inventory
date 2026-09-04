import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para la gestión de la Bolsa/Carrito de compras.
 * Responsabilidad: Gestión de ítems del carrito identificados por (Producto + Modelo + Color).
 */
export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((producto, variante = null, cantidad = 1) => {
    if (!producto) return;

    const modeloNombre = variante?.modelo?.nombre || producto.modelo?.nombre || '';
    const colorNombre = variante?.color?.nombre || producto.color?.nombre || '';
    const colorHex = variante?.color?.codigoHex || producto.color?.codigoHex || '#888888';

    const cartItemId = variante?.idVariante
      ? `var_${variante.idVariante}`
      : `prod_${producto.idProducto}_${modeloNombre}_${colorNombre}`;

    const stockMax = variante?.stockActual ?? producto.stockActual ?? 999;
    const addCount = Math.max(1, cantidad);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.cartItemId === cartItemId || item.idProducto === producto.idProducto && item.modeloSeleccionado === modeloNombre && item.colorSeleccionado === colorNombre
      );

      if (existingIndex >= 0) {
        const existingItem = prev[existingIndex];
        const newQty = Math.min(existingItem.cantidad + addCount, stockMax);
        const updated = [...prev];
        updated[existingIndex] = { ...existingItem, cantidad: newQty };
        return updated;
      }

      const displayImage =
        (producto.imagenes && producto.imagenes.length > 0 && producto.imagenes[0]?.url) ||
        producto.imagenUrl ||
        (Array.isArray(producto.imagenesUrls) && producto.imagenesUrls[0]) ||
        null;

      const newItem = {
        cartItemId,
        idProducto: producto.idProducto,
        idVariante: variante?.idVariante || null,
        nombre: producto.nombre,
        imagenUrl: displayImage,
        imagenesUrls: producto.imagenesUrls,
        precioUnitario: producto.precioUnitario,
        modeloSeleccionado: modeloNombre,
        colorSeleccionado: colorNombre,
        colorHex: colorHex,
        stockActual: stockMax,
        cantidad: Math.min(addCount, stockMax),
      };

      return [...prev, newItem];
    });
  }, []);

  const updateCartQuantity = useCallback((cartItemId, cantidad) => {
    if (cantidad <= 0) {
      setCartItems((prev) => prev.filter((item) => (item.cartItemId || item.idProducto) !== cartItemId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if ((item.cartItemId || item.idProducto) === cartItemId) {
          const maxStock = item.stockActual ?? 999;
          const finalCant = Math.min(cantidad, maxStock);
          return { ...item, cantidad: finalCant };
        }
        return item;
      })
    );
  }, []);

  const removeCartItem = useCallback((cartItemId) => {
    setCartItems((prev) => prev.filter((item) => (item.cartItemId || item.idProducto) !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const totalCartUnits = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  }, [cartItems]);

  return {
    cartItems,
    totalCartUnits,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    clearCart,
  };
}
