import React, { useState } from 'react';
import { Send, User, Phone, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { Modal } from '../common/Modal';
import { InputField } from '../common/InputField';
import { TextAreaField } from '../common/TextAreaField';
import { Button } from '../common/Button';
import { generateWhatsAppOrderUrl } from '../../utils/whatsappHelper';

export function CheckoutWhatsAppModal({
  isOpen,
  onClose,
  cartItems = [],
  onBackToCart,
  onOrderSuccess,
  onSuccessOrder,
}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [targetNumber, setTargetNumber] = useState('74672312'); // 74672312 o 69211592
  const [notas, setNotas] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.cantidad * item.precioUnitario,
    0
  );

  const handleSendOrder = (e) => {
    if (e) e.preventDefault();

    // Generar URL y abrir WhatsApp al número seleccionado
    const waUrl = generateWhatsAppOrderUrl({
      clienteNombre: nombre,
      clienteTelefono: telefono,
      clienteNotas: notas,
      items: cartItems,
      total,
      storePhone: targetNumber,
    });

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank');

    // Notificar éxito para vaciar y cerrar la bolsa de pedidos
    const successCallback = onOrderSuccess || onSuccessOrder;
    if (successCallback) {
      successCallback({
        nombre,
        telefono,
        targetNumber,
        notas,
        items: cartItems,
        total,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enviar Pedido por WhatsApp"
      subtitle="Los Caseritos atenderá tu solicitud de inmediato en la línea seleccionada"
      icon={Send}
      maxWidth="540px"
      footer={
        <>
          <Button variant="secondary" onClick={onBackToCart} icon={ArrowLeft}>
            Volver a la Bolsa
          </Button>
          <Button variant="brand" onClick={handleSendOrder} icon={Send}>
            Enviar Pedido a WhatsApp
          </Button>
        </>
      }
    >
      <form onSubmit={handleSendOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {error && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-red-bg)',
              color: 'var(--brand-red)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {/* Resumen Compacto de Artículos */}
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

        {/* Selector de Número de WhatsApp de Atención */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label className="form-field-label" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-gold)' }}>
            Selecciona la Línea de WhatsApp para enviar tu pedido:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={() => setTargetNumber('74672312')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: targetNumber === '74672312' ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                backgroundColor: targetNumber === '74672312' ? 'var(--brand-gold-bg)' : 'var(--bg-secondary)',
                color: targetNumber === '74672312' ? 'var(--brand-gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Línea 1</span>
              <span style={{ fontSize: '1rem', marginTop: '0.2rem' }}>📲 74672312</span>
            </button>

            <button
              type="button"
              onClick={() => setTargetNumber('69211592')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: targetNumber === '69211592' ? '2px solid var(--brand-gold)' : '1px solid var(--border-color)',
                backgroundColor: targetNumber === '69211592' ? 'var(--brand-gold-bg)' : 'var(--bg-secondary)',
                color: targetNumber === '69211592' ? 'var(--brand-gold)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Línea 2</span>
              <span style={{ fontSize: '1rem', marginTop: '0.2rem' }}>📲 69211592</span>
            </button>
          </div>
        </div>

        {/* Campo Único: Nombre del Cliente (Opcional) */}
        <InputField
          label="Tu Nombre (Opcional)"
          placeholder="Ej. Alejandro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          icon={User}
        />

        <TextAreaField
          label="Notas u Observaciones adicionales (Opcional)"
          placeholder="Ej. Entregar por la tarde, consulta de modelos extra..."
          rows={2}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '0.78rem',
            color: 'var(--brand-green)',
            lineHeight: 1.4,
          }}
        >
          <CheckCircle size={18} style={{ flexShrink: 0 }} />
          <span>Al presionar el botón se abrirá WhatsApp con el pedido listo. Podrás adjuntar tu ubicación directamente por el chat.</span>
        </div>
      </form>
    </Modal>
  );
}
