export type User = {
  id: string;
  name: string;
  phone: string;
  location: string;
  language: 'English' | 'Zulu' | 'Afrikaans';
  subscription: 'Emergency only' | 'All weather updates' | 'Weekly summaries';
  joined: string;
};

export type Alert = {
  id: string;
  timestamp: string;
  area: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  status: 'Sent' | 'Delivered' | 'Read';
};
