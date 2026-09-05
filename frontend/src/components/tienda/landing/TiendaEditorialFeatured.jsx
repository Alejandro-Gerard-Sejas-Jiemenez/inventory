import React from 'react';
import { FeaturedCaseCard } from './FeaturedCaseCard';

/**
 * Sección Editorial de Productos Destacados (Fundas Reales).
 * Compone tarjetas editoriales reutilizables FeaturedCaseCard.
 */
export function TiendaEditorialFeatured({ productos = [], onOpenDetail }) {
  // Extraer las mejores fundas reales que cuenten con fotografía
  const featuredCases = React.useMemo(() => {
    if (!Array.isArray(productos) || productos.length === 0) return [];
    const withImages = productos.filter((p) => {
      return (Array.isArray(p.imagenes) && p.imagenes.length > 0 && p.imagenes[0]?.url) || p.imagenUrl;
    });
    return withImages.slice(0, 2);
  }, [productos]);

  // Fallbacks con fotografía real de alta resolución si la BD aún no cuenta con 2 productos con foto
  const case1 = featuredCases[0] || {
    nombre: 'Funda MagArmor Titanium Frosted',
    descripcion: 'Bisel de aleación reforzado para protección perimetral de cámaras, policarbonato mate anti-huellas y anillo magnético para soporte de carga ultrarresistente.',
    precioUnitario: 65,
    modelo: { nombre: 'iPhone 15 Pro Max' },
    material: { nombre: 'Titanio & Policarbonato' },
    imagenUrl: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?auto=format&fit=crop&w=800&q=80',
  };

  const case2 = featuredCases[1] || {
    nombre: 'Carcasa Tough ShockWave Anticaídas',
    descripcion: 'Estructura amortiguadora con esquinas de amortiguación Air-Cushion, acabado mate satinado y agarre antideslizante diseñado para resistir caídas de hasta 2 metros.',
    precioUnitario: 55,
    modelo: { nombre: 'Samsung Galaxy S24 Ultra' },
    material: { nombre: 'TPU Flexible & Acrílico' },
    imagenUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <section
      id="destacados"
      style={{
        padding: '4rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 1.4rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '4.5rem',
        }}
      >
        <FeaturedCaseCard
          funda={case1}
          indexBadge="01"
          tag="FUNDA DE ALTO IMPACTO"
          reverse={false}
          onOpenDetail={onOpenDetail}
        />

        <FeaturedCaseCard
          funda={case2}
          indexBadge="02"
          tag="SERIE SLIM MATTE"
          reverse={true}
          onOpenDetail={onOpenDetail}
        />
      </div>
    </section>
  );
}

export default TiendaEditorialFeatured;
