import { Component, OnInit } from '@angular/core';
import { Appointment, Resource } from '../../modals/modal';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.scss'
})
export class DayViewComponent implements OnInit {

  startHour = 9;
  endHour = 17;
  slotDuration = 15;

  resources: Resource[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  appointments: Appointment[] = [
    { id: 1, resourceId: 1, start: '2025-07-24T09:03', end: '2025-07-24T09:13', type: 'appointment', title: 'Haircut' },
    { id: 2, resourceId: 1, start: '2025-07-24T10:00', end: '2025-07-24T10:45', type: 'unavailable' },
    { id: 3, resourceId: 2, start: '2025-07-24T11:15', end: '2025-07-24T11:50', type: 'appointment', title: 'Shave' },
    { id: 4, resourceId: 3, start: '2025-07-24T13:10', end: '2025-07-24T13:45', type: 'appointment', title: 'Coloring' }
  ];

  constructor() {}

  ngOnInit(): void {}

  getAppointmentsForResource(resourceId: any) {
    return this.appointments.filter(a => a.resourceId === resourceId);
  }

}
