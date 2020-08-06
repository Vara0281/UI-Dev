import { Component, OnInit, ViewChild } from '@angular/core';
import { IEmployee } from 'app/shared/models/IEmployee';
import { Department } from 'app/shared/models/department.model';
import { EmployeeService } from '@shared/Services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  id: string;
  employee: IEmployee;
  previewPhoto: string;
  datePickerConfig: Partial<BsDatepickerConfig>;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(
    private empService: EmployeeService,
    private toastr: ToastrService,
    private router: Router, private route: ActivatedRoute) {
    this.datePickerConfig = Object.assign(
      {}, { containerClass: 'theme-dark-blue', dateInputFormat: 'DD/MM/YYYY' }
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.empService.getEmployee(this.id).subscribe(
          (employee) => {
            this.employee = employee;
            this.employee.dateOfBirth = new Date(employee.dateOfBirth);
          },
          (err: any) => {
            console.log(err.message);
            this.router.navigate(['forms']);
          });
      } else {
        this.getEmployee();
      }
    });
  }

  private getEmployee() {
    this.employee = {
      _id: null,
      name: null,
      gender: null,
      contactPreference: null,
      phone: null,
      email: null,
      dateOfBirth: null,
      department: 'select',
      isActive: false,
      avatar: null
    };
  }

  handleFileInput(files: FileList) {
    const file = files.item(0);
    const reader = new FileReader();  // for Preview file
    reader.onload = (e) => {
      this.previewPhoto = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.employee.avatar = file;  // assign value
  }

  saveEmployee() {
    if (this.id) {
      if (typeof (this.employee.avatar) === 'object') {
        const user: FormData = new FormData();
        Object.keys(this.employee).forEach(key => {
          user.append(key, this.employee[key]);
        });
        this.empService.updateEmployee(user).subscribe(() => {
          this.createEmployeeForm.reset();
          this.router.navigate(['forms']);
        },
          (error: any) => console.log(error)
        );
      } else {
        this.empService.updateEmployee(this.employee).subscribe(() => {
          this.createEmployeeForm.reset();
          this.router.navigate(['forms']);
        },
          (error: any) => {
            console.log(error),
              this.toastr.error(error, 'Error');
          }
        );
      }
    } else {
      const { _id, ...employee } = this.employee;
      const user: FormData = new FormData();
      Object.keys(employee).forEach(key => {
        user.append(key, employee[key]);
      });

      this.empService.addEmployee(user).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this.router.navigate(['forms']);
        },
        (error) => {
          console.log(error),
            this.toastr.error(error.message, 'Error');
        }
      );
    }
  }
}
