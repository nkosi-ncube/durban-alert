'use server';

import clientPromise from '@/lib/db';
import type { TwilioConfig } from '@/lib/types';

export async function saveTwilioCredentials(credentials: Omit<TwilioConfig, 'id'>): Promise<{ success: boolean; message: string }> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const configCollection = db.collection<TwilioConfig>('config');

    // Use updateOne with upsert to either update existing credentials or insert a new document.
    await configCollection.updateOne(
      {}, // An empty filter will match the first document in the collection or create one if none exists.
      { $set: credentials },
      { upsert: true }
    );

    return { success: true, message: 'Twilio credentials saved successfully.' };
  } catch (error) {
    console.error('Error saving Twilio credentials:', error);
    return { success: false, message: 'Failed to save Twilio credentials.' };
  }
}
