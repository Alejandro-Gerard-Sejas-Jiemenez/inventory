import { useState, useCallback, useMemo } from 'react';

/**
 * Hook personalizado para la gestión de la Bolsa/Carrito de compras.
 * Responsabilidad única: Gestión de ítems del carrito con validación de stock.
 */
export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((producto) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.idProducto === producto.idProducto);
      const stockMax = producto.stockActual ?? 999;
      if (existing) {
        if (existing.cantidad >= stockMax) return prev;
        return prev.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const updateCartQuantity = useCallback((idProducto, cantidad) => {
    if (cantidad <= 0) {
      setCartItems((prev) => prev.filter((item) => item.idProducto !== idProducto));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.idProducto === idProducto) {
          const maxStock = item.stockActual ?? 999;
          const finalCant = Math.min(cantidad, maxStock);
          return { ...item, cantidad: finalCant };
        }
        return item;
      })
    );
  }, []);

  const removeCartItem = useCallback((idProducto) => {
    setCartItems((prev) => prev.filter((item) => item.idProducto !== idProducto));
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
