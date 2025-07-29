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

  ngOnInit(): void {
    const start = new Date(this.appointment.start);
    const end = new Date(this.appointment.end);

    const startMins = (start.getHours() - this.startHour) * 60 + start.getMinutes();
    const durationMins = (end.getTime() - start.getTime()) / 60000;

    this.top = startMins * 2;       // 1 min = 2px
    this.height = durationMins * 2;

    this.label = this.appointment.title || this.appointment.type;

    if (this.appointment.type === 'unavailable') {
      this.background = '#bdbdbd'; // gray for unavailable
    }
  }

}
