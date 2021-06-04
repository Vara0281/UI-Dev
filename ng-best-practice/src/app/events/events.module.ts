import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { CheckFilterComponent } from './events/check-filter/check-filter.component';
import { RadioFilterComponent } from './events/radio-filter/radio-filter.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

@NgModule({
  declarations: [EventsComponent, SpecialEventsComponent, AdminEventsComponent, CheckFilterComponent, RadioFilterComponent, WeatherInfoComponent],
  imports: [
    CommonModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
