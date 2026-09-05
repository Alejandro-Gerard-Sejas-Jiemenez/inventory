import React from 'react';
import { Star, CheckCircle, ShieldCheck } from 'lucide-react';

/**
 * Sección de Prueba Social y Reseñas de Clientes estilo BURGA & CASETiFY
 */
export function TiendaSocialProof() {
  const reviews = [
    {
      author: 'Camila R.',
      device: 'iPhone 15 Pro Max • MagArmor Titanium',
      comment: 'La calidad del bisel en la cámara es increíble, ya se me cayó una vez en la acera y no le pasó absolutamente nada al teléfono. 100% recomendados.',
      rating: 5,
    },
    {
      author: 'Rodrigo M.',
      device: 'Samsung Galaxy S24 Ultra • Frosted Black',
      comment: 'El acabado mate no deja huellas y el agarre es perfecto. Además el pedido por WhatsApp me llegó el mismo día coordinado sin vueltas.',
      rating: 5,
    },
    {
      author: 'Valeria S.',
      device: 'Xiaomi Redmi Note 13 Pro • Tough Case',
      comment: 'Buscaba una funda bonita pero que no fuera frágil. Esta funda es súper resistente y los botones tienen un clic súper satisfactorio.',
      rating: 5,
    },
  ];

  return (
    <section
      style={{
        padding: '4rem 0',
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.4rem' }}>
        {/* Banner de Calificación Global */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#F59E0B', marginBottom: '0.4rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} fill="#F59E0B" />
            ))}
          </div>
          <h2
            className="font-headline"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--text-white)',
              margin: '0 0 0.35rem',
            }}
          >
            4.9 / 5 Estrellas de Satisfacción
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Basado en más de 1,200 pedidos entregados y clientes conformes en toda Bolivia.
          </p>
        </div>

        {/* 3 Reseñas Destacadas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="apple-glass-card"
              style={{
                padding: '1.6rem',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '2px', color: '#F59E0B', marginBottom: '0.65rem' }}>
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" />
                  ))}
                </div>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>
              </div>

              <div style={{ paddingTop: '0.8rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.84rem', color: 'var(--text-white)' }}>
                  <span>{rev.author}</span>
                  <CheckCircle size={13} style={{ color: 'var(--brand-green)' }} />
                  <span style={{ fontSize: '0.68rem', color: 'var(--brand-green)', fontWeight: 700 }}>Comprador Verificado</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--brand-gold)', fontWeight: 600 }}>
                  {rev.device}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
