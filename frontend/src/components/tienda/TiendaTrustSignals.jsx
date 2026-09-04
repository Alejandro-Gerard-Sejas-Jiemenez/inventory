import React from 'react';
import { MessageCircle, MapPin, ShieldCheck, Headphones } from 'lucide-react';

/**
 * Barra de Señales de Confianza y Garantía basada en stitch_minimalist_tech_accessories_landing
 */
export function TiendaTrustSignals() {
  return (
    <section
      id="garantia"
      style={{
        padding: '3.5rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {/* Señal 1: WhatsApp */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                color: 'var(--brand-gold)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.8rem',
              }}
            >
              <MessageCircle size={22} />
            </div>
            <h4 className="font-headline" style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-white)', margin: '0 0 0.25rem' }}>
              Pedido por WhatsApp
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Rápido, visual y personal
            </p>
          </div>

          {/* Señal 2: Entrega Coordinada */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: 'var(--brand-red)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.8rem',
              }}
            >
              <MapPin size={22} />
            </div>
            <h4 className="font-headline" style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-white)', margin: '0 0 0.25rem' }}>
              Entrega coordinada
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              En el día a tu ubicación exacta
            </p>
          </div>

          {/* Señal 3: Ajuste Garantizado */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                color: 'var(--brand-gold)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.8rem',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <h4 className="font-headline" style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-white)', margin: '0 0 0.25rem' }}>
              Ajuste garantizado
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Probado físicamente en cada modelo
            </p>
          </div>

          {/* Señal 4: Asesoría Directa */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: 'var(--brand-green)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.8rem',
              }}
            >
              <Headphones size={22} />
            </div>
            <h4 className="font-headline" style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-white)', margin: '0 0 0.25rem' }}>
              Asesoría personalizada
            </h4>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Atención directa sin intermediarios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
