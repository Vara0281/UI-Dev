import { Component, OnInit } from '@angular/core';
import { EventService } from '@shared/Services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  adminEvents = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getAdminEvents().subscribe(
      res => this.adminEvents = res,
      err => console.log(err.error));
  }

}
