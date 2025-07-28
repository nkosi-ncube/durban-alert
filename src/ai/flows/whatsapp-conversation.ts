// src/ai/flows/whatsapp-conversation.ts
'use server';

import { z } from 'genkit';
import { ai } from '@/ai/genkit';
import { findOrCreateUser, updateUser } from '@/services/users';
import { sendWhatsAppMessage } from '@/services/whatsapp';
import type { User } from '@/lib/types';

const handleIncomingMessageInputSchema = z.object({
  from: z.string().describe("The user's WhatsApp number in the format 'whatsapp:+1...'"),
  message: z.string().describe("The message sent by the user."),
});

export type HandleIncomingMessageInput = z.infer<typeof handleIncomingMessageInputSchema>;

export async function handleIncomingMessage(input: HandleIncomingMessageInput) {
  return handleIncomingMessageFlow(input);
}

const handleIncomingMessageFlow = ai.defineFlow(
  {
    name: 'handleIncomingMessageFlow',
    inputSchema: handleIncomingMessageInputSchema,
    outputSchema: z.void(),
  },
  async ({ from, message }) => {
    // Twilio sends the number with a `whatsapp:` prefix, so we strip it.
    const fromNumber = from.replace('whatsapp:', '');
    const user = await findOrCreateUser(fromNumber);

    if (user.registrationStep === 'completed') {
      await sendWhatsAppMessage(fromNumber, 'You are already registered. You will receive flood alerts for your area. To change your settings, please visit our website.');
      return;
    }

    await determineNextStep(user, message.trim());
  }
);


async function determineNextStep(user: User, message: string) {
  let responseMessage = '';

  switch (user.registrationStep) {
    case 'started':
      responseMessage = 'Welcome to Durban Alert! To get started, what is your name?';
      await updateUser(user.phone, { registrationStep: 'awaiting_name' });
      break;
    
    case 'awaiting_name':
      responseMessage = `Thanks, ${message}! What area in Durban do you live in? (e.g., Pinetown, Umlazi)`;
      await updateUser(user.phone, { name: message, registrationStep: 'awaiting_location' });
      break;
    
    case 'awaiting_location':
       const validLocations = ['chatsworth', 'pinetown', 'umhlanga', 'umlazi', 'durban_central'];
       if (!validLocations.includes(message.toLowerCase().replace(/\s+/g, '_'))) {
          responseMessage = 'Please provide a valid area within Durban. For example: Pinetown, Umlazi, Chatsworth.';
       } else {
          responseMessage = 'Got it. What is your preferred language? (English, Zulu, or Afrikaans)';
          await updateUser(user.phone, { location: message, registrationStep: 'awaiting_language' });
       }
      break;

    case 'awaiting_language':
      const lang = message.toLowerCase();
      if (lang === 'english' || lang === 'zulu' || lang === 'afrikaans') {
        responseMessage = 'Finally, what kind of alerts would you like? (Emergency only, All weather updates, or Weekly summaries)';
        await updateUser(user.phone, { language: message as User['language'], registrationStep: 'awaiting_subscription' });
      } else {
        responseMessage = 'Please choose a valid language: English, Zulu, or Afrikaans.';
      }
      break;
    
    case 'awaiting_subscription':
        const sub = message.toLowerCase();
        if (sub.includes('emergency') || sub.includes('all') || sub.includes('weekly')) {
            responseMessage = 'Great, you are all set up! You will now receive flood alerts. Stay safe!';
            await updateUser(user.phone, { subscription: message as User['subscription'], registrationStep: 'completed', joined: new Date().toLocaleDateString() });
        } else {
            responseMessage = 'Please choose a valid subscription: Emergency only, All weather updates, or Weekly summaries.';
        }
      break;

    default:
        responseMessage = 'Thank you for using Durban Alert.'
  }

  await sendWhatsAppMessage(user.phone, responseMessage);
}
