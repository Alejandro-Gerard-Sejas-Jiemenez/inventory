import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FooterBrandCol } from './FooterBrandCol';
import { FooterCategoriesCol } from './FooterCategoriesCol';
import { FooterContactCol } from './FooterContactCol';

/**
 * Pie de página oficial con índices estructurados y branding corporativo.
 * Responsabilidad: Orquestar el footer general de la tienda pública.
 */
export function TiendaFooter({ categorias = [] }) {
  const activeCategorias = useMemo(() => {
    return (categorias || []).filter((c) => c.activo !== false && c.estado !== false);
  }, [categorias]);

  return (
    <footer
      style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-light)',
        backgroundColor: '#070709',
        padding: '3.5rem 1.4rem 1.8rem',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Grilla Principal de Índices */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Columna 1: Branding Los Caseritos */}
          <FooterBrandCol />

          {/* Columna 2: Índice de Categorías */}
          <FooterCategoriesCol activeCategorias={activeCategorias} />

          {/* Columna 3: Enlaces de Navegación del Sitio */}
          <div>
            <h4
              className="font-headline"
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--text-white)',
                fontWeight: 800,
                margin: '0 0 1.1rem',
              }}
            >
              Navegación
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link
                  to="/"
                  style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/catalogo"
                  style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Todas las Fundas
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Panel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Atención Directa por WhatsApp */}
          <FooterContactCol />
        </div>

        {/* Barra Inferior de Derechos */}
        <div
          style={{
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.8rem',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Los Caseritos · Catálogo Digital y Venta de Fundas.
          </div>
          <div>
            Diseñado para máxima velocidad y protección de tu dispositivo.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default TiendaFooter;
