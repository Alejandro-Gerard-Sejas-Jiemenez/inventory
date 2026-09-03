import React from 'react';
import { Edit, Trash2, ArrowUpDown, FolderTree, Copy } from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export function getProductoColumns({ onOpenMovimiento, onEdit, onDelete, onDuplicate }) {
  return [
    {
      header: 'SKU / Ref',
      width: '120px',
      render: (p) => {
        if (!p.variantes || p.variantes.length === 0) return <Badge variant="neutral">Sin Variantes</Badge>;
        if (p.variantes.length === 1) return <Badge variant="brand">{p.variantes[0].sku}</Badge>;
        return <Badge variant="brand">+{p.variantes.length} Variantes</Badge>;
      },
    },
    {
      header: 'Producto',
      accessor: 'nombre',
      render: (p) => {
        const mainImg = (p.imagenes && p.imagenes.length > 0 && p.imagenes[0]?.url) || p.imagenUrl;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {mainImg ? (
              <img
                src={mainImg}
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
        );
      },
    },
    {
      header: 'Detalles (Variantes)',
      render: (p) => {
        if (!p.variantes || p.variantes.length === 0) return <span style={{ color: 'var(--text-muted)' }}>-</span>;
        if (p.variantes.length === 1) {
            const v = p.variantes[0];
            return (
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {v.modelo?.nombre || '-'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  {v.color?.codigoHex && (
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        backgroundColor: v.color.codigoHex,
                        border: '1px solid rgba(255,255,255,0.3)',
                      }}
                    />
                  )}
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-gold)' }}>
                    {v.color ? v.color.nombre : 'Sin color'}
                  </span>
                </div>
              </div>
            );
        }
        return <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Múltiples Modelos/Colores</span>;
      },
    },
    {
      header: 'Precios',
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
      header: 'Stock Total',
      render: (p) => {
        if (!p.variantes || p.variantes.length === 0) return <span>0</span>;
        const totalStock = p.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0);
        const minStock = p.variantes.reduce((sum, v) => sum + (v.stockMinimo || 0), 0);
        const isLow = totalStock <= minStock;
        return (
          <div>
            <span
              style={{
                fontWeight: 800,
                fontSize: '1rem',
                color: isLow ? 'var(--brand-red)' : 'var(--text-white)',
              }}
            >
              {totalStock}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {' '}
              / min {minStock}
            </span>
          </div>
        );
      },
    },
    {
      header: 'Estado',
      render: (p) => {
        if (!p.variantes || p.variantes.length === 0) return <Badge variant="neutral">Sin Stock</Badge>;
        const totalStock = p.variantes.reduce((sum, v) => sum + (v.stockActual || 0), 0);
        const minStock = p.variantes.reduce((sum, v) => sum + (v.stockMinimo || 0), 0);
        const isLow = totalStock <= minStock;
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
      width: '140px',
      render: (p) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.3rem' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenMovimiento(p)}
            title="Ajuste Rápido de Stock (Entrada / Salida)"
            icon={ArrowUpDown}
            style={{ color: 'var(--brand-gold)' }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(p)}
            title="Administrar Producto y Variantes"
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
