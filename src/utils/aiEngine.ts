import { TimeSlot, Appointment } from '../types';

/**
 * AI Engine for SmartQueue India
 * Implements: Moving average, threshold-based peak detection, slot scoring
 */

interface SlotData {
  time: string;
  historicalBookings: number[];
  currentBooked: number;
  capacity: number;
  noShowRate: number;
  walkInProbability: number;
}

export class AIEngine {
  /**
   * Calculate moving average of past bookings
   */
  private static calculateMovingAverage(data: number[], window: number = 7): number {
    if (data.length === 0) return 0;
    const slice = data.slice(-window);
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  }

  /**
   * Detect peak hours based on threshold
   */
  private static detectPeakHour(avgBookings: number, overallAvg: number): boolean {
    const threshold = 1.3; // 30% above average is considered peak
    return avgBookings > overallAvg * threshold;
  }

  /**
   * Score a time slot based on multiple factors
   */
  private static scoreSlot(slot: SlotData, overallAvg: number): number {
    const movingAvg = this.calculateMovingAverage(slot.historicalBookings);
    const isPeak = this.detectPeakHour(movingAvg, overallAvg);
    
    // Calculate utilization (0-1)
    const utilization = slot.currentBooked / slot.capacity;
    
    // Adjust for no-shows (increases effective capacity)
    const effectiveCapacity = slot.capacity * (1 + slot.noShowRate * 0.5);
    const adjustedUtilization = slot.currentBooked / effectiveCapacity;
    
    // Adjust for walk-in probability (decreases effective capacity)
    const walkInAdjustment = slot.walkInProbability * 0.3;
    
    // Score: Higher is better
    // - Prefer low utilization
    // - Penalize peak hours
    // - Account for walk-ins
    let score = 100;
    score -= adjustedUtilization * 50; // -50 points max for utilization
    score -= isPeak ? 20 : 0; // -20 points if peak hour
    score -= walkInAdjustment * 15; // -4.5 points max for walk-ins
    score += (1 - utilization) * 20; // +20 points max for available capacity
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Determine congestion level
   */
  private static getCongestionLevel(utilization: number): 'Low' | 'Medium' | 'High' {
    if (utilization < 0.5) return 'Low';
    if (utilization < 0.8) return 'Medium';
    return 'High';
  }

  /**
   * Estimate wait time based on queue and service time
   */
  private static estimateWaitTime(
    queuePosition: number,
    avgServiceTime: number,
    currentBooked: number
  ): number {
    // Base wait = position * avg service time
    let waitTime = queuePosition * avgServiceTime;
    
    // Add buffer for congestion
    if (currentBooked > 5) {
      waitTime *= 1.2; // 20% buffer for high load
    }
    
    return Math.round(waitTime);
  }

  /**
   * Generate AI-powered slot recommendations
   */
  static generateSlotRecommendations(
    date: string,
    serviceId: string,
    existingAppointments: Appointment[]
  ): TimeSlot[] {
    // Generate slots from 9 AM to 5 PM
    const slots: TimeSlot[] = [];
    const capacity = 6; // 6 appointments per slot
    
    // Historical data simulation (in real system, fetch from DB)
    const historicalPatterns: { [key: string]: number[] } = {
      '09:00': [4, 5, 6, 5, 4, 5, 6], // Morning peak
      '10:00': [5, 6, 6, 5, 6, 5, 6],
      '11:00': [3, 4, 3, 4, 3, 4, 3],
      '12:00': [2, 3, 2, 3, 2, 2, 3], // Lunch dip
      '13:00': [2, 2, 3, 2, 3, 2, 2],
      '14:00': [3, 4, 4, 3, 4, 3, 4],
      '15:00': [4, 5, 4, 5, 4, 5, 5],
      '16:00': [5, 6, 5, 6, 6, 5, 6], // Evening peak
      '17:00': [4, 5, 4, 5, 4, 4, 5],
    };

    const times = Object.keys(historicalPatterns);
    
    // Calculate overall average
    const allHistorical = Object.values(historicalPatterns).flat();
    const overallAvg = this.calculateMovingAverage(allHistorical, allHistorical.length);

    for (const time of times) {
      // Count existing bookings for this slot
      const booked = existingAppointments.filter(
        apt => apt.date === date && apt.timeSlot === time && apt.status === 'scheduled'
      ).length;

      const slotData: SlotData = {
        time,
        historicalBookings: historicalPatterns[time],
        currentBooked: booked,
        capacity,
        noShowRate: 0.12, // 12% historical no-show rate
        walkInProbability: 0.15, // 15% walk-in probability
      };

      const aiScore = this.scoreSlot(slotData, overallAvg);
      const utilization = booked / capacity;
      const congestion = this.getCongestionLevel(utilization);
      const estimatedWait = this.estimateWaitTime(booked, 15, booked); // 15 min avg service

      slots.push({
        id: `${date}-${time}`,
        time,
        capacity,
        booked,
        congestion,
        aiScore: Math.round(aiScore),
        estimatedWait,
      });
    }

    // Sort by AI score (best slots first)
    return slots.sort((a, b) => b.aiScore - a.aiScore);
  }

  /**
   * Get explanation for why a slot is recommended
   */
  static getSlotExplanation(slot: TimeSlot): string {
    const reasons: string[] = [];
    
    if (slot.aiScore >= 80) {
      reasons.push('✓ Optimal time with minimal wait');
    }
    
    if (slot.congestion === 'Low') {
      reasons.push('✓ Low congestion period');
    }
    
    if (slot.booked < slot.capacity * 0.5) {
      reasons.push('✓ High availability');
    }
    
    if (slot.estimatedWait < 10) {
      reasons.push('✓ Quick service expected');
    }
    
    const utilizationPercent = Math.round((slot.booked / slot.capacity) * 100);
    reasons.push(`Currently ${utilizationPercent}% booked`);
    
    return reasons.join(' • ');
  }

  /**
   * Predict peak hours for a given date
   */
  static predictPeakHours(): string[] {
    return ['09:00', '10:00', '16:00']; // Morning and evening peaks
  }

  /**
   * Calculate congestion trends
   */
  static analyzeCongestionTrend(appointments: Appointment[]): {
    hour: string;
    count: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }[] {
    const hourCounts: { [key: string]: number } = {};
    
    // Count appointments by hour
    appointments.forEach(apt => {
      const hour = apt.timeSlot;
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    // Convert to array and analyze trends
    return Object.entries(hourCounts).map(([hour, count], index, arr) => {
      let trend: 'increasing' | 'stable' | 'decreasing' = 'stable';
      
      if (index > 0) {
        const prevCount = arr[index - 1][1];
        if (count > prevCount * 1.2) trend = 'increasing';
        else if (count < prevCount * 0.8) trend = 'decreasing';
      }
      
      return { hour, count, trend };
    });
  }
}
