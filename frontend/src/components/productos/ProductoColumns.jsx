import React from 'react';
import { Edit, Trash2, ArrowUpDown, FolderTree } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function getProductoColumns({ onOpenMovimiento, onEdit, onDelete }) {
  return [
    {
      header: 'SKU',
      accessor: 'sku',
      width: '110px',
      render: (p) => <Badge variant="brand">{p.sku}</Badge>,
    },
    {
      header: 'Producto',
      accessor: 'nombre',
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {p.imagenUrl ? (
            <img
              src={p.imagenUrl}
              alt={p.nombre}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                flexShrink: 0,
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : null}
          <div>
            <strong style={{ color: 'var(--text-white)' }}>{p.nombre}</strong>
            {p.categoria?.nombre && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                <FolderTree size={12} style={{ color: 'var(--brand-gold)' }} />
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{p.categoria.nombre}</span>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      header: 'Modelo & Marca',
      render: (p) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {p.modelo?.nombre || '-'}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--brand-gold)' }}>
            {p.modelo?.marca?.nombre || 'Sin Marca'}
          </span>
        </div>
      ),
    },
    {
      header: 'Material & Color',
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {p.color?.codigoHex && (
            <span
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                backgroundColor: p.color.codigoHex,
                border: '1px solid rgba(255,255,255,0.3)',
                flexShrink: 0,
              }}
            />
          )}
          <span>
            {p.material?.nombre || '-'} {p.color ? `· ${p.color.nombre}` : ''}
          </span>
        </div>
      ),
    },
    {
      header: 'Precio Unit.',
      render: (p) => (
        <div>
          <strong style={{ color: 'var(--brand-gold)' }}>
            Bs. {Number(p.precioUnitario).toFixed(2)}
          </strong>
          {p.precioCompra && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Costo: Bs. {Number(p.precioCompra).toFixed(2)}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Stock Actual',
      render: (p) => {
        const isLow = p.stockActual <= p.stockMinimo;
        return (
          <div>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1rem',
                color: isLow ? 'var(--brand-red)' : 'var(--text-white)',
              }}
            >
              {p.stockActual}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {' '}
              / min {p.stockMinimo}
            </span>
          </div>
        );
      },
    },
    {
      header: 'Estado',
      render: (p) => {
        const isLow = p.stockActual <= p.stockMinimo;
        return (
          <Badge variant={isLow ? 'danger' : 'success'}>
            {isLow ? 'Stock Crítico' : 'Disponible'}
          </Badge>
        );
      },
    },
    {
      header: 'Acciones',
      align: 'right',
      width: '130px',
      render: (p) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.3rem' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenMovimiento(p)}
            title="Ajuste de Stock (Kardex)"
            icon={ArrowUpDown}
            style={{ color: 'var(--brand-gold)' }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(p)}
            title="Editar Producto"
            icon={Edit}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(p.idProducto)}
            title="Eliminar"
            icon={Trash2}
            style={{ color: 'var(--brand-red)' }}
          />
        </div>
      ),
    },
  ];
}
