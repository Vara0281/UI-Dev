import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EventService } from '@shared/Services/event.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.eventService.getEventById(route.params?.id).pipe(
      catchError(() => {
        this.router.navigate(['./events']);
        return EMPTY;
      })
    );

  }
}
