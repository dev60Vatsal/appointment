import { Component, Input } from '@angular/core';
import { Appointment } from '../../modals/modal';

@Component({
  selector: 'app-resource-column',
  templateUrl: './resource-column.component.html',
  styleUrl: './resource-column.component.scss'
})
export class ResourceColumnComponent {

  @Input() appointments: Appointment[] = [];
  @Input() startHour!: number;
  @Input() endHour!: number;

  getColumnHeight(): string {
    const totalMinutes = (this.endHour - this.startHour) * 60;
    return `${totalMinutes * 2}px`; // 2px per minute
  }

  getHours(): number[] {
    const hours: number[] = [];
    for (let hour = this.startHour; hour < this.endHour; hour++) {
      hours.push(hour);
    }
    return hours;
  }
}
