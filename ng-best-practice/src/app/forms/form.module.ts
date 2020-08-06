import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { GridComponent } from './ag-grid/grid.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { DisplayEmployeeComponent } from './employee/display-employee/display-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { FormRoutingModule } from './form-routing.module';
import { FormsComponent } from './forms.component';
import { CreateEmployee2Component } from './Nested/create-employee2/create-employee2.component';
import { EmployeeDetails2Component } from './Nested/employee-details2/employee-details2.component';
import { ListEmployee2Component } from './Nested/list-employee2/list-employee2.component';
import { PaginateComponent } from './paginate/paginate.component';


@NgModule({
  declarations: [
    FormsComponent,
    CreateEmployeeComponent,
    DisplayEmployeeComponent,
    ListEmployeeComponent,
    EmployeeDetailsComponent,
    CreateEmployee2Component,
    ListEmployee2Component,
    GridComponent,
    PaginateComponent, EmployeeDetails2Component
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AgGridModule.withComponents([]),
  ],
  entryComponents: [EmployeeDetails2Component],
})
export class FormModule { }
