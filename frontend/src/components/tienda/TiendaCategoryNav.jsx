import React from 'react';
import { Layers, Laptop, Smartphone, Shield, Headphones, Sparkles } from 'lucide-react';

/**
 * Helper para asignar icono contextual a la categoría
 */
function getCategoryIcon(nombre) {
  const n = (nombre || '').toLowerCase();
  if (n.includes('laptop') || n.includes('portat') || n.includes('comput')) return <Laptop size={18} />;
  if (n.includes('smart') || n.includes('celular') || n.includes('telef')) return <Smartphone size={18} />;
  if (n.includes('funda') || n.includes('case') || n.includes('protec')) return <Shield size={18} />;
  if (n.includes('audio') || n.includes('auricular') || n.includes('head')) return <Headphones size={18} />;
  return <Sparkles size={18} />;
}

/**
 * Fila horizontal de navegación de categorías estilo Airbnb.
 * Responsabilidad: Filtrado rápido por categoría con subrayado activo y desplazamiento táctil.
 */
export function TiendaCategoryNav({ categorias = [], selectedCategoria, onSelectCategoria }) {
  return (
    <section style={{ maxWidth: '1280px', margin: '0.6rem auto 0', padding: '0 1.4rem', width: '100%' }}>
      <div className="airbnb-category-nav">
        <button
          type="button"
          onClick={() => onSelectCategoria('ALL')}
          className={`airbnb-category-item ${selectedCategoria === 'ALL' ? 'active' : ''}`}
        >
          <Layers size={20} />
          <span>Todo</span>
        </button>

        {categorias.map((c) => {
          const isSelected = String(selectedCategoria) === String(c.idCategoria);
          return (
            <button
              key={c.idCategoria}
              type="button"
              onClick={() => onSelectCategoria(c.idCategoria)}
              className={`airbnb-category-item ${isSelected ? 'active' : ''}`}
            >
              {getCategoryIcon(c.nombre)}
              <span>{c.nombre}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
