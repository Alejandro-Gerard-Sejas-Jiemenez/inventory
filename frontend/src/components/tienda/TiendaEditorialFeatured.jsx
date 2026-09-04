import React from 'react';
import { ArrowRight, Sparkles, Check, MessageCircle } from 'lucide-react';

/**
 * Sección Editorial de Productos Destacados basada en stitch_minimalist_tech_accessories_landing
 * Incluye Product 01 (Colección Titanium) y Product 02 (Audio Hi-Res & Gaming).
 */
export function TiendaEditorialFeatured({ onExploreCatalog }) {
  const handleWhatsAppDirect = (productText) => {
    const phone = '59174672312';
    const text = encodeURIComponent(`Hola Los Caseritos, deseo consultar por: ${productText}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
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
        {/* ========================================================= */}
        {/* Producto 01: Colección Titanium (Imagen Izq / Info Der)  */}
        {/* ========================================================= */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Visual Frame */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="stitch-editorial-frame" style={{ width: '100%', maxWidth: '380px' }}>
              <div
                style={{
                  width: '180px',
                  height: '310px',
                  borderRadius: '2.5rem',
                  backgroundColor: '#09090C',
                  border: '4px solid #22222E',
                  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.7)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '14px',
                      backgroundColor: '#000',
                      padding: '5px',
                      border: '2px solid #333340',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #F97316' }} />
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #F97316' }} />
                    </div>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#111', border: '1.5px solid #EF4444' }} />
                  </div>
                  <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 800, color: '#FB923C' }}>
                    MAGSAFE
                  </span>
                </div>

                <div
                  style={{
                    width: '86px',
                    height: '86px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    border: '2px dashed rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="font-headline" style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.12em', color: '#94A3B8' }}>
                    TITANIUM
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span className="font-headline text-gradient-fire" style={{ fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.12em' }}>
                    LOS CASERITOS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Editorial */}
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
              <span>COLECCIÓN TITANIUM</span>
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
              Funda MagArmor <span className="text-gradient-fire">Obsidian</span> Frosted
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
              Ajuste Milimétrico MagSafe & Bisel Antichoques
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
              Bisel de aleación de titanio elevado para protección perimetral del lente, policarbonato mate texturizado anti-huellas y anillo magnético interno de neodimio N52 para recarga rápida ultrarresistente.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
              <span className="font-headline" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
                Bs 65
              </span>

              <button
                type="button"
                onClick={() => handleWhatsAppDirect('Funda MagArmor Obsidian Frosted (Bs 65)')}
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
            </div>
          </div>
        </article>

        {/* ========================================================= */}
        {/* Producto 02: Audio Hi-Res (Info Izq / Imagen Der)         */}
        {/* ========================================================= */}
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Info Editorial */}
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
              <span>AUDIO HI-RES & GAMING</span>
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
              TWS SoundMatrix <span className="text-gradient-fire">ANC 40dB</span>
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
              Cancelación Activa & Sujeción Ergonómica
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
              32 horas de batería total en estuche mate, transductores dobles de grafeno de 10mm para bajos profundos y cuatro micrófonos ENC para llamadas nítidas sin ruido de calle o viento.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
              <span className="font-headline" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
                Bs 140
              </span>

              <button
                type="button"
                onClick={() => handleWhatsAppDirect('TWS SoundMatrix ANC 40dB (Bs 140)')}
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
            </div>
          </div>

          {/* Visual Frame: Pods & Case */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="stitch-editorial-frame" style={{ width: '100%', maxWidth: '380px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>
                <div
                  style={{
                    width: '180px',
                    height: '115px',
                    borderRadius: '2.2rem',
                    backgroundColor: '#09090C',
                    border: '2px solid #282838',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                  }}
                >
                  <div style={{ width: '40px', height: '3px', backgroundColor: '#333344', borderRadius: '999px' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F97316' }} />
                    <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#CBD5E1', fontWeight: 800 }}>SOUNDMATRIX</span>
                  </div>
                  <span className="font-headline" style={{ fontSize: '0.58rem', fontWeight: 900, color: 'var(--brand-gold)', letterSpacing: '0.1em' }}>
                    EDICIÓN CASERITOS
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '28px', height: '52px', backgroundColor: '#111', border: '1.5px solid #282838', borderRadius: '999px', display: 'flex', justifyContent: 'center', padding: '5px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #F97316' }} />
                  </div>
                  <div style={{ width: '28px', height: '52px', backgroundColor: '#111', border: '1.5px solid #282838', borderRadius: '999px', display: 'flex', justifyContent: 'center', padding: '5px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid #EF4444' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
