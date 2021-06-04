import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  private listEmployees = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: '3',
      isActive: true,
      photoPath: '../../assets/mark.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      email: 'mark@pragimtech.com',
      contactPreference: 'Phone',
      phone: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: '2',
      isActive: true,
      photoPath: '../../assets/mary.png'
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      email: 'mark@pragimtech.com',
      contactPreference: 'Phone',
      phone: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: '3',
      isActive: false,
      photoPath: '../../assets/john.png'
    }
  ];

  getEmployees(): Observable<any> {
    return of(this.listEmployees).pipe(delay(1000));
  }

  getEmployee(id: number) {
    return this.listEmployees.find(e => e.id === id);
  }

  addEmployee(employee): void {
    const maxid = this.listEmployees.reduce((e1, e2) => {
      return e1.id > e2.id ? e1 : e2;
    }).id;
    employee.id = maxid + 1;
    this.listEmployees.push(employee);
  }

  updateEmployee(employee): void {
    const id = this.listEmployees.findIndex(e => e.id === employee.id);
    this.listEmployees[id] = employee;
  }

  deleteEmployee(id: number): void {
    const i = this.listEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.listEmployees.splice(i, 1);
    }
  }

  loadData(date: Moment): Observable<any> {
    const reqDate = date.format('YYYY-MM-DD');
    const randomTemp = Math.floor(Math.random() * 20) + 31;
    const rain = (randomTemp % 2) ? 'Yes' : 'No';
    const desc = (randomTemp % 3) ? 'Vatundi' : 'Raadu';

    return new Observable(observer =>
      observer.next({ temp: randomTemp, date: reqDate, rain, desc })
    );
  }
}
