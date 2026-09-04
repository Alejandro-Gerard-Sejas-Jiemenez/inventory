import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

/**
 * Hero Section Oficial basado en stitch_minimalist_tech_accessories_landing
 * Tipografía Space Grotesk/Sora, degradado fire y composición visual limpia.
 */
export function TiendaLandingHero({ onExploreCatalog, onExploreFeatured }) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '2.5rem 0 3.5rem',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.4rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {/* Columna Izquierda: Editorial */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {/* Tagline con barra de gradiente */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <span
                style={{
                  width: '32px',
                  height: '4px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #FF6B00 0%, #EF4444 100%)',
                }}
              />
              <span
                className="font-headline"
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  fontWeight: 800,
                  color: 'var(--brand-gold)',
                }}
              >
                PROTECCIÓN · AJUSTE · PRECISIÓN
              </span>
            </div>

            {/* Titular Principal */}
            <h1
              className="font-headline"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 900,
                color: 'var(--text-white)',
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                margin: '0 0 1.2rem',
              }}
            >
              Protección que <br />
              se siente <span className="text-gradient-fire" style={{ fontStyle: 'italic' }}>tuya.</span>
            </h1>

            {/* Subtítulo */}
            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.6vw, 1.08rem)',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.55,
                margin: '0 0 1.8rem',
              }}
            >
              Una selección milimétrica de fundas antichoque, carcasas de auriculares y audio inalámbrico para proteger y elevar tu día a día.
            </p>

            {/* Botones de Acción (CTAs) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={onExploreCatalog}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--text-white)',
                  color: '#0A0A0C',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span>Explorar catálogo</span>
                <ArrowRight size={16} style={{ color: '#F97316' }} />
              </button>

              <button
                type="button"
                onClick={onExploreFeatured}
                className="apple-btn-tactile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.82rem 1.6rem',
                  borderRadius: '999px',
                  backgroundColor: 'transparent',
                  color: 'var(--text-white)',
                  border: '1.5px solid rgba(249, 115, 22, 0.4)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                Ver destacados
              </button>
            </div>
          </div>

          {/* Columna Derecha: Composición Visual Stitch */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Aura Orgánica de Fondo con Brillo Naranja/Rojo */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.22) 0%, rgba(239, 68, 68, 0.12) 50%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Mockup de Funda Titanium Obsidian */}
            <div
              className="apple-glass-card"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '360px',
                padding: '1.6rem',
                borderRadius: '2.5rem',
                border: '1.5px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 'var(--shadow-bento), 0 20px 40px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Carcasa Mockup Frontal */}
              <div
                style={{
                  width: '190px',
                  height: '320px',
                  borderRadius: '2.4rem',
                  backgroundColor: '#0A0A0E',
                  border: '4px solid #282834',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  position: 'relative',
                }}
              >
                {/* Módulo de Cámara Titanium */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '58px',
                      height: '58px',
                      borderRadius: '14px',
                      backgroundColor: '#000000',
                      padding: '6px',
                      border: '2px solid #333344',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #F97316' }} />
                      <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #F97316' }} />
                    </div>
                    <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #EF4444' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', fontWeight: 800, color: '#FB923C' }}>
                    MAGSAFE
                  </span>
                </div>

                {/* Anillo de inducción magnética */}
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="font-headline" style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.15em', color: '#94A3B8' }}>
                    TITANIUM
                  </span>
                </div>

                {/* Marca inferior */}
                <div style={{ textAlign: 'center' }}>
                  <span className="font-headline text-gradient-fire" style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em' }}>
                    LOS CASERITOS
                  </span>
                </div>
              </div>

              {/* Insignia Flotante Obsidian */}
              <div
                style={{
                  marginTop: '1.2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '999px',
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-white)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <Sparkles size={13} style={{ color: 'var(--brand-gold)' }} />
                <span>Obsidian Finish • MagArmor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
