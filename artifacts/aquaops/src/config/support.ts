export const SUPPORT_WHATSAPP = "353899550078"

export const supportUrl = (message: string) =>
  `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`