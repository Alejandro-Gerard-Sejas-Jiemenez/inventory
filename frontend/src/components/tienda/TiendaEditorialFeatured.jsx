import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, Eye } from 'lucide-react';

/**
 * Sección Editorial de Productos Destacados (Fundas Reales).
 * Renderiza fotografías auténticas de fundas del inventario con diseño editorial de alto nivel.
 */
export function TiendaEditorialFeatured({ productos = [], onOpenDetail, onExploreCatalog }) {
  const handleWhatsAppDirect = (productText) => {
    const phone = '59174672312';
    const text = encodeURIComponent(`Hola Los Caseritos, deseo consultar por la funda: ${productText}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

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

  const img1 = (case1.imagenes && case1.imagenes.length > 0 && case1.imagenes[0]?.url) || case1.imagenUrl;
  const img2 = (case2.imagenes && case2.imagenes.length > 0 && case2.imagenes[0]?.url) || case2.imagenUrl;

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
        {/* ========================================================= */}
        {/* Funda 01: Foto Izquierda / Información Derecha            */}
        {/* ========================================================= */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Fotografía Real de la Funda 01 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="apple-glass-card"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '1.2rem',
                borderRadius: '2.5rem',
                boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1.15',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  backgroundColor: '#09090D',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <img
                  src={img1}
                  alt={case1.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Información Editorial de la Funda 01 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              className="font-headline"
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--brand-red)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.6rem',
              }}
            >
              <span>01</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-gold)' }} />
              <span>FUNDA DE ALTO IMPACTO</span>
            </div>

            <h2
              className="font-headline"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 900,
                color: 'var(--text-white)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 0.5rem',
              }}
            >
              {case1.nombre}
            </h2>

            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-gold)',
                marginBottom: '1rem',
              }}
            >
              {case1.modelo?.nombre ? `Modelo: ${case1.modelo.nombre}` : 'Ajuste Antichoque Certificado'}
              {case1.material?.nombre && ` · ${case1.material.nombre}`}
            </span>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 1.6rem',
                maxWidth: '520px',
              }}
            >
              {case1.descripcion}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="font-headline" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
                Bs {case1.precioUnitario}
              </span>

              <button
                type="button"
                onClick={() => handleWhatsAppDirect(`${case1.nombre} (Bs ${case1.precioUnitario})`)}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--text-white)',
                  color: '#0A0A0C',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <MessageCircle size={15} style={{ color: 'var(--brand-green)' }} />
                <span>Pedir por WhatsApp</span>
              </button>

              {onOpenDetail && case1.idProducto && (
                <button
                  type="button"
                  onClick={() => onOpenDetail(case1)}
                  className="apple-btn-tactile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.72rem 1.2rem',
                    borderRadius: '999px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  <Eye size={14} />
                  <span>Ver Detalle</span>
                </button>
              )}
            </div>
          </div>
        </article>

        {/* ========================================================= */}
        {/* Funda 02: Información Izquierda / Foto Derecha            */}
        {/* ========================================================= */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Información Editorial de la Funda 02 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              className="font-headline"
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--brand-red)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.6rem',
              }}
            >
              <span>02</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-gold)' }} />
              <span>SERIE SLIM MATTE</span>
            </div>

            <h2
              className="font-headline"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                fontWeight: 900,
                color: 'var(--text-white)',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                margin: '0 0 0.5rem',
              }}
            >
              {case2.nombre}
            </h2>

            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--brand-gold)',
                marginBottom: '1rem',
              }}
            >
              {case2.modelo?.nombre ? `Modelo: ${case2.modelo.nombre}` : 'Protección de Grado Militar'}
              {case2.material?.nombre && ` · ${case2.material.nombre}`}
            </span>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: '0 0 1.6rem',
                maxWidth: '520px',
              }}
            >
              {case2.descripcion}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span className="font-headline" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
                Bs {case2.precioUnitario}
              </span>

              <button
                type="button"
                onClick={() => handleWhatsAppDirect(`${case2.nombre} (Bs ${case2.precioUnitario})`)}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--text-white)',
                  color: '#0A0A0C',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <MessageCircle size={15} style={{ color: 'var(--brand-green)' }} />
                <span>Pedir por WhatsApp</span>
              </button>

              {onOpenDetail && case2.idProducto && (
                <button
                  type="button"
                  onClick={() => onOpenDetail(case2)}
                  className="apple-btn-tactile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.72rem 1.2rem',
                    borderRadius: '999px',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  <Eye size={14} />
                  <span>Ver Detalle</span>
                </button>
              )}
            </div>
          </div>

          {/* Fotografía Real de la Funda 02 */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className="apple-glass-card"
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '1.2rem',
                borderRadius: '2.5rem',
                boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1.15',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  backgroundColor: '#09090D',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <img
                  src={img2}
                  alt={case2.nombre}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default TiendaEditorialFeatured;
