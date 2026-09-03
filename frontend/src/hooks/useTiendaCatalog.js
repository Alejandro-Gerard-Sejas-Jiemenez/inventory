import { useState, useMemo, useEffect } from 'react';

/**
 * Hook para abstraer la lógica de filtrado, paginación, ordenamiento y tema visual del catálogo público.
 */
export function useTiendaCatalog(productos = []) {
  // Tema Claro / Oscuro
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('caseritos_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('caseritos_theme', nextTheme);
    } catch {
      // Ignorar error
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Filtros
  const [search, setSearch] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('ALL');
  const [selectedMarca, setSelectedMarca] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Filtrado reactivo de productos
  const filteredProductos = useMemo(() => {
    let list = [...productos].filter((p) => p.activo !== false);

    if (selectedCategoria !== 'ALL') {
      list = list.filter((p) => String(p.categoria?.idCategoria) === String(selectedCategoria));
    }

    if (selectedMarca !== 'ALL') {
      list = list.filter((p) => String(p.modelo?.marca?.idMarca) === String(selectedMarca));
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        const nombre = p.nombre?.toLowerCase() || '';
        const modelo = p.modelo?.nombre?.toLowerCase() || '';
        const marca = p.modelo?.marca?.nombre?.toLowerCase() || '';
        const color = p.color?.nombre?.toLowerCase() || '';
        const material = p.material?.nombre?.toLowerCase() || '';
        const categoria = p.categoria?.nombre?.toLowerCase() || '';
        return (
          nombre.includes(q) ||
          modelo.includes(q) ||
          marca.includes(q) ||
          color.includes(q) ||
          material.includes(q) ||
          categoria.includes(q)
        );
      });
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => Number(a.precioUnitario) - Number(b.precioUnitario));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => Number(b.precioUnitario) - Number(a.precioUnitario));
    }

    return list;
  }, [productos, selectedCategoria, selectedMarca, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / PAGE_SIZE));
  
  const paginatedProductos = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProductos.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProductos, currentPage, PAGE_SIZE]);

  const handleResetCatalog = () => {
    setSelectedCategoria('ALL');
    setSelectedMarca('ALL');
    setSearch('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  return {
    theme,
    toggleTheme,
    search,
    setSearch,
    selectedCategoria,
    setSelectedCategoria,
    selectedMarca,
    setSelectedMarca,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredProductos,
    paginatedProductos,
    handleResetCatalog,
  };
}
