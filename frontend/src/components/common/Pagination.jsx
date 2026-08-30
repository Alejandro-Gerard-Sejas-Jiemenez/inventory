import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from './Button';

export function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange,
  className = '',
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Si solo hay 1 página o menos, no mostrar controles innecesarios
  if (totalPages <= 1) {
    return null;
  }

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
