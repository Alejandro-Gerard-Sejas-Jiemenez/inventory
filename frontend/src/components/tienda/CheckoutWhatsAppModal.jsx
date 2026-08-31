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
  onSuccessOrder,
}) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [notas, setNotas] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (acc, item) => acc + item.cantidad * item.precioUnitario,
    0
  );

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !direccion.trim()) {
      setError('Por favor completa todos los campos requeridos (*)');
      return;
    }

    // Generar URL y abrir WhatsApp
    const waUrl = generateWhatsAppOrderUrl({
      clienteNombre: nombre,
      clienteTelefono: telefono,
      clienteDireccion: direccion,
      clienteNotas: notas,
      items: cartItems,
      total,
    });

    // Abrir WhatsApp en nueva pestaña
    window.open(waUrl, '_blank');

    if (onSuccessOrder) {
      onSuccessOrder({
        nombre,
        telefono,
        direccion,
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
      title="Datos de Entrega y Envío por WhatsApp"
      subtitle="Los Caseritos preparará tu pedido de inmediato tras recibir tu mensaje"
      icon={Send}
      maxWidth="560px"
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
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {cartItems.map((item) => (
              <div key={item.idProducto} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>• {item.nombre} (x{item.cantidad})</span>
                <span style={{ fontWeight: 600 }}>Bs. {(item.cantidad * item.precioUnitario).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Campos de Contacto y Entrega */}
        <InputField
          label="Nombre Completo (*)"
          placeholder="Ej. Alejandro Sejas"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          icon={User}
          required
        />

        <InputField
          label="Número de Teléfono / WhatsApp (*)"
          placeholder="Ej. 71234567"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          icon={Phone}
          required
        />

        <InputField
          label="Dirección de Entrega o 'Recojo en Tienda' (*)"
          placeholder="Ej. Av. América #450, Edif. Torre Real dpto 3B"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          icon={MapPin}
          required
        />

        <TextAreaField
          label="Observaciones o Referencias (Opcional)"
          placeholder="Ej. Pago con billete de 200 Bs, entregar después de las 15:00..."
          rows={2}
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            fontSize: '0.76rem',
            color: 'var(--brand-green)',
          }}
        >
          <CheckCircle size={15} flexShrink={0} />
          <span>Al presionar el botón se abrirá WhatsApp con el pedido listo para enviar.</span>
        </div>
      </form>
    </Modal>
  );
}
