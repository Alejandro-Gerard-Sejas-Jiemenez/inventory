import React from 'react';
import { Truck, ShieldCheck, MessageCircle } from 'lucide-react';

/**
 * Top Announcement Ribbon estilo CASETiFY / BURGA
 * Mensajes de confianza de alto impacto con ticker sutil.
 */
export function TiendaAnnouncementBar() {
  return (
    <aside
      style={{
        backgroundColor: '#09090D',
        color: '#CBD5E1',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        padding: '0.45rem 1rem',
        fontSize: '0.74rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.4rem',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Truck size={13} style={{ color: 'var(--brand-gold)' }} />
          <span>Envíos coordinados en el día</span>
        </span>
        <span style={{ opacity: 0.25 }}>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <ShieldCheck size={13} style={{ color: 'var(--brand-green)' }} />
          <span>Ajuste y compatibilidad garantizada</span>
        </span>
        <span style={{ opacity: 0.25 }}>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <MessageCircle size={13} style={{ color: 'var(--brand-gold)' }} />
          <span>Atención y pedidos inmediatos por WhatsApp</span>
        </span>
      </div>
    </aside>
  );
}
