/**
 * Generador de mensajes y enlaces universales para WhatsApp
 */
export function generateWhatsAppOrderUrl({
  clienteNombre,
  clienteTelefono,
  clienteNotas,
  items,
  total,
  storePhone = '59174672312', // Número configurable de WhatsApp de la tienda (74672312 o 69211592)
}) {
  const lineItems = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.nombre}*` +
        (item.modelo?.nombre ? ` (${item.modelo.nombre})` : '') +
        (item.color?.nombre ? ` [Color: ${item.color.nombre}]` : '') +
        `\n   • Cantidad: ${item.cantidad} unid.` +
        `\n   • Precio: Bs. ${Number(item.precioUnitario).toFixed(2)}` +
        `\n   • Subtotal: Bs. ${(item.cantidad * item.precioUnitario).toFixed(2)}`
    )
    .join('\n\n');

  const fechaHora = new Date().toLocaleString('es-BO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const nombreFinal = clienteNombre?.trim() ? clienteNombre.trim() : 'Cliente';
  const telefonoFinal = clienteTelefono?.trim() ? clienteTelefono.trim() : 'No especificado';

  const mensaje =
    `¡Hola Los Caseritos! Quiero realizar el siguiente pedido:\n\n` +
    `----------------------------------------\n` +
    `*DATOS DEL CLIENTE:*\n` +
    `• *Nombre:* ${nombreFinal}\n` +
    `• *Teléfono / Contacto:* ${telefonoFinal}\n` +
    `• *Ubicación de entrega:* (Enviaré mi ubicación exacta por este chat)\n` +
    (clienteNotas?.trim() ? `• *Observaciones:* ${clienteNotas.trim()}\n` : '') +
    `• *Fecha:* ${fechaHora}\n` +
    `----------------------------------------\n\n` +
    `*DETALLE DEL PEDIDO:*\n\n` +
    `${lineItems}\n\n` +
    `----------------------------------------\n` +
    `*TOTAL A PAGAR:* *Bs. ${Number(total).toFixed(2)}*\n` +
    `----------------------------------------\n\n` +
    `Adjunto mi ubicación en el siguiente mensaje para coordinar la entrega. ¡Muchas gracias!`;

  const encodedMessage = encodeURIComponent(mensaje);
  const cleanPhone = storePhone.replace(/\D/g, '');
  const finalPhone = cleanPhone.startsWith('591') ? cleanPhone : `591${cleanPhone}`;
  return `https://wa.me/${finalPhone}?text=${encodedMessage}`;
}

