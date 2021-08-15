import { Component, OnInit } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { EventService } from '@shared/Services/event.service';
import { merge, Observable } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  isLoading$: Observable<boolean>
  private _showLoaderEvents: Observable<boolean>;
  private _hideLoaderEvents: Observable<boolean>;

  events = [];
  filtredEvents = [];
  filterVariables = { continents: [], price: [] };

  constructor(private eventService: EventService, private router: Router) { }

  filterContinents(continents: number[]) {
    this.filterVariables.continents = continents;
    this.filter();
  }

  filterPrice(price: number[]) {
    this.filterVariables.price = price;
    this.filter();
  }

  ngOnInit() {
    // for ResolveGaurd
    this._showLoaderEvents = this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      mapTo(true)
    )
    this._hideLoaderEvents = this.router.events.pipe(
      filter(event => event instanceof ResolveEnd),
      mapTo(false)
    )

    this.isLoading$ = merge(this._showLoaderEvents, this._hideLoaderEvents);

    this.eventService.getEvents().subscribe(
      res => this.events = this.filtredEvents = res,
      err => console.log(err.error));
  }

  filter() {
    const { continents, price } = this.filterVariables;
    const [min_price, max_price] = price;
    if (continents.length && price.length) {
      this.filtredEvents =
        this.events.filter(event => continents.includes(event.continent_id) &&
          event.price > min_price && event.price < max_price);
      return;
    }
    if (continents.length) {
      this.filtredEvents =
        this.events.filter(event => continents.includes(event.continent_id));
      return;
    }
    if (price.length) {
      this.filtredEvents =
        this.events.filter(event => event.price > min_price && event.price < max_price);
      return;
    }
    this.filtredEvents = this.events;
  }

}
