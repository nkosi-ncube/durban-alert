import type { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  id: string;
  name: string;
  phone: string;
  location: string;
  language: 'English' | 'Zulu' | 'Afrikaans';
  subscription: 'Emergency only' | 'All weather updates' | 'Weekly summaries';
  joined: string;
};

export type Alert = {
  _id?: ObjectId;
  id: string;
  timestamp: string;
  area: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  status: 'Sent' | 'Delivered' | 'Read';
};

export type TwilioConfig = {
  _id?: ObjectId;
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}
