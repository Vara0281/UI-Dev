import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { CheckFilterComponent } from './events/check-filter/check-filter.component';
import { RadioFilterComponent } from './events/radio-filter/radio-filter.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { DisplayEventComponent } from './events/display-event/display-event.component';

@NgModule({
  declarations: [
    EventsComponent,
    SpecialEventsComponent,
    AdminEventsComponent,
    CheckFilterComponent,
    RadioFilterComponent,
    WeatherInfoComponent,
    DisplayEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ProgressbarModule.forRoot()
  ]
})
export class EventsModule { }
