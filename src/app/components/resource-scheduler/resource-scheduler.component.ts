import { Component, OnInit, OnDestroy } from '@angular/core';

export interface Resource {
  id: number;
  name: string;
  avatar?: string;
}

export interface Appointment {
  id: number;
  resourceId: number;
  start: string;
  end: string;
  title: string;
  clientName?: string;
  type: 'appointment' | 'unavailable';
  status?: 'confirmed' | 'no-show' | 'cancelled';
  color?: string;
}

@Component({
  selector: 'app-resource-scheduler',
  templateUrl: './resource-scheduler.component.html',
  styleUrls: ['./resource-scheduler.component.scss']
})
export class ResourceSchedulerComponent implements OnInit, OnDestroy {
  // Configuration
  startHour = 9;
  endHour = 18;
  slotDuration = 15; // minutes
  currentDate = new Date();
  
  // Current time tracking
  currentTime = new Date();
  currentTimeTop = 0;
  private timeInterval: any;

  // Mock data based on reference image
  resources: Resource[] = [
    { id: 1, name: 'JADES', avatar: '👩‍💼' },
    { id: 2, name: 'EMMA', avatar: '👩‍💼' },
    { id: 3, name: 'AINE', avatar: '👩‍💼' },
    { id: 4, name: 'AONGHUS', avatar: '👨‍💼' }
  ];

  appointments: Appointment[] = [
    // Emma's appointments
    { 
      id: 1, 
      resourceId: 2, 
      start: '2024-01-15T16:15', 
      end: '2024-01-15T17:15', 
      title: 'BIAB - REFILL FULL COLOUR ONLY',
      clientName: 'Joanne',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    },
    { 
      id: 2, 
      resourceId: 2, 
      start: '2024-01-15T17:15', 
      end: '2024-01-15T18:00', 
      title: 'Vita Liberata Full Body Spray',
      clientName: 'Sarah',
      type: 'appointment',
      status: 'no-show',
      color: '#3B82F6'
    },
    // Aine's appointments
    { 
      id: 3, 
      resourceId: 3, 
      start: '2024-01-15T15:15', 
      end: '2024-01-15T16:15', 
      title: 'BIAB - FRENCH/OMBRÉ',
      clientName: 'Grace',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    },
    { 
      id: 4, 
      resourceId: 3, 
      start: '2024-01-15T16:15', 
      end: '2024-01-15T16:45', 
      title: 'Gel Polish/Shellac Removal',
      clientName: 'Emma',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    },
    { 
      id: 5, 
      resourceId: 3, 
      start: '2024-01-15T16:45', 
      end: '2024-01-15T17:15', 
      title: 'Eye Trio (Brow Shape + Tint + Lash Tint)',
      clientName: 'Lisa',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    },
    { 
      id: 6, 
      resourceId: 3, 
      start: '2024-01-15T16:55', 
      end: '2024-01-15T17:25', 
      title: 'Gel Polish/Shellac Application Toes',
      clientName: 'Cathal',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    },
    { 
      id: 7, 
      resourceId: 3, 
      start: '2024-01-15T17:25', 
      end: '2024-01-15T17:55', 
      title: 'Gel Polish/Shellac Removal',
      clientName: 'Mary',
      type: 'appointment',
      status: 'no-show',
      color: '#8B5CF6'
    }
  ];

  constructor() {
    // Set appointments to today's date
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    this.appointments = this.appointments.map(apt => ({
      ...apt,
      start: apt.start.replace('2024-01-15', dateStr),
      end: apt.end.replace('2024-01-15', dateStr)
    }));
  }

  ngOnInit(): void {
    this.updateCurrentTime();
    this.timeInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 60000); // Update every minute
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  updateCurrentTime(): void {
    this.currentTime = new Date();
    const currentHour = this.currentTime.getHours();
    const currentMinute = this.currentTime.getMinutes();
    
    // Calculate position only if current time is within the displayed range
    if (currentHour >= this.startHour && currentHour < this.endHour) {
      const totalMinutes = (currentHour - this.startHour) * 60 + currentMinute;
      this.currentTimeTop = totalMinutes * 2; // 2px per minute
    } else {
      this.currentTimeTop = -1; // Hide if outside range
    }
  }

  getAppointmentsForResource(resourceId: number): Appointment[] {
    return this.appointments.filter(a => a.resourceId === resourceId);
  }

  isCurrentTimeVisible(): boolean {
    return this.currentTimeTop >= 0;
  }

  getTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = this.startHour; hour < this.endHour; hour++) {
      for (let min = 0; min < 60; min += this.slotDuration) {
        const time = new Date();
        time.setHours(hour, min, 0, 0);
        slots.push(time.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }));
      }
    }
    return slots;
  }

  getColumnHeight(): string {
    const totalMinutes = (this.endHour - this.startHour) * 60;
    return `${totalMinutes * 2}px`; // 2px per minute
  }

  getCurrentTimeDisplay(): string {
    return this.currentTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }

  getDayDisplay(): string {
    return this.currentDate.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }

  getAppointmentTop(appointment: Appointment): number {
    const start = new Date(appointment.start);
    const startMins = (start.getHours() - this.startHour) * 60 + start.getMinutes();
    return startMins * 2; // 2px per minute
  }

  getAppointmentHeight(appointment: Appointment): number {
    const start = new Date(appointment.start);
    const end = new Date(appointment.end);
    const durationMins = (end.getTime() - start.getTime()) / 60000;
    return Math.max(durationMins * 2, 20); // Minimum height of 20px
  }

  getAppointmentTimeRange(appointment: Appointment): string {
    const start = new Date(appointment.start);
    const end = new Date(appointment.end);
    
    const startTime = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    const endTime = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    return `${startTime}-${endTime}`;
  }
} 