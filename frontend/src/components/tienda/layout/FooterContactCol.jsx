import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

/**
 * Columna de contacto y atención directa para el pie de página.
 * Responsabilidad: Desplegar el botón de atención directa por WhatsApp y aviso de compatibilidad.
 */
export function FooterContactCol() {
  return (
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
  );
}

export default FooterContactCol;
