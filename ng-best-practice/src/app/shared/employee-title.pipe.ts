import { Pipe, PipeTransform } from '@angular/core';
import { IEmployee } from './models/IEmployee';

@Pipe({
  name: 'employeeTitle'
})
export class EmployeeTitlePipe implements PipeTransform {
  transform(emp: IEmployee, ...args: any[]): IEmployee {
    if (emp.name.startsWith('Mr') || emp.name.startsWith('Miss')) { return emp; }

    if (emp.gender.toLowerCase() === 'male') {
      emp.name = `Mr. ${emp.name}`;
      return emp;
    }
    emp.name = `Miss. ${emp.name}`;
    return emp;
  }
}

