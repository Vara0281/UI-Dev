import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployee } from '../models/IEmployee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseurl = 'http://localhost:3000/api/customers';
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseurl).pipe(catchError(this.handleError));
  }

  getEmployee(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.baseurl}/${id}`).pipe(catchError(this.handleError));
  }

  addEmployee(employee: FormData) {
    return this.http.post(this.baseurl, employee).pipe(catchError(this.handleError));
  }

  updateEmployee(employee) {
    const id = employee._id || employee.get('_id');
    return this.http.put(`${this.baseurl}/${id}`, employee)
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: string) {
    return this.http.delete(`${this.baseurl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // if (error.error instanceof ErrorEvent) {
    //   console.error('Client Side Error :', error.error.message);
    // } else {
    //   console.error('Server Side Error :', error.error.message);
    // }
    return throwError(error.error
      // 'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }
}
