import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Pagination } from './Pagination';
import { InputField } from './InputField';

export function DataTable({
  columns = [],
  data = [],
  keyExtractor = (item, idx) => item.id || item.idProducto || item.idModelo || item.idMaterial || item.idColor || item.idCategoria || item.idMarca || item.name || idx,
  loading = false,
  emptyMessage = 'No se encontraron registros',
  showPagination = true,
  defaultPageSize = 5,
  showSearch = false,
  searchPlaceholder = 'Buscar en los registros...',
  className = '',
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filtrado interno si showSearch está activo
  const filteredData = useMemo(() => {
    if (!showSearch || !searchTerm.trim()) {
      return data;
    }
    const query = searchTerm.toLowerCase().trim();
    return data.filter((item) => {
      return Object.values(item).some((val) => {
        if (val === null || val === undefined) return false;
        if (typeof val === 'object') {
          return Object.values(val).some(
            (nestedVal) => nestedVal && String(nestedVal).toLowerCase().includes(query)
          );
        }
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchTerm, showSearch]);

  // Paginación
  const paginatedData = useMemo(() => {
    if (!showPagination) return filteredData;
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, showPagination, currentPage, pageSize]);

  return (
    <div className={`data-table-container ${className}`}>
      {/* Barra de Búsqueda Integrada */}
      {showSearch && (
        <div style={{ marginBottom: '1rem', maxWidth: '360px' }}>
          <InputField
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            icon={Search}
          />
        </div>
      )}

      {/* Tabla Responsiva */}
      <div className="data-table-wrapper">
        <table className="custom-data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} style={{ textAlign: col.align || 'left', width: col.width || 'auto' }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="table-loading-cell">
                  <div className="table-loading-spinner">Cargando datos...</div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="table-empty-cell">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIdx) => (
                <tr key={keyExtractor(item, rowIdx)}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} style={{ textAlign: col.align || 'left' }}>
                      {col.render ? col.render(item, rowIdx) : item[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      {showPagination && filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
    </div>
  );
}
