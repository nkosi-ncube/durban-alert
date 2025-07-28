// src/app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { twiml } from 'twilio';
import { handleIncomingMessage } from '@/ai/flows/whatsapp-conversation';

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const from = body.get('From') as string;
  const message = body.get('Body') as string;

  console.log(`Received message from ${from}: ${message}`);

  try {
    // Pass the message to your Genkit flow
    await handleIncomingMessage({ from, message });
  } catch (error) {
    console.error('Error handling incoming message:', error);
    // Even if our processing fails, we should still acknowledge the message
  }

  // Respond to Twilio with an empty TwiML response to acknowledge receipt
  const messagingResponse = new twiml.MessagingResponse();
  const response = new NextResponse(messagingResponse.toString(), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });

  return response;
}
