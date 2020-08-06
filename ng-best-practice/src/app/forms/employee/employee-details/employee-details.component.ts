import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'app/shared/models/IEmployee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '@shared/Services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  emp: IEmployee;
  id: string;

  constructor(
    private aRoute: ActivatedRoute,
    private eService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.aRoute.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.eService.getEmployee(this.id).subscribe(
        (emp) => this.emp = emp,
        (err: any) => console.log(err));
    });
  }

  getNextEmployee() {
    //   if (this.id <= 6) {
    //     this.id += 1;
    //   } else {
    //     this.id = 1;
    //   }
    this.router.navigate(['forms/employee', this.id], { queryParamsHandling: 'preserve' });
  }
}
