import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventService } from '@shared/Services/event.service';

@Component({
  selector: 'app-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.css']
})
export class RadioFilterComponent implements OnInit {
  isCollapsed = false;
  TourismCosts$;
  @Output() price = new EventEmitter<number[]>();

  constructor(private eventService: EventService) { }

  filterPrices(price) {
    this.price.emit(price);
  }

  ngOnInit() {
    this.TourismCosts$ = this.eventService.getPrices();
  }

}
