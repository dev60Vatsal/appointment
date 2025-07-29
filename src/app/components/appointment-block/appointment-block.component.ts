import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '../../modals/modal';

@Component({
  selector: 'app-appointment-block',
  templateUrl: './appointment-block.component.html',
  styleUrl: './appointment-block.component.scss'
})
export class AppointmentBlockComponent implements OnInit {

  @Input() appointment!: Appointment;
  @Input() startHour!: number;

  top = 0;
  height = 0;
  background = '#2196f3'; // default: appointment blue
  label = '';
  borderColor = '#1976d2';

  ngOnInit(): void {
    this.calculatePosition();
    this.setStyling();
  }

  private calculatePosition(): void {
    const start = new Date(this.appointment.start);
    const end = new Date(this.appointment.end);

    const startMins = (start.getHours() - this.startHour) * 60 + start.getMinutes();
    const durationMins = (end.getTime() - start.getTime()) / 60000;

    this.top = startMins * 2;       // 1 min = 2px
    this.height = Math.max(durationMins * 2, 20); // Minimum height of 20px
    
    console.log('Appointment:', this.appointment.title, 'Top:', this.top, 'Height:', this.height);
  }

  private setStyling(): void {
    this.label = this.appointment.title || this.appointment.type;

    if (this.appointment.type === 'unavailable') {
      this.background = '#9e9e9e'; // gray for unavailable
      this.borderColor = '#757575';
    } else {
      this.background = '#2196f3'; // blue for appointments
      this.borderColor = '#1976d2';
    }
  }

  getStyles(): any {
    return {
      top: `${this.top}px`,
      height: `${this.height}px`,
      backgroundColor: this.background,
      borderColor: this.borderColor
    };
  }
}
