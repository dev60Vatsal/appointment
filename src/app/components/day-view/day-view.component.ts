import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment, Resource } from '../../modals/modal';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.scss'
})
export class DayViewComponent implements OnInit, OnDestroy {

  startHour = 9;
  endHour = 17;
  slotDuration = 15;

  currentTime = new Date();
  currentTimeTop = 0;
  private timeInterval: any;

  resources: Resource[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  appointments: Appointment[] = [
    { id: 1, resourceId: 1, start: '2025-07-24T09:03', end: '2025-07-24T09:13', type: 'appointment', title: 'Haircut' },
    { id: 2, resourceId: 1, start: '2025-07-24T10:00', end: '2025-07-24T10:45', type: 'unavailable' },
    { id: 3, resourceId: 2, start: '2025-07-24T11:15', end: '2025-07-24T11:50', type: 'appointment', title: 'Shave' },
    { id: 4, resourceId: 3, start: '2025-07-24T13:10', end: '2025-07-24T13:45', type: 'appointment', title: 'Coloring' },
    { id: 5, resourceId: 2, start: '2025-07-24T14:30', end: '2025-07-24T15:15', type: 'appointment', title: 'Styling' },
    { id: 6, resourceId: 1, start: '2025-07-24T16:00', end: '2025-07-24T16:30', type: 'unavailable' }
  ];

  constructor() {}

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

  getAppointmentsForResource(resourceId: any) {
    return this.appointments.filter(a => a.resourceId === resourceId);
  }

  isCurrentTimeVisible(): boolean {
    return this.currentTimeTop >= 0;
  }

}
