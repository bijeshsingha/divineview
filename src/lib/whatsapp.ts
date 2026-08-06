export const WHATSAPP_NUMBER = "+916901741211";

export function getWhatsAppLink(message: string, overrideNumber?: string): string {
  const encodedMessage = encodeURIComponent(message);
  const numberToUse = overrideNumber || WHATSAPP_NUMBER;
  return `https://wa.me/${numberToUse.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
}
