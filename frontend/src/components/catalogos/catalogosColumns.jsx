import React from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const renderStatus = (isActive) => (
  <Badge variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Activo' : 'Inactivo'}</Badge>
);

export const renderActions = (id, isActive, onDelete, onRestore) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
    {isActive ? (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        style={{ color: 'var(--brand-red)' }}
        icon={Trash2}
        aria-label="Desactivar"
      />
    ) : (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRestore(id)}
        style={{ color: 'var(--brand-green)' }}
        icon={RefreshCw}
        aria-label="Restaurar"
      />
    )}
  </div>
);

export function getCategoriaColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idCategoria', width: '70px', render: (cat) => <span style={{ color: 'var(--text-muted)' }}>#{cat.idCategoria}</span> },
    { header: 'Categoría', accessor: 'nombre', render: (cat) => <strong style={{ color: 'var(--text-white)' }}>{cat.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (cat) => <span style={{ color: 'var(--text-secondary)' }}>{cat.descripcion || '-'}</span> },
    { header: 'Estado', render: (cat) => renderStatus(cat.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (cat) => renderActions(cat.idCategoria, cat.activo !== false, onDelete, onRestore),
    },
  ];
}

export function getMarcaColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idMarca', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMarca}</span> },
    { header: 'Marca / Fabricante', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idMarca, m.activo !== false, onDelete, onRestore),
    },
  ];
}

export function getModeloColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idModelo', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idModelo}</span> },
    { header: 'Modelo', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    {
      header: 'Marca Fabricante',
      render: (m) => <Badge variant="brand">{m.marca?.nombre || 'Genérica'}</Badge>,
    },
    { header: 'Descripción', accessor: 'descripcion', render: (m) => <span style={{ color: 'var(--text-secondary)' }}>{m.descripcion || '-'}</span> },
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idModelo, m.activo !== false, onDelete, onRestore),
    },
  ];
}

export function getMaterialColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idMaterial', width: '70px', render: (m) => <span style={{ color: 'var(--text-muted)' }}>#{m.idMaterial}</span> },
    { header: 'Material', accessor: 'nombre', render: (m) => <strong style={{ color: 'var(--text-white)' }}>{m.nombre}</strong> },
    { header: 'Descripción', accessor: 'descripcion', render: (m) => <span style={{ color: 'var(--text-secondary)' }}>{m.descripcion || '-'}</span> },
    { header: 'Estado', render: (m) => renderStatus(m.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (m) => renderActions(m.idMaterial, m.activo !== false, onDelete, onRestore),
    },
  ];
}

export function getColorColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idColor', width: '70px', render: (c) => <span style={{ color: 'var(--text-muted)' }}>#{c.idColor}</span> },
    {
      header: 'Muestra',
      width: '80px',
      render: (c) => (
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: c.codigoHex || 'var(--text-muted)',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        />
      ),
    },
    { header: 'Color', accessor: 'nombre', render: (c) => <strong style={{ color: 'var(--text-white)' }}>{c.nombre}</strong> },
    { header: 'HEX', accessor: 'codigoHex', render: (c) => <code>{c.codigoHex || '-'}</code> },
    { header: 'Estado', render: (c) => renderStatus(c.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (c) => renderActions(c.idColor, c.activo !== false, onDelete, onRestore),
    },
  ];
}

export function getPropietarioColumns(onDelete, onRestore) {
  return [
    { header: 'ID', accessor: 'idPropietario', width: '70px', render: (p) => <span style={{ color: 'var(--text-muted)' }}>#{p.idPropietario}</span> },
    { header: 'Propietario / Dueño', accessor: 'nombre', render: (p) => <strong style={{ color: 'var(--text-white)' }}>{p.nombre}</strong> },
    { header: 'Estado', render: (p) => renderStatus(p.activo !== false) },
    {
      header: 'Acción',
      align: 'right',
      width: '100px',
      render: (p) => renderActions(p.idPropietario, p.activo !== false, onDelete, onRestore),
    },
  ];
}
