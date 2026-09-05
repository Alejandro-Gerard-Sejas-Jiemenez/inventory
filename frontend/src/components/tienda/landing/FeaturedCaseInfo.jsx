import React from 'react';
import { MessageCircle, Eye } from 'lucide-react';

/**
 * Bloque de información y CTAs para fundas destacadas.
 * Responsabilidad: Desplegar especificaciones, precio y acciones de compra directa.
 */
export function FeaturedCaseInfo({
  funda,
  indexBadge,
  tag,
  onOpenDetail,
}) {
  const handleWhatsAppDirect = (productText) => {
    const phone = '59174672312';
    const text = encodeURIComponent(`Hola Los Caseritos, deseo consultar por la funda: ${productText}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
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
        <span>{indexBadge}</span>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-gold)' }} />
        <span>{tag}</span>
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
        {funda.nombre}
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
        {funda.modelo?.nombre ? `Modelo: ${funda.modelo.nombre}` : 'Ajuste Antichoque Certificado'}
        {funda.material?.nombre && ` · ${funda.material.nombre}`}
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
        {funda.descripcion}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span className="font-headline" style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-white)' }}>
          Bs {funda.precioUnitario}
        </span>

        <button
          type="button"
          onClick={() => handleWhatsAppDirect(`${funda.nombre} (Bs ${funda.precioUnitario})`)}
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

        {onOpenDetail && funda.idProducto && (
          <button
            type="button"
            onClick={() => onOpenDetail(funda)}
            className="apple-btn-tactile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.72rem 1.2rem',
              borderRadius: '999px',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            <Eye size={14} />
            <span>Ver Detalle</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default FeaturedCaseInfo;
