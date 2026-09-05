import React from 'react';

/**
 * Resumen de artículos y total para el checkout de WhatsApp.
 * Responsabilidad: Desglose de productos, variantes y montos.
 */
export function CheckoutOrderSummary({ cartItems = [], total = 0 }) {
  return (
    <div
      style={{
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Resumen del Pedido:</span>
        <strong style={{ fontSize: '0.98rem', color: 'var(--brand-gold)' }}>
          Total: Bs. {Number(total).toFixed(2)}
        </strong>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {cartItems.map((item, idx) => (
          <div key={item.cartItemId || item.idProducto || idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontWeight: 600, color: 'var(--text-white)' }}>• {item.nombre}</span>
              <span style={{ fontSize: '0.73rem', color: 'var(--text-muted)', display: 'block', marginLeft: '0.8rem' }}>
                {item.modeloSeleccionado ? `Modelo: ${item.modeloSeleccionado}` : ''}
                {item.modeloSeleccionado && item.colorSeleccionado ? ' | ' : ''}
                {item.colorSeleccionado ? `Color: ${item.colorSeleccionado}` : ''}
                {` (x${item.cantidad})`}
              </span>
            </div>
            <span style={{ fontWeight: 700, color: 'var(--brand-gold)' }}>
              Bs. {(item.cantidad * item.precioUnitario).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
