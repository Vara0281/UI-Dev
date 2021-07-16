import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { SafeData } from '@shared/models/Safe-data.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpFormAuthGuard implements CanDeactivate<SafeData> {

  canDeactivate(component: SafeData): Observable<boolean> | boolean {
    if (component.isDataSaved()) {
      return confirm('Are you sure you want to discard your changes?');
    }
    return true;
  }

}
