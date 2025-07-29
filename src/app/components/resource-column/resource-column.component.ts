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

}
