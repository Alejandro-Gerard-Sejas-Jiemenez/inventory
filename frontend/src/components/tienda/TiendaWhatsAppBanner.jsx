import React from 'react';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

/**
 * Banner de Asistencia Directa y Consulta por WhatsApp estilo CASETiFY
 */
export function TiendaWhatsAppBanner() {
  const handleOpenWhatsApp = () => {
    const phone = '59174672312';
    const text = encodeURIComponent('Hola Los Caseritos, quisiera consultar si tienen fundas disponibles para mi modelo de celular.');
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <section
      style={{
        padding: '3rem 0',
        backgroundColor: '#0A0A0E',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.4rem' }}>
        <div
          className="apple-glass-card"
          style={{
            padding: '2.5rem 2rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, #121218 60%, rgba(16, 185, 129, 0.08) 100%)',
            border: '1.5px solid rgba(249, 115, 22, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.2rem',
            boxShadow: 'var(--shadow-bento)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.8rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--brand-green)',
              fontSize: '0.74rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} />
            <span>Asistencia Personalizada Inmediata</span>
          </div>

          <h2
            className="font-headline"
            style={{
              margin: 0,
              fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
              fontWeight: 900,
              color: 'var(--text-white)',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
            }}
          >
            ¿No encuentras tu modelo exacto o buscas un color especial?
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: 'clamp(0.85rem, 1.4vw, 0.96rem)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              lineHeight: 1.5,
            }}
          >
            Escríbenos directamente por WhatsApp y te enviamos fotos reales del stock disponible para tu teléfono en menos de 5 minutos.
          </p>

          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="apple-btn-tactile"
            style={{
              marginTop: '0.4rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 1.8rem',
              borderRadius: '999px',
              backgroundColor: '#10B981',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.3)',
            }}
          >
            <MessageCircle size={18} />
            <span>Consultar Disponibilidad por WhatsApp</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
