import React, { useState } from 'react';
import { Send, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { Modal } from '../../common/Modal';
import { InputField } from '../../common/InputField';
import { TextAreaField } from '../../common/TextAreaField';
import { Button } from '../../common/Button';
import { generateWhatsAppOrderUrl } from '../../../utils/whatsappHelper';
import { CheckoutOrderSummary } from './CheckoutOrderSummary';
import { CheckoutLineSelector } from './CheckoutLineSelector';

/**
 * Modal de Checkout y Envío de Pedido a WhatsApp.
 * Responsabilidad: Orquestar la captura de datos del cliente y redirección a WhatsApp.
 */
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
  const [targetNumber, setTargetNumber] = useState('74672312');
  const [notas, setNotas] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.cantidad * item.precioUnitario,
    0
  );

  const handleSendOrder = (e) => {
    if (e) e.preventDefault();

    const waUrl = generateWhatsAppOrderUrl({
      clienteNombre: nombre,
      clienteTelefono: telefono,
      clienteNotas: notas,
      items: cartItems,
      total,
      storePhone: targetNumber,
    });

    window.open(waUrl, '_blank');

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
        {/* Resumen Compacto de Artículos */}
        <CheckoutOrderSummary cartItems={cartItems} total={total} />

        {/* Selector de Línea de WhatsApp */}
        <CheckoutLineSelector targetNumber={targetNumber} onSelectNumber={setTargetNumber} />

        {/* Campo: Nombre del Cliente (Opcional) */}
        <InputField
          label="Tu Nombre (Opcional)"
          placeholder="Ej. Alejandro"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          icon={User}
        />

        {/* Campo: Notas Adicionales */}
        <TextAreaField
          label="Notas u Observaciones adicionales (Opcional)"
          placeholder="Ej. Entregar por la tarde, consulta de modelos extra..."
          rows={2}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        {/* Indicador Informativo */}
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
          <span>Al presionar el botón se abrirá WhatsApp con el pedido listo. Podrás coordinar tu entrega directamente por el chat.</span>
        </div>
      </form>
    </Modal>
  );
}

export default CheckoutWhatsAppModal;
