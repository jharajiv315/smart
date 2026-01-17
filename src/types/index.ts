export interface Service {
  id: string;
  name: string;
  nameHindi: string;
  category: 'hospital' | 'rto' | 'passport' | 'bank' | 'government';
  averageTime: number; // in minutes
  capacity: number; // per slot
  enabled: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  capacity: number;
  booked: number;
  congestion: 'Low' | 'Medium' | 'High';
  aiScore: number;
  estimatedWait: number;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  tokenNumber: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled' | 'no-show';
  citizenName: string;
  citizenPhone: string;
  createdAt: string;
  estimatedTime?: string;
}

export interface QueueItem {
  id: string;
  tokenNumber: string;
  serviceId: string;
  serviceName: string;
  citizenName: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'skipped';
  arrivalTime: string;
  startTime?: string;
  completionTime?: string;
  waitTime?: number;
  priority: 'normal' | 'emergency' | 'senior';
}

export interface AnalyticsData {
  date: string;
  totalAppointments: number;
  walkIns: number;
  averageWaitTime: number;
  peakHour: string;
  noShows: number;
  throughput: number;
}

export interface ServiceConfig {
  id: string;
  name: string;
  slotsPerHour: number;
  averageServiceTime: number;
  bufferTime: number;
  allowWalkIns: boolean;
  maxDailyCapacity: number;
}
