/**
 * Generador de mensajes y enlaces universales para WhatsApp
 */
export function generateWhatsAppOrderUrl({
  clienteNombre,
  clienteNotas,
  items = [],
  total = 0,
  storePhone = '59174672312', // Número configurable de WhatsApp de la tienda (74672312 o 69211592)
}) {
  const lineItems = items
    .map((item, idx) => {
      const modelo = item.modeloSeleccionado || item.modelo?.nombre || 'No especificado';
      const color = item.colorSeleccionado || item.color?.nombre || 'No especificado';
      const subtotal = (Number(item.precioUnitario) * item.cantidad).toFixed(2);

      return (
        `${idx + 1}. 🛍️ *${item.nombre}*\n` +
        `   📱 *Modelo:* ${modelo}\n` +
        `   🎨 *Color:* ${color}\n` +
        `   • *Cantidad:* ${item.cantidad} unid.\n` +
        `   • *Precio unitario:* Bs. ${Number(item.precioUnitario).toFixed(2)}\n` +
        `   • *Subtotal:* Bs. ${subtotal}`
      );
    })
    .join('\n\n');

  const fechaHora = new Date().toLocaleString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const nombreFinal = clienteNombre?.trim() ? clienteNombre.trim() : 'Cliente';

  const mensaje =
    `¡Hola Los Caseritos! Quiero realizar el siguiente pedido:\n\n` +
    `----------------------------------------\n` +
    `📋 *DATOS DEL PEDIDO*\n` +
    `• *Cliente:* ${nombreFinal}\n` +
    `• *Ubicación de entrega:* (Enviaré mi ubicación exacta por este chat)\n` +
    (clienteNotas?.trim() ? `• *Notas:* ${clienteNotas.trim()}\n` : '') +
    `• *Fecha:* ${fechaHora}\n` +
    `----------------------------------------\n\n` +
    `📦 *DETALLE DE PRODUCTOS:*\n\n` +
    `${lineItems}\n\n` +
    `----------------------------------------\n` +
    `💰 *TOTAL A PAGAR:* *Bs. ${Number(total).toFixed(2)}*\n` +
    `----------------------------------------\n\n` +
    `Adjunto mi ubicación en el siguiente mensaje para coordinar la entrega. ¡Muchas gracias!`;

  const encodedMessage = encodeURIComponent(mensaje);
  const cleanPhone = storePhone.replace(/\D/g, '');
  const finalPhone = cleanPhone.startsWith('591') ? cleanPhone : `591${cleanPhone}`;
  return `https://wa.me/${finalPhone}?text=${encodedMessage}`;
}
