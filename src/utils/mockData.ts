import { Service, Appointment, QueueItem, AnalyticsData } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'hosp-opd',
    name: 'OPD Consultation',
    nameHindi: 'ओपीडी परामर्श',
    category: 'hospital',
    averageTime: 15,
    capacity: 6,
    enabled: true,
  },
  {
    id: 'hosp-lab',
    name: 'Laboratory Tests',
    nameHindi: 'प्रयोगशाला परीक्षण',
    category: 'hospital',
    averageTime: 10,
    capacity: 8,
    enabled: true,
  },
  {
    id: 'rto-license',
    name: 'Driving License',
    nameHindi: 'ड्राइविंग लाइसेंस',
    category: 'rto',
    averageTime: 20,
    capacity: 5,
    enabled: true,
  },
  {
    id: 'rto-rc',
    name: 'RC Transfer',
    nameHindi: 'आरसी स्थानांतरण',
    category: 'rto',
    averageTime: 25,
    capacity: 4,
    enabled: true,
  },
  {
    id: 'passport-new',
    name: 'New Passport',
    nameHindi: 'नया पासपोर्ट',
    category: 'passport',
    averageTime: 30,
    capacity: 6,
    enabled: true,
  },
  {
    id: 'passport-renew',
    name: 'Passport Renewal',
    nameHindi: 'पासपोर्ट नवीनीकरण',
    category: 'passport',
    averageTime: 20,
    capacity: 6,
    enabled: true,
  },
  {
    id: 'bank-account',
    name: 'Account Opening',
    nameHindi: 'खाता खोलना',
    category: 'bank',
    averageTime: 15,
    capacity: 5,
    enabled: true,
  },
  {
    id: 'bank-loan',
    name: 'Loan Application',
    nameHindi: 'ऋण आवेदन',
    category: 'bank',
    averageTime: 30,
    capacity: 4,
    enabled: true,
  },
];

export function getStoredAppointments(): Appointment[] {
  const stored = localStorage.getItem('appointments');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate some initial appointments
  const initialAppointments: Appointment[] = [
    {
      id: 'apt-001',
      serviceId: 'hosp-opd',
      serviceName: 'OPD Consultation',
      date: '2026-01-17',
      timeSlot: '09:00',
      tokenNumber: 'A001',
      status: 'scheduled',
      citizenName: 'Rahul Kumar',
      citizenPhone: '+91-9876543210',
      createdAt: new Date().toISOString(),
      estimatedTime: '09:15',
    },
    {
      id: 'apt-002',
      serviceId: 'rto-license',
      serviceName: 'Driving License',
      date: '2026-01-17',
      timeSlot: '10:00',
      tokenNumber: 'B001',
      status: 'scheduled',
      citizenName: 'Priya Sharma',
      citizenPhone: '+91-9876543211',
      createdAt: new Date().toISOString(),
      estimatedTime: '10:20',
    },
  ];
  
  localStorage.setItem('appointments', JSON.stringify(initialAppointments));
  return initialAppointments;
}

export function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem('appointments', JSON.stringify(appointments));
}

export function getStoredQueue(): QueueItem[] {
  const stored = localStorage.getItem('queue');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Generate initial queue
  const initialQueue: QueueItem[] = [
    {
      id: 'q-001',
      tokenNumber: 'A101',
      serviceId: 'hosp-opd',
      serviceName: 'OPD Consultation',
      citizenName: 'Amit Patel',
      status: 'in-progress',
      arrivalTime: new Date(Date.now() - 15 * 60000).toISOString(),
      startTime: new Date(Date.now() - 5 * 60000).toISOString(),
      priority: 'normal',
    },
    {
      id: 'q-002',
      tokenNumber: 'A102',
      serviceId: 'hosp-opd',
      serviceName: 'OPD Consultation',
      citizenName: 'Sunita Devi',
      status: 'waiting',
      arrivalTime: new Date(Date.now() - 10 * 60000).toISOString(),
      priority: 'senior',
      waitTime: 10,
    },
    {
      id: 'q-003',
      tokenNumber: 'A103',
      serviceId: 'hosp-opd',
      serviceName: 'OPD Consultation',
      citizenName: 'Vikram Singh',
      status: 'waiting',
      arrivalTime: new Date(Date.now() - 5 * 60000).toISOString(),
      priority: 'normal',
      waitTime: 5,
    },
    {
      id: 'q-004',
      tokenNumber: 'B101',
      serviceId: 'rto-license',
      serviceName: 'Driving License',
      citizenName: 'Anjali Verma',
      status: 'waiting',
      arrivalTime: new Date(Date.now() - 8 * 60000).toISOString(),
      priority: 'normal',
      waitTime: 8,
    },
  ];
  
  localStorage.setItem('queue', JSON.stringify(initialQueue));
  return initialQueue;
}

export function saveQueue(queue: QueueItem[]): void {
  localStorage.setItem('queue', JSON.stringify(queue));
}

export function getMockAnalytics(): AnalyticsData[] {
  return [
    {
      date: '2026-01-10',
      totalAppointments: 145,
      walkIns: 32,
      averageWaitTime: 28,
      peakHour: '10:00',
      noShows: 18,
      throughput: 127,
    },
    {
      date: '2026-01-11',
      totalAppointments: 152,
      walkIns: 28,
      averageWaitTime: 25,
      peakHour: '09:00',
      noShows: 15,
      throughput: 137,
    },
    {
      date: '2026-01-12',
      totalAppointments: 138,
      walkIns: 25,
      averageWaitTime: 22,
      peakHour: '16:00',
      noShows: 12,
      throughput: 126,
    },
    {
      date: '2026-01-13',
      totalAppointments: 165,
      walkIns: 30,
      averageWaitTime: 20,
      peakHour: '10:00',
      noShows: 14,
      throughput: 151,
    },
    {
      date: '2026-01-14',
      totalAppointments: 148,
      walkIns: 22,
      averageWaitTime: 18,
      peakHour: '11:00',
      noShows: 10,
      throughput: 138,
    },
    {
      date: '2026-01-15',
      totalAppointments: 171,
      walkIns: 26,
      averageWaitTime: 17,
      peakHour: '14:00',
      noShows: 11,
      throughput: 160,
    },
    {
      date: '2026-01-16',
      totalAppointments: 158,
      walkIns: 20,
      averageWaitTime: 15,
      peakHour: '09:00',
      noShows: 8,
      throughput: 150,
    },
  ];
}

export function generateTokenNumber(serviceId: string): string {
  const prefix = serviceId.split('-')[0].toUpperCase().charAt(0);
  const random = Math.floor(Math.random() * 900) + 100;
  return `${prefix}${random}`;
}
