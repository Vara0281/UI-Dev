import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployee } from 'app/shared/models/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class Employee2Service {
  baseUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: IEmployee): Observable<void> {
    return this.http
      .post<void>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<any> {
    return this.http
      .put<any>(`${this.baseUrl}/${employee._id}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRespone: HttpErrorResponse) {
    if (errorRespone.error instanceof ErrorEvent) {
      console.error('Client Side Error : ', errorRespone.error.message);
    } else {
      console.error('Server Side Error : ', errorRespone);
    }
    return throwError(errorRespone
      // 'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }

  // additional for async validations
  getUserByEmail(email: string): Observable<IEmployee[]> {
    return this.http
      .get<IEmployee[]>(`${this.baseUrl}?email=${email}`)
      .pipe(catchError(this.handleError));
  }

  getUserByUsername(name: string) {
    // return this.http.get<IEmployee[]>(`${this.url}?fullName=${name}`).pipe(catchError(this.handleError));
    // or using HttpParams
    return this.http.get<IEmployee[]>(this.baseUrl, {
      params: new HttpParams().set('fullName', name)
    }).pipe(catchError(this.handleError));

  }
}
