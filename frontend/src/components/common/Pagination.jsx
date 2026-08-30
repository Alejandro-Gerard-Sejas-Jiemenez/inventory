import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';

export function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  className = '',
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generar array de números de páginas visibles
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`custom-pagination-container ${className}`}>
      {/* Resumen de Registros */}
      <div className="pagination-info">
        <span>Mostrando <strong>{startItem}</strong> - <strong>{endItem}</strong> de <strong>{totalItems}</strong> registros</span>
        {onPageSizeChange && (
          <div className="pagination-page-size-wrapper">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Filas por pág:</span>
            <select
              className="pagination-page-size-select"
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(parseInt(e.target.value, 10));
                onPageChange(1);
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Controles de Navegación de Páginas */}
      <div className="pagination-controls">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
          title="Primera página"
          icon={ChevronsLeft}
          className="pagination-nav-btn"
        />
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          title="Página anterior"
          icon={ChevronLeft}
          className="pagination-nav-btn"
        />

        <div className="pagination-pages-list">
          {pages.map((p) => {
            const isCurrent = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                className={`pagination-page-btn ${isCurrent ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          title="Página siguiente"
          icon={ChevronRight}
          className="pagination-nav-btn"
        />
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          title="Última página"
          icon={ChevronsRight}
          className="pagination-nav-btn"
        />
      </div>
    </div>
  );
}
