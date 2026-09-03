import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Hook personalizado para la gestión y sincronización de datos maestros del inventario.
 * Responsabilidad única: Consulta y mutaciones CRUD de entidades del dominio.
 */
export function useInventoryData() {
  const [stats, setStats] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [colores, setColores] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [bitacora, setBitacora] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtros de productos para el panel admin
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedModelo, setSelectedModelo] = useState('');
  const [filterLowStock, setFilterLowStock] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        statsData,
        categoriasData,
        marcasData,
        modelosData,
        materialesData,
        coloresData,
        propietariosData,
        proveedoresData,
        usuariosData,
        ventasData,
        comprasData,
        movsData,
        bitacoraData,
      ] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getCategorias().catch(() => []),
        api.getMarcas().catch(() => []),
        api.getModelos().catch(() => []),
        api.getMateriales().catch(() => []),
        api.getColores().catch(() => []),
        api.getPropietarios().catch(() => []),
        api.getProveedores().catch(() => []),
        api.getUsuarios().catch(() => []),
        api.getVentas().catch(() => []),
        api.getCompras().catch(() => []),
        api.getMovimientos().catch(() => []),
        api.getBitacora().catch(() => []),
      ]);

      setStats(statsData);
      setCategorias(categoriasData);
      setMarcas(marcasData);
      setModelos(modelosData);
      setMateriales(materialesData);
      setColores(coloresData);
      setPropietarios(propietariosData);
      setProveedores(proveedoresData);
      setUsuarios(usuariosData);
      setVentas(ventasData);
      setCompras(comprasData);
      setMovimientos(movsData);
      setBitacora(bitacoraData);
    } catch (err) {
      console.error('Error cargando datos maestros:', err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Operaciones CRUD
  const saveProducto = async (productoData) => {
    if (productoData.idProducto) {
      await api.updateProducto(productoData.idProducto, productoData);
    } else {
      await api.createProducto(productoData);
    }
    await loadProductos();
    await loadData();
  };

  const deleteProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      await api.deleteProducto(id);
      await loadProductos();
      await loadData();
    }
  };

  const saveMovimiento = async (movData) => {
    await api.registrarMovimiento(movData);
    await loadProductos();
    await loadData();
  };

  const registrarVenta = async (ventaData) => {
    await api.registrarVenta(ventaData);
    await loadProductos();
    await loadData();
  };

  const registrarCompra = async (compraData) => {
    await api.registrarCompra(compraData);
    await loadProductos();
    await loadData();
  };


  const createProveedor = async (provData) => {
    await api.createProveedor(provData);
    await loadData();
  };

  const createCategoria = async (catData) => {
    await api.createCategoria(catData);
    await loadData();
  };

  const deleteCategoria = async (id) => {
    if (window.confirm('¿Desactivar esta categoría?')) {
      await api.deleteCategoria(id);
      await loadData();
    }
  };

  const restaurarCategoria = async (id) => {
    await api.restaurarCategoria(id);
    await loadData();
  };

  const createMarca = async (marcaData) => {
    await api.createMarca(marcaData);
    await loadData();
  };

  const deleteMarca = async (id) => {
    if (window.confirm('¿Desactivar esta marca?')) {
      await api.deleteMarca(id);
      await loadData();
    }
  };

  const restaurarMarca = async (id) => {
    await api.restaurarMarca(id);
    await loadData();
  };

  const createModelo = async (modData) => {
    await api.createModelo(modData);
    await loadData();
  };

  const deleteModelo = async (id) => {
    if (window.confirm('¿Desactivar este modelo?')) {
      await api.deleteModelo(id);
      await loadData();
    }
  };

  const restaurarModelo = async (id) => {
    await api.restaurarModelo(id);
    await loadData();
  };

  const createColor = async (colData) => {
    await api.createColor(colData);
    await loadData();
  };

  const deleteColor = async (id) => {
    if (window.confirm('¿Desactivar este color?')) {
      await api.deleteColor(id);
      await loadData();
    }
  };

  const restaurarColor = async (id) => {
    await api.restaurarColor(id);
    await loadData();
  };

  const createMaterial = async (matData) => {
    await api.createMaterial(matData);
    await loadData();
  };

  const deleteMaterial = async (id) => {
    if (window.confirm('¿Desactivar este material?')) {
      await api.deleteMaterial(id);
      await loadData();
    }
  };

  const restaurarMaterial = async (id) => {
    await api.restaurarMaterial(id);
    await loadData();
  };

  const createPropietario = async (propData) => {
    await api.createPropietario(propData);
    await loadData();
  };

  const deletePropietario = async (id) => {
    if (window.confirm('¿Desactivar este propietario?')) {
      await api.deletePropietario(id);
      await loadData();
    }
  };

  const restaurarPropietario = async (id) => {
    await api.restaurarPropietario(id);
    await loadData();
  };

  return {
    stats,
    productos,
    categorias,
    marcas,
    modelos,
    materiales,
    colores,
    propietarios,
    proveedores,
    usuarios,
    ventas,
    compras,
    movimientos,
    bitacora,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategoria,
    setSelectedCategoria,
    selectedModelo,
    setSelectedModelo,
    filterLowStock,
    setFilterLowStock,
    loadData,
    loadProductos,
    saveProducto,
    deleteProducto,
    saveMovimiento,
    registrarVenta,
    registrarCompra,
    createProveedor,
    createCategoria,
    deleteCategoria,
    restaurarCategoria,
    createMarca,
    deleteMarca,
    restaurarMarca,
    createModelo,
    deleteModelo,
    restaurarModelo,
    createColor,
    deleteColor,
    restaurarColor,
    createMaterial,
    deleteMaterial,
    restaurarMaterial,
    createPropietario,
    deletePropietario,
    restaurarPropietario,
  };
}
