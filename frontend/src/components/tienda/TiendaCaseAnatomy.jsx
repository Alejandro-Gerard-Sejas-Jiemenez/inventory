import React from 'react';
import { Shield, Sparkles, Compass, Zap, Eye, CheckCircle2 } from 'lucide-react';

/**
 * Sección de Anatomía de Protección estilo CASETiFY ("Why CASETiFY")
 * Desglose de ingeniería en 4 capas para generar máxima confianza de compra.
 */
export function TiendaCaseAnatomy() {
  const pillars = [
    {
      icon: <Eye size={24} style={{ color: '#F97316' }} />,
      tag: 'PROTECCIÓN ÓPTICA',
      title: 'Bisel Elevado +1.5mm',
      desc: 'Anillo perimetral sobreelevado que protege los lentes de tu cámara y la pantalla contra rayones al apoyar el teléfono boca abajo.',
    },
    {
      icon: <Shield size={24} style={{ color: '#EF4444' }} />,
      tag: 'CERTIFICACIÓN MILITAR',
      title: 'Esquinas Air-Cushion 2.5m',
      desc: 'Bolsas de aire en las 4 esquinas que disipan la energía cinética de caídas y golpes antes de que alcancen el chasis del celular.',
    },
    {
      icon: <Sparkles size={24} style={{ color: 'var(--brand-gold)' }} />,
      tag: 'TACTO SEDOSO',
      title: 'Mate Anti-Amarilleo',
      desc: 'Tratamiento UV de policarbonato alemán anti-huellas y anti-oleosidad. Nunca se torna amarillo con el paso de los meses.',
    },
    {
      icon: <Zap size={24} style={{ color: '#24FFCD' }} />,
      tag: 'MAGNÉTICO N52',
      title: 'Alineación MagSafe',
      desc: 'Anillo interno de 36 imanes de neodimio grado N52 para recarga inalámbrica ultra-veloz y compatibilidad total con soportes y billeteras.',
    },
  ];

  return (
    <section
      style={{
        padding: '4.5rem 0',
        backgroundColor: '#09090D',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
        {/* Encabezado */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <span
            className="font-headline"
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'var(--brand-gold)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            INGENIERÍA CASERITOS
          </span>
          <h2
            className="font-headline"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 900,
              color: 'var(--text-white)',
              letterSpacing: '-0.025em',
              margin: '0 0 0.8rem',
            }}
          >
            Protección probada en <span className="text-gradient-fire">4 capas</span>
          </h2>
          <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Diseñamos cada funda milimétricamente para que resista el impacto diario sin comprometer la silueta de tu teléfono.
          </p>
        </div>

        {/* 4 Pilares en Cuadrícula */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.4rem',
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="apple-glass-card"
              style={{
                padding: '1.8rem 1.5rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: '#111',
                  border: '1.5px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {p.icon}
              </div>

              <div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--brand-gold)',
                    display: 'block',
                    marginBottom: '0.25rem',
                  }}
                >
                  {p.tag}
                </span>
                <h3
                  className="font-headline"
                  style={{
                    fontSize: '1.12rem',
                    fontWeight: 800,
                    color: 'var(--text-white)',
                    margin: '0 0 0.45rem',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
