import { useState, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Hook especializado en la gestión de catálogos y atributos maestros del sistema.
 */
export function useMasterCatalogData() {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [colores, setColores] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const loadMasterData = useCallback(async () => {
    try {
      const [
        catRes,
        marRes,
        modRes,
        matRes,
        colRes,
        propRes,
        provRes,
      ] = await Promise.all([
        api.getCategorias().catch(() => []),
        api.getMarcas().catch(() => []),
        api.getModelos().catch(() => []),
        api.getMateriales().catch(() => []),
        api.getColores().catch(() => []),
        api.getPropietarios().catch(() => []),
        api.getProveedores().catch(() => []),
      ]);

      setCategorias(catRes);
      setMarcas(marRes);
      setModelos(modRes);
      setMateriales(matRes);
      setColores(colRes);
      setPropietarios(propRes);
      setProveedores(provRes);
    } catch (err) {
      console.error('Error cargando catálogos maestros:', err);
    }
  }, []);

  const createProveedor = async (data) => {
    const res = await api.createProveedor(data);
    await loadMasterData();
    return res;
  };

  const updateProveedor = async (id, data) => {
    const res = await api.updateProveedor(id, data);
    await loadMasterData();
    return res;
  };

  const createCategoria = async (data) => {
    const res = await api.createCategoria(data);
    await loadMasterData();
    return res;
  };

  const updateCategoria = async (id, data) => {
    const res = await api.updateCategoria(id, data);
    await loadMasterData();
    return res;
  };

  const deleteCategoria = async (id) => {
    if (window.confirm('¿Desactivar esta categoría?')) {
      await api.deleteCategoria(id);
      await loadMasterData();
    }
  };

  const restaurarCategoria = async (id) => {
    await api.restaurarCategoria(id);
    await loadMasterData();
  };

  const createMarca = async (data) => {
    const res = await api.createMarca(data);
    await loadMasterData();
    return res;
  };

  const updateMarca = async (id, data) => {
    const res = await api.updateMarca(id, data);
    await loadMasterData();
    return res;
  };

  const deleteMarca = async (id) => {
    if (window.confirm('¿Desactivar esta marca?')) {
      await api.deleteMarca(id);
      await loadMasterData();
    }
  };

  const restaurarMarca = async (id) => {
    await api.restaurarMarca(id);
    await loadMasterData();
  };

  const createModelo = async (data) => {
    const res = await api.createModelo(data);
    await loadMasterData();
    return res;
  };

  const updateModelo = async (id, data) => {
    const res = await api.updateModelo(id, data);
    await loadMasterData();
    return res;
  };

  const deleteModelo = async (id) => {
    if (window.confirm('¿Desactivar este modelo?')) {
      await api.deleteModelo(id);
      await loadMasterData();
    }
  };

  const restaurarModelo = async (id) => {
    await api.restaurarModelo(id);
    await loadMasterData();
  };

  const createColor = async (data) => {
    const res = await api.createColor(data);
    await loadMasterData();
    return res;
  };

  const updateColor = async (id, data) => {
    const res = await api.updateColor(id, data);
    await loadMasterData();
    return res;
  };

  const deleteColor = async (id) => {
    if (window.confirm('¿Desactivar este color?')) {
      await api.deleteColor(id);
      await loadMasterData();
    }
  };

  const restaurarColor = async (id) => {
    await api.restaurarColor(id);
    await loadMasterData();
  };

  const createMaterial = async (data) => {
    const res = await api.createMaterial(data);
    await loadMasterData();
    return res;
  };

  const updateMaterial = async (id, data) => {
    const res = await api.updateMaterial(id, data);
    await loadMasterData();
    return res;
  };

  const deleteMaterial = async (id) => {
    if (window.confirm('¿Desactivar este material?')) {
      await api.deleteMaterial(id);
      await loadMasterData();
    }
  };

  const restaurarMaterial = async (id) => {
    await api.restaurarMaterial(id);
    await loadMasterData();
  };

  const createPropietario = async (data) => {
    const res = await api.createPropietario(data);
    await loadMasterData();
    return res;
  };

  const updatePropietario = async (id, data) => {
    const res = await api.updatePropietario(id, data);
    await loadMasterData();
    return res;
  };

  const deletePropietario = async (id) => {
    if (window.confirm('¿Desactivar este propietario?')) {
      await api.deletePropietario(id);
      await loadMasterData();
    }
  };

  const restaurarPropietario = async (id) => {
    await api.restaurarPropietario(id);
    await loadMasterData();
  };

  return {
    categorias,
    marcas,
    modelos,
    materiales,
    colores,
    propietarios,
    proveedores,
    loadMasterData,
    createProveedor,
    updateProveedor,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    restaurarCategoria,
    createMarca,
    updateMarca,
    deleteMarca,
    restaurarMarca,
    createModelo,
    updateModelo,
    deleteModelo,
    restaurarModelo,
    createColor,
    updateColor,
    deleteColor,
    restaurarColor,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    restaurarMaterial,
    createPropietario,
    updatePropietario,
    deletePropietario,
    restaurarPropietario,
  };
}
