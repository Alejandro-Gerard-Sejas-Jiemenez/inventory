import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export function CategoriaModal({ isOpen, onClose, onSave, categoria }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre || '');
      setDescripcion(categoria.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
    setError('');
  }, [categoria, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onSave({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar la categoría');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{categoria ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(244,63,94,0.15)', color: '#fb7185', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Nombre de Categoría *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ej. Audio y Sonido"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="Descripción general de los productos contenidos..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={16} />
              {loading ? 'Guardando...' : 'Guardar Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
