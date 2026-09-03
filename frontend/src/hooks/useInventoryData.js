import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { useMasterCatalogData } from './useMasterCatalogData';
import { useTransactionData } from './useTransactionData';

/**
 * Hook Facade Principal para la sincronización de inventario y mutaciones del sistema.
 * Aplica Clean Architecture (Facade Pattern) delegando responsabilidades en sub-hooks de dominio.
 */
export function useInventoryData() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtros de productos para el panel admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  // Sub-hook 1: Catálogos Maestros
  const master = useMasterCatalogData();

  const loadProductos = useCallback(async () => {
    try {
      const data = await api.getProductos({
        idCategoria: selectedCategoria || undefined,
        idModelo: selectedModelo || undefined,
        search: searchQuery || undefined,
        lowStock: filterLowStock || undefined,
      });
      setProductos(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    }
  }, [selectedCategoria, selectedModelo, searchQuery, filterLowStock]);

  // Sub-hook 2: Transacciones
  const tx = useTransactionData(loadProductos);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        master.loadMasterData(),
        tx.loadTransactionData(),
        loadProductos(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [master.loadMasterData, tx.loadTransactionData, loadProductos]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Mutaciones de Productos
  const saveProducto = async (productoData) => {
    if (productoData.idProducto) {
      await api.updateProducto(productoData.idProducto, productoData);
    } else {
      await api.createProducto(productoData);
    }
    await loadProductos();
    await master.loadMasterData();
  };

  const deleteProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await api.deleteProducto(id);
      await loadProductos();
      await master.loadMasterData();
    }
  };

  return {
    // Estado General
    stats: tx.stats,
    productos,
    categorias: master.categorias,
    marcas: master.marcas,
    modelos: master.modelos,
    materiales: master.materiales,
    colores: master.colores,
    propietarios: master.propietarios,
    proveedores: master.proveedores,
    usuarios: tx.usuarios,
    ventas: tx.ventas,
    compras: tx.compras,
    movimientos: tx.movimientos,
    bitacora: tx.bitacora,
    loading,

    // Filtros
    searchQuery,
    setSearchQuery,
    selectedCategoria,
    setSelectedCategoria,
    selectedModelo,
    setSelectedModelo,
    filterLowStock,
    setFilterLowStock,

    // Carga de datos
    loadData,
    loadProductos,

    // Mutaciones Productos
    saveProducto,
    deleteProducto,

    // Mutaciones Transacciones
    saveMovimiento: tx.saveMovimiento,
    registrarVenta: tx.registrarVenta,
    registrarCompra: tx.registrarCompra,

    // Mutaciones Catálogos
    createProveedor: master.createProveedor,
    updateProveedor: master.updateProveedor,
    createCategoria: master.createCategoria,
    updateCategoria: master.updateCategoria,
    deleteCategoria: master.deleteCategoria,
    restaurarCategoria: master.restaurarCategoria,
    createMarca: master.createMarca,
    updateMarca: master.updateMarca,
    deleteMarca: master.deleteMarca,
    restaurarMarca: master.restaurarMarca,
    createModelo: master.createModelo,
    updateModelo: master.updateModelo,
    deleteModelo: master.deleteModelo,
    restaurarModelo: master.restaurarModelo,
    createColor: master.createColor,
    updateColor: master.updateColor,
    deleteColor: master.deleteColor,
    restaurarColor: master.restaurarColor,
    createMaterial: master.createMaterial,
    updateMaterial: master.updateMaterial,
    deleteMaterial: master.deleteMaterial,
    restaurarMaterial: master.restaurarMaterial,
    createPropietario: master.createPropietario,
    updatePropietario: master.updatePropietario,
    deletePropietario: master.deletePropietario,
    restaurarPropietario: master.restaurarPropietario,
  };
}
