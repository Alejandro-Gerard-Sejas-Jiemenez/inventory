import React from 'react';
import { MessageCircle, Eye } from 'lucide-react';

/**
 * Componente atómico reutilizable para tarjetas editoriales de fundas destacadas.
 * Responsabilidad exclusiva: Renderizar una funda destacada con foto real, badges y acciones.
 */
export function FeaturedCaseCard({
  funda,
  indexBadge = '01',
  tag = 'FUNDA DE ALTO IMPACTO',
  reverse = false,
  onOpenDetail,
}) {
  const handleWhatsAppDirect = (productText) => {
    const phone = '59174672312';
    const text = encodeURIComponent(`Hola Los Caseritos, deseo consultar por la funda: ${productText}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const imgUrl = (funda.imagenes && funda.imagenes.length > 0 && funda.imagenes[0]?.url) || funda.imagenUrl;

  const imageBlock = (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        className="apple-glass-card"
        style={{
          width: '100%',
          maxWidth: '380px',
          padding: '1.2rem',
          borderRadius: '2.5rem',
          boxShadow: 'var(--shadow-bento), 0 25px 50px rgba(0, 0, 0, 0.5)',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1.15',
            borderRadius: '2rem',
            overflow: 'hidden',
            backgroundColor: '#09090D',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src={imgUrl}
            alt={funda.nombre}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );

  const infoBlock = (
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

  return (
    <article
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      {reverse ? (
        <>
          {infoBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {infoBlock}
        </>
      )}
    </article>
  );
}

export default FeaturedCaseCard;
