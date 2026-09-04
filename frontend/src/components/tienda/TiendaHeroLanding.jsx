import React from 'react';
import { Sparkles, ShoppingBag, Send, Truck, ShieldCheck, Zap, Smartphone } from 'lucide-react';

/**
 * Sección Hero Landing Page inspirada en vgom.vercel.app
 * Presenta el catálogo de forma atractiva con valor agregado y accesos rápidos.
 */
export function TiendaHeroLanding({ onExploreCatalog, onOpenWhatsAppCheckout }) {
  return (
    <section
      style={{
        maxWidth: '1280px',
        margin: '1.2rem auto 0.6rem',
        padding: '0 1.4rem',
        width: '100%',
      }}
    >
      <div
        className="apple-glass-card"
        style={{
          position: 'relative',
          padding: '2.5rem 2rem',
          borderRadius: 'var(--radius-xl)',
          background:
            'linear-gradient(135deg, rgba(220, 38, 38, 0.12) 0%, var(--bg-card) 50%, rgba(245, 158, 11, 0.12) 100%)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-bento)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.2rem',
        }}
      >
        {/* Glows Decorativos de Fondo */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '20%',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            right: '20%',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Insignia Flotante estilo Apple */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            backgroundColor: 'var(--brand-gold-bg)',
            border: '1px solid var(--border-color)',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--brand-gold)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            boxShadow: '0 2px 10px rgba(245, 158, 11, 0.15)',
          }}
        >
          <Sparkles size={14} />
          <span>Los Caseritos • Fundas & Accesorios Premium</span>
        </div>

        {/* Titular Principal */}
        <h1
          className="apple-hero-title"
          style={{
            margin: 0,
            fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
            color: 'var(--text-white)',
            maxWidth: '820px',
            lineHeight: 1.15,
          }}
        >
          Protege tu Smartphone con{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, var(--brand-gold) 0%, #EF4444 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Estilo Único
          </span>{' '}
          y Calidad
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            margin: 0,
            fontSize: 'clamp(0.88rem, 1.6vw, 1.05rem)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            lineHeight: 1.5,
          }}
        >
          Colecciones exclusivas de fundas anti-golpes, micas de vidrio y accesorios para iPhone, Samsung y Xiaomi.
          Pide tus modelos favoritos directamente por WhatsApp con entrega rápida.
        </p>

        {/* Botones de Acción Inmediata (CTA) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            flexWrap: 'wrap',
            marginTop: '0.4rem',
          }}
        >
          <button
            type="button"
            onClick={onExploreCatalog}
            className="apple-btn-tactile"
            style={{
              padding: '0.75rem 1.6rem',
              borderRadius: '999px',
              border: 'none',
              backgroundColor: 'var(--brand-gold)',
              color: '#111',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px var(--brand-gold-glow)',
            }}
          >
            <ShoppingBag size={18} />
            <span>Explorar Catálogo</span>
          </button>

          <button
            type="button"
            onClick={onOpenWhatsAppCheckout}
            className="apple-btn-tactile"
            style={{
              padding: '0.75rem 1.4rem',
              borderRadius: '999px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-glass)',
              color: 'var(--text-white)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Send size={16} style={{ color: 'var(--brand-green)' }} />
            <span>Pedir por WhatsApp</span>
          </button>
        </div>

        {/* Fila de Tarjetas de Valor Agregado */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem',
            width: '100%',
            marginTop: '1.2rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.9rem',
              backgroundColor: 'var(--bg-glass)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            <Truck size={18} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
            <span>Envíos Rápidos en la ciudad</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.9rem',
              backgroundColor: 'var(--bg-glass)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            <ShieldCheck size={18} style={{ color: 'var(--brand-green)', flexShrink: 0 }} />
            <span>Garantía de Calidad y Ajuste</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.9rem',
              backgroundColor: 'var(--bg-glass)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            <Zap size={18} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
            <span>Atención Personalizada 24/7</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.9rem',
              backgroundColor: 'var(--bg-glass)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            <Smartphone size={18} style={{ color: 'var(--brand-red)', flexShrink: 0 }} />
            <span>500+ Modelos Disponibles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
