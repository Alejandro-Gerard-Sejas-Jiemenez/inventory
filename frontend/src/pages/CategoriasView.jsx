import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tags, Layers } from 'lucide-react';

export function CategoriasView({ categorias, productos, onOpenNew, onEdit, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  const getProductCount = (categoriaId) => {
    return productos.filter((p) => p.categoria?.id === categoriaId).length;
  };

  const handleDeleteClick = async (id, nombre) => {
    const count = getProductCount(id);
    if (count > 0) {
      alert(`No se puede eliminar la categoría "${nombre}" porque contiene ${count} producto(s) asignado(s).`);
      return;
    }

    if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría "${nombre}"?`)) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="controls-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Tags size={22} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Categorías del Inventario</h3>
        </div>

        <button className="btn btn-primary" onClick={onOpenNew}>
          <Plus size={16} />
          Nueva Categoría
        </button>
      </div>

      <div className="content-card">
        <div className="table-responsive">
          {categorias.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Productos Asociados</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((c) => {
                  const count = getProductCount(c.id);
                  return (
                    <tr key={c.id}>
                      <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        #{c.id}
                      </td>
                      <td>
                        <strong>{c.nombre}</strong>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>
                        {c.descripcion || '—'}
                      </td>
                      <td>
                        <span className="badge badge-indigo">
                          {count} {count === 1 ? 'producto' : 'productos'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-secondary btn-icon"
                            title="Editar"
                            onClick={() => onEdit(c)}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            className="btn btn-danger btn-icon"
                            title="Eliminar"
                            disabled={deletingId === c.id}
                            onClick={() => handleDeleteClick(c.id, c.nombre)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <Layers size={40} />
              <p>No existen categorías registradas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
