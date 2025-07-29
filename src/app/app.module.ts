import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import { TimeColumnComponent } from './components/time-column/time-column.component';
import { ResourceColumnComponent } from './components/resource-column/resource-column.component';
import { AppointmentBlockComponent } from './components/appointment-block/appointment-block.component';
import { ResourceSchedulerComponent } from './components/resource-scheduler/resource-scheduler.component';

@NgModule({
  declarations: [
    AppComponent,
    DayViewComponent,
    TimeColumnComponent,
    ResourceColumnComponent,
    AppointmentBlockComponent,
    ResourceSchedulerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
