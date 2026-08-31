/**
 * Generador de mensajes y enlaces universales para WhatsApp
 */
export function generateWhatsAppOrderUrl({
  clienteNombre,
  clienteTelefono,
  clienteDireccion,
  clienteNotas,
  items,
  total,
  storePhone = '59170000000', // Número configurable de WhatsApp de la tienda
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

  const mensaje =
    `¡Hola Los Caseritos! Quiero realizar el siguiente pedido:\n\n` +
    `----------------------------------------\n` +
    `*DATOS DEL CLIENTE:*\n` +
    `• *Nombre:* ${clienteNombre.trim()}\n` +
    `• *Teléfono:* ${clienteTelefono.trim()}\n` +
    `• *Dirección de Entrega:* ${clienteDireccion.trim()}\n` +
    (clienteNotas?.trim() ? `• *Observaciones:* ${clienteNotas.trim()}\n` : '') +
    `• *Fecha:* ${fechaHora}\n` +
    `----------------------------------------\n\n` +
    `*DETALLE DEL PEDIDO:*\n\n` +
    `${lineItems}\n\n` +
    `----------------------------------------\n` +
    `*TOTAL A PAGAR:* *Bs. ${Number(total).toFixed(2)}*\n` +
    `----------------------------------------\n\n` +
    `Por favor confirmen la recepción para coordinar el despacho. ¡Muchas gracias!`;

  const encodedMessage = encodeURIComponent(mensaje);
  const cleanPhone = storePhone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
