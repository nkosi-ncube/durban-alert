import type { User, Alert } from './types';

export const mockUsers: User[] = [
  {
    id: 'usr_1',
    name: 'Sarah M.',
    phone: '+27...4567',
    location: 'Chatsworth',
    language: 'English',
    subscription: 'All weather updates',
    joined: '2025-07-28',
  },
  {
    id: 'usr_2',
    name: 'Thabo Z.',
    phone: '+27...8901',
    location: 'Umlazi',
    language: 'Zulu',
    subscription: 'Weekly summaries',
    joined: '2025-07-27',
  },
  {
    id: 'usr_3',
    name: 'Priya N.',
    phone: '+27...2345',
    location: 'Pinetown',
    language: 'English',
    subscription: 'Emergency only',
    joined: '2025-07-26',
  },
  {
    id: 'usr_4',
    name: 'Jan V.',
    phone: '+27...6789',
    location: 'Durban North',
    language: 'Afrikaans',
    subscription: 'All weather updates',
    joined: '2025-07-25',
  },
  {
    id: 'usr_5',
    name: 'Nomusa K.',
    phone: '+27...1122',
    location: 'KwaMashu',
    language: 'Zulu',
    subscription: 'All weather updates',
    joined: '2025-07-25',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alrt_1',
    timestamp: '2025-07-28 06:30:15',
    area: 'Chatsworth',
    riskLevel: 'HIGH',
    message: 'URGENT FLOOD WARNING - Chatsworth Area...',
    status: 'Delivered',
  },
  {
    id: 'alrt_2',
    timestamp: '2025-07-28 12:00:05',
    area: 'Chatsworth',
    riskLevel: 'HIGH',
    message: 'Flood risk remains HIGH. Heavy rain starting at 2:30 PM...',
    status: 'Sent',
  },
  {
    id: 'alrt_3',
    timestamp: '2025-07-27 19:00:00',
    area: 'Umlazi',
    riskLevel: 'LOW',
    message: 'Sawubona Thabo! Isimo sezulu evikini elizayo - Umlazi...',
    status: 'Read',
  },
  {
    id: 'alrt_4',
    timestamp: '2025-07-26 10:15:30',
    area: 'Pinetown',
    riskLevel: 'MEDIUM',
    message: 'MEDIUM flood risk expected tomorrow...',
    status: 'Delivered',
  },
];
