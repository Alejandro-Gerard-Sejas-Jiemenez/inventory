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
  const [selectedDeviceModel, setSelectedDeviceModel] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Filtrado reactivo de productos
  const filteredProductos = useMemo(() => {
    let list = [...productos].filter((p) => p.activo !== false);

    // 1. Filtro por Categoría
    if (selectedCategoria !== 'ALL') {
      list = list.filter((p) => {
        const catId = p.categoria?.idCategoria ?? p.categoria?.id ?? p.idCategoria ?? (typeof p.categoria === 'object' ? null : p.categoria);
        return String(catId) === String(selectedCategoria);
      });
    }

    // 2. Filtro por Marca
    if (selectedMarca !== 'ALL') {
      list = list.filter((p) => {
        // Marca directa en el producto
        if (p.modelo?.marca?.idMarca && String(p.modelo.marca.idMarca) === String(selectedMarca)) {
          return true;
        }
        // Marca dentro de alguna variante
        if (Array.isArray(p.variantes)) {
          return p.variantes.some(
            (v) => String(v.modelo?.marca?.idMarca || v.modelo?.marcaId) === String(selectedMarca)
          );
        }
        return false;
      });
    }

    // 3. Filtro por Modelo de Celular (Inspiración BURGA)
    if (selectedDeviceModel !== 'ALL') {
      const target = selectedDeviceModel.toLowerCase().trim();
      list = list.filter((p) => {
        const modRoot = p.modelo?.nombre?.toLowerCase() || '';
        if (modRoot.includes(target)) return true;
        if (Array.isArray(p.variantes)) {
          return p.variantes.some((v) => {
            const vMod = v.modelo?.nombre?.toLowerCase() || '';
            return vMod.includes(target);
          });
        }
        return false;
      });
    }

    // 4. Filtro de Búsqueda por Texto
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((p) => {
        const nombre = p.nombre?.toLowerCase() || '';
        const desc = p.descripcion?.toLowerCase() || '';
        const categoria = p.categoria?.nombre?.toLowerCase() || '';
        const material = p.material?.nombre?.toLowerCase() || '';

        // Búsqueda directa
        if (nombre.includes(q) || desc.includes(q) || categoria.includes(q) || material.includes(q)) {
          return true;
        }

        // Búsqueda en variantes (modelo, marca, color, sku)
        if (Array.isArray(p.variantes)) {
          const matchVar = p.variantes.some((v) => {
            const mod = v.modelo?.nombre?.toLowerCase() || '';
            const mrc = v.modelo?.marca?.nombre?.toLowerCase() || '';
            const col = v.color?.nombre?.toLowerCase() || '';
            const sku = v.sku?.toLowerCase() || '';
            return mod.includes(q) || mrc.includes(q) || col.includes(q) || sku.includes(q);
          });
          if (matchVar) return true;
        }

        // Búsqueda en modelo directo
        const modeloDirecto = p.modelo?.nombre?.toLowerCase() || '';
        const marcaDirecta = p.modelo?.marca?.nombre?.toLowerCase() || '';
        const colorDirecto = p.color?.nombre?.toLowerCase() || '';

        return modeloDirecto.includes(q) || marcaDirecta.includes(q) || colorDirecto.includes(q);
      });
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => Number(a.precioUnitario) - Number(b.precioUnitario));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => Number(b.precioUnitario) - Number(a.precioUnitario));
    }

    return list;
  }, [productos, selectedCategoria, selectedMarca, selectedDeviceModel, search, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProductos.length / PAGE_SIZE));
  
  const paginatedProductos = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProductos.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProductos, currentPage, PAGE_SIZE]);

  const handleResetCatalog = () => {
    setSelectedCategoria('ALL');
    setSelectedMarca('ALL');
    setSelectedDeviceModel('ALL');
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
    selectedDeviceModel,
    setSelectedDeviceModel,
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
