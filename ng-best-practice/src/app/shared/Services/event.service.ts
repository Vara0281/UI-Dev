import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsUrl = 'http://localhost:3000/api/events';
  continents = [
    { _id: 1, name: 'Asia' },
    { _id: 2, name: 'Europe' },
    { _id: 3, name: 'Africa' },
    { _id: 4, name: 'Australia' },
    { _id: 5, name: 'Antarctica' },
    { _id: 6, name: 'North America' },
    { _id: 7, name: 'South America' },
  ];

  TourismCosts = [
    { _id: 1, name: 'All', price: [] },
    { _id: 2, name: '0-199', price: [0, 199] },
    { _id: 3, name: '200-249', price: [200, 249] },
    { _id: 4, name: '250-279', price: [250, 279] },
    { _id: 5, name: '280-299', price: [280, 299] },
    { _id: 6, name: 'More Than 300', price: [300, 15000] },
  ];

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this.eventsUrl);
  }

  getEventById(id: number) {
    return this.http.get<any>(`${this.eventsUrl}/byid/${id}`).pipe(delay(2000));
  }

  getSpecialEvents() {
    return this.http.get<any>(`${this.eventsUrl}/special`);
  }

  getAdminEvents() {
    return this.http.get<any>(`${this.eventsUrl}/admins`);
  }

  getContinents() {
    return of(this.continents);
  }

  getPrices() {
    return of(this.TourismCosts);
  }

}
