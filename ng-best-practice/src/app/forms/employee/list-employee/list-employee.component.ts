import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'app/shared/Services/employee.service';
import { IEmployee } from 'app/shared/models/IEmployee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  searchterm: string;
  employees: IEmployee[];
  filteredEmployees: IEmployee[];

  get searchTerm(): string {
    return this.searchterm;
  }
  set searchTerm(value: string) {
    this.searchterm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private empService: EmployeeService, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.empService.getEmployees().subscribe(emp => {
      this.employees = emp;
      console.log(this.employees);
      this.aRoute.queryParamMap.subscribe(params => {
        if (params.has('searchTerm')) {
          this.searchTerm = params.get('searchTerm');
        } else {
          this.filteredEmployees = this.employees;
        }
      });
    });
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(emp => emp.name.toLowerCase().includes(searchString.toLowerCase()));
  }

  onDeleteNotification(id: string) {
    const i = this.filteredEmployees.findIndex(e => e._id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }
}
