import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '@shared/models/IEmployee';
import { Employee2Service } from '@shared/Services/employee2.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeDetails2Component } from '../employee-details2/employee-details2.component';

@Component({
  selector: 'app-list-employee2',
  templateUrl: './list-employee2.component.html',
  styleUrls: ['./list-employee2.component.css']
})
export class ListEmployee2Component implements OnInit {
  bsModalRef: BsModalRef;
  employees: IEmployee[];
  order = false;
  constructor(
    private empService: Employee2Service, private modalService: BsModalService,
    private route: Router,
    private toastr: ToastrService) { }

  viewEmployee(id: number) {
    const initialState = { title: 'Modal with component', id };
    this.bsModalRef = this.modalService.show(EmployeeDetails2Component, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
    // this.bsModalRef.content.id = id;
  }

  getEmployees() {
    this.empService.getEmployees().subscribe(
      emp => {
        this.employees = emp;
      },
      err => console.log(err)
    );
  }

  editEmployee(id: number) {
    this.route.navigate(['forms/edit2', id]);
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure want delete this record..?')) {
      return;
    }

    this.empService.deleteEmployee(id).subscribe(() => {
      this.toastr.warning(`employee with id ${id} is daleted`, 'Delete');
      this.getEmployees();
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  sortByName() {
    if (this.order) {
      this.employees = this.employees.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );
    } else {
      this.employees = this.employees.sort((a, b) =>
        a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 1
      );
    }
    this.order = !this.order;
  }

}
