import { Component, OnInit } from '@angular/core';
import { EventService } from '@shared/Services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events = [];
  filtredEvents = [];
  filterVariables = { continents: [], price: [] };

  constructor(private eventService: EventService) { }
  filterContinents(continents: number[]) {
    this.filterVariables.continents = continents;
    this.filter();
  }

  filterPrice(price: number[]) {
    this.filterVariables.price = price;
    this.filter();
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      res => this.events = this.filtredEvents = res,
      err => console.log(err.error));
  }

  filter() {
    const { continents, price } = this.filterVariables;
    if (continents.length && price.length) {
      const [min, max] = price;
      this.filtredEvents =
        this.events.filter(c => continents.includes(c.continent_id) &&
          c.price > min && c.price < max);
      return;
    }
    if (continents.length) {
      this.filtredEvents =
        this.events.filter(c => continents.includes(c.continent_id));
      return;
    }
    if (price.length) {
      const [min, max] = price;
      this.filtredEvents = this.events.filter(c => c.price > min && c.price < max);
      return;
    }
    this.filtredEvents = this.events;
  }

}
