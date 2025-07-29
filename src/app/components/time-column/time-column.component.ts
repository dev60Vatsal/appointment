import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-column',
  templateUrl: './time-column.component.html',
  styleUrl: './time-column.component.scss'
})
export class TimeColumnComponent implements OnInit {
  @Input() startHour = 9;
  @Input() endHour = 17;
  @Input() slotDuration = 15; // in minutes

  timeSlots: string[] = [];

  ngOnInit(): void {
    this.generateTimeSlots();
  }

  ngOnChanges(): void {
    this.generateTimeSlots();
  }

  private generateTimeSlots(): void {
    const times: string[] = [];

    for (let hour = this.startHour; hour < this.endHour; hour++) {
      for (let min = 0; min < 60; min += this.slotDuration) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        times.push(`${h}:${m}`);
      }
    }

    this.timeSlots = times;
  }

  getTimeSlotHeight(): string {
    return `${this.slotDuration * 2}px`; // 2px per minute
  }
}
