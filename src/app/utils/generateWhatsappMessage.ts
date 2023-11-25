const getTimeMessage = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return 'buenos días';
  } else if (hours >= 12 && hours <= 17) {
    return 'buenas tardes';
  } else {
    return 'buenas noches';
  }
};

export const startWhatsAppChat = () => {
  const salutation = getTimeMessage();
  const phoneNumber = '1234567890';
  const message = `Hola ${salutation}, me gustaría obtener un poco más de información del sistema!`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};