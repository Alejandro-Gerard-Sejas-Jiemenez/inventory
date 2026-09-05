import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Shield, Smartphone, ArrowUpRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';

/**
 * Pie de página oficial con índices estructurados y branding corporativo.
 */
export function TiendaFooter({ categorias = [] }) {
  const activeCategorias = React.useMemo(() => {
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div className="brand-logo-badge" style={{ width: '32px', height: '32px' }}>
                <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <span className="font-headline" style={{ fontSize: '1.1rem', color: 'var(--text-white)', fontWeight: 900, letterSpacing: '0.04em' }}>
                LOS CASERITOS
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '280px' }}>
              Especialistas en fundas, carcasas anticaídas y accesorios de protección milimétrica para celulares de alta gama.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--brand-gold)', fontSize: '0.76rem', fontWeight: 700 }}>
              <Shield size={14} />
              <span>Ajuste Exacto Garantizado</span>
            </div>
          </div>

          {/* Columna 2: Índice de Categorías */}
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
              Categorías
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {activeCategorias.length === 0 ? (
                <li style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cargando catálogo...</li>
              ) : (
                activeCategorias.map((c) => (
                  <li key={c.idCategoria}>
                    <Link
                      to={`/categoria/${c.idCategoria}`}
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-gold)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {c.nombre}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Columna 3: Enlaces del Sitio */}
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
              Atención & Pedidos
            </h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              ¿Tienes dudas con el modelo de tu teléfono? Escríbenos directamente para confirmar compatibilidad.
            </p>
            <a
              href="https://wa.me/59174672312?text=Hola%20Los%20Caseritos,%20deseo%20consultar%20por%20una%20funda"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-tactile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.1rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(37, 211, 102, 0.12)',
                border: '1px solid rgba(37, 211, 102, 0.35)',
                color: 'var(--brand-green)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              <MessageCircle size={15} />
              <span>+591 74672312</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
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
