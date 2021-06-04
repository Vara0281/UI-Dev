import { Component, OnInit } from '@angular/core';
import { UtilityService } from '@shared/Services/utility.service';
import { map, scan, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  dayChanges$ = new BehaviorSubject<number>(0);
  daysFromToday$ = this.dayChanges$.pipe(scan((ov, nv) => ov + nv, 0));
  currentDate$ = this.daysFromToday$.pipe(map(n => moment().add(n, 'days')));

  previousDate$ = this.currentDate$.pipe(map(m => m.clone().subtract(1, 'days')));
  nextDate$ = this.currentDate$.pipe(map(m => m.clone().add(1, 'days')));
  weatherData$ = this.currentDate$.pipe(
    switchMap((m) => this.utilityService.loadData(m)),
    tap(console.log), shareReplay()
  );
  constructor(private utilityService: UtilityService) { }

  ngOnInit(): void {
  }

}
