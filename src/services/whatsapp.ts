'use server';

import twilio from 'twilio';
import clientPromise from '@/lib/db';
import type { TwilioConfig } from '@/lib/types';

async function getTwilioConfig(): Promise<TwilioConfig | null> {
    const client = await clientPromise;
    const db = client.db();
    return db.collection<TwilioConfig>('config').findOne({ });
}

export async function sendWhatsAppMessage(to: string, body: string) {
  const config = await getTwilioConfig();

  if (!config) {
    console.error('Twilio credentials are not configured.');
    throw new Error('Twilio credentials are not configured.');
  }

  const { accountSid, authToken, phoneNumber } = config;
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      from: `whatsapp:${phoneNumber}`,
      to: `whatsapp:${to}`,
      body: body,
    });
    console.log(`Message sent with SID: ${message.sid}`);
    return message;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    // Don't re-throw the error to prevent crashing the flow if a single message fails.
    // In a production app, you'd want more robust error handling here.
  }
}
