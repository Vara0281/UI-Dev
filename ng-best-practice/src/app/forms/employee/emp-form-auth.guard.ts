import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmpFormAuthGuard implements CanDeactivate<CreateEmployeeComponent> {

  canDeactivate(component: CreateEmployeeComponent): Observable<boolean> | boolean {
    if (component.createEmployeeForm.dirty) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

}
