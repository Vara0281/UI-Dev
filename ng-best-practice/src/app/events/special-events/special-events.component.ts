import { Component, OnInit } from '@angular/core';
import { EventService } from '@shared/Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = [];
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        this.router.navigate(['/login']);
        console.log(err.error);
      });
  }

}
