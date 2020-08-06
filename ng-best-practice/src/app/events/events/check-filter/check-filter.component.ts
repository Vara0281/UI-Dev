import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventService } from '@shared/Services/event.service';

@Component({
  selector: 'app-check-filter',
  templateUrl: './check-filter.component.html',
  styleUrls: ['./check-filter.component.css']
})
export class CheckFilterComponent implements OnInit {
  isCollapsed = false;
  continents$;
  @Output() checkedContinents = new EventEmitter<number[]>();
  checked = [];

  constructor(private eventService: EventService) { }

  filterContinents(id: number) {
    const index = this.checked.indexOf(id);
    (index === -1) ? this.checked.push(id) : this.checked.splice(index, 1);
    this.checkedContinents.emit(this.checked);
  }

  ngOnInit() {
    this.continents$ = this.eventService.getContinents();
  }
}
