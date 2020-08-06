import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee2Service } from '@shared/Services/employee2.service';
import { IEmployee } from '@shared/models/IEmployee';

@Component({
  selector: 'app-employee-details2',
  templateUrl: './employee-details2.component.html',
  styleUrls: ['./employee-details2.component.css']
})
export class EmployeeDetails2Component implements OnInit {
  // for this model values comes from parent component
  title: string;
  closeBtnName: string;
  id: number;

  employee: IEmployee;
  constructor(public bsModalRef: BsModalRef, private empService: Employee2Service) { }

  ngOnInit() {
    this.empService.getEmployee(this.id).subscribe(res => this.employee = res);
  }

}
