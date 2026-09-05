import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../common/Button';

/**
 * Pie del Drawer de la Bolsa de Compras.
 * Responsabilidad: Desglose de totales, pilar de confianza y botón para proceder al checkout.
 */
export function CarritoDrawerFooter({ total = 0, onCheckout }) {
  return (
    <div
      style={{
        padding: '1.2rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Subtotal estimado:</span>
        <span style={{ color: 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem' }}>
          Bs. {Number(total).toFixed(2)}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed var(--border-color)', paddingTop: '0.6rem' }}>
        <span style={{ color: 'var(--text-white)', fontSize: '1.05rem', fontWeight: 800 }}>Total a Pagar:</span>
        <span style={{ color: 'var(--brand-gold)', fontSize: '1.35rem', fontWeight: 800 }}>
          Bs. {Number(total).toFixed(2)}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', color: 'var(--brand-green)', justifyContent: 'center' }}>
        <ShieldCheck size={14} />
        <span>Coordinación directa y confirmación por WhatsApp</span>
      </div>

      <Button
        variant="brand"
        size="lg"
        icon={ArrowRight}
        onClick={onCheckout}
        style={{ width: '100%', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', padding: '0.85rem' }}
      >
        Completar Datos y Pedir por WhatsApp
      </Button>
    </div>
  );
}

export default CarritoDrawerFooter;
