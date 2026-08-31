import { useState, useCallback } from 'react';

/**
 * Hook personalizado para la gestión de autenticación y sesión del Administrador.
 * Responsabilidad única: Estado de sesión y control de acceso.
 */
export function useAuth() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('inventario_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const login = useCallback((user) => {
    setCurrentUser(user);
    try {
      sessionStorage.setItem('inventario_user', JSON.stringify(user));
    } catch {
      // Ignorar storage error
    }
    setIsLoginModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem('inventario_user');
    } catch {
      // Ignorar storage error
    }
  }, []);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoginModalOpen,
    login,
    logout,
    openLoginModal,
    closeLoginModal,
  };
}
