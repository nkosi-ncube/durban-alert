import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-flood-risk.ts';
import '@/ai/flows/generate-weekly-summary.ts';
import '@/ai/flows/whatsapp-conversation.ts';
