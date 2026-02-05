/**
 * Bird WhatsApp Business API Integration
 *
 * Documentation: https://docs.bird.com/
 */

const BIRD_WORKSPACE_ID = '6c085920-55be-4f94-ac49-e397de649faf';
const BIRD_CHANNEL_ID = '4d7d4767-3932-503a-a356-144c93e00497';
const BIRD_PROJECT_ID = '953fb475-c9cd-424f-8252-b09d387881f7';
const BIRD_TEMPLATE_VERSION = '13e51c34-1833-4d95-b8e9-6dda4062b2bd';
const BIRD_ACCESS_KEY = process.env.BIRD_ACCESS_KEY;

interface WhatsAppTemplateParams {
  phone: string;      // Full phone with country code (e.g., "59177655430" or "+59177655430")
  nombre: string;     // Customer name
  codigo: string;     // Access code/link
}

interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a WhatsApp message using Bird API
 */
export async function sendWhatsAppMessage(params: WhatsAppTemplateParams): Promise<WhatsAppResponse> {
  const { phone, nombre, codigo } = params;

  if (!BIRD_ACCESS_KEY) {
    return { success: false, error: 'WhatsApp no configurado' };
  }

  // Format phone with + prefix (Bird requires +countrycode format)
  const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

  const url = `https://api.bird.com/workspaces/${BIRD_WORKSPACE_ID}/channels/${BIRD_CHANNEL_ID}/messages`;

  const payload = {
    receiver: {
      contacts: [{ identifierValue: formattedPhone, identifierKey: 'phonenumber' }],
    },
    template: {
      projectId: BIRD_PROJECT_ID,
      version: BIRD_TEMPLATE_VERSION,
      locale: 'es',
      parameters: [
        { type: 'string', key: 'nombre', value: nombre },
        { type: 'string', key: 'codigo', value: codigo },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `AccessKey ${BIRD_ACCESS_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      return { success: true, messageId: data.id || 'sent' };
    }

    return {
      success: false,
      error: data.error?.message || data.title || 'Error enviando mensaje'
    };
  } catch {
    return { success: false, error: 'Error de conexión con WhatsApp' };
  }
}
