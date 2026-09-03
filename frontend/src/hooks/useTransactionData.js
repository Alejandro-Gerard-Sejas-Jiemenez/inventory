import { useState, useCallback } from 'react';
import { api } from '../services/api';

/**
 * Hook especializado en la gestión de transacciones (Ventas, Compras, Movimientos, Bitácora y Stats).
 */
export function useTransactionData(onDataMutated) {
  const [stats, setStats] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [bitacora, setBitacora] = useState([]);

  const loadTransactionData = useCallback(async () => {
    try {
      const [
        statsRes,
        usuariosRes,
        ventasRes,
        comprasRes,
        movsRes,
        bitacoraRes,
      ] = await Promise.all([
        api.getDashboardStats().catch(() => null),
        api.getUsuarios().catch(() => []),
        api.getVentas().catch(() => []),
        api.getCompras().catch(() => []),
        api.getMovimientos().catch(() => []),
        api.getBitacora().catch(() => []),
      ]);

      setStats(statsRes);
      setUsuarios(usuariosRes);
      setVentas(ventasRes);
      setCompras(comprasRes);
      setMovimientos(movsRes);
      setBitacora(bitacoraRes);
    } catch (err) {
      console.error('Error cargando transacciones:', err);
    }
  }, []);

  const saveMovimiento = async (movData) => {
    await api.registrarMovimiento(movData);
    await loadTransactionData();
    if (onDataMutated) await onDataMutated();
  };

  const registrarVenta = async (ventaData) => {
    await api.registrarVenta(ventaData);
    await loadTransactionData();
    if (onDataMutated) await onDataMutated();
  };

  const registrarCompra = async (compraData) => {
    await api.registrarCompra(compraData);
    await loadTransactionData();
    if (onDataMutated) await onDataMutated();
  };

  return {
    stats,
    usuarios,
    ventas,
    compras,
    movimientos,
    bitacora,
    loadTransactionData,
    saveMovimiento,
    registrarVenta,
    registrarCompra,
  };
}
