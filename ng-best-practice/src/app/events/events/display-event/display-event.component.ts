import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styles: []
})
export class DisplayEventComponent implements OnInit {
  event$: Observable<any>
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.event$ = this.route.data.pipe(
      map(data => data?.event))
  }

}
