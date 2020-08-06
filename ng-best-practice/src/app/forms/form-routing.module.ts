import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './ag-grid/grid.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EmpFormAuthGuard } from './employee/emp-form-auth.guard';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { FormsComponent } from './forms.component';
import { CreateEmployee2Component } from './Nested/create-employee2/create-employee2.component';
import { ListEmployee2Component } from './Nested/list-employee2/list-employee2.component';
import { PaginateComponent } from './paginate/paginate.component';

const routes: Routes = [
  {
    path: '', component: FormsComponent,
    children: [
      { path: '', component: ListEmployeeComponent },
      { path: 'create', component: CreateEmployeeComponent, canDeactivate: [EmpFormAuthGuard] },
      { path: 'edit/:id', component: CreateEmployeeComponent, canDeactivate: [EmpFormAuthGuard] },
      { path: 'employee/:id', component: EmployeeDetailsComponent },

      { path: 'reactiveform', component: ListEmployee2Component },
      { path: 'create2', component: CreateEmployee2Component },
      { path: 'edit2/:id', component: CreateEmployee2Component },
    ]
  },
  { path: 'grid', component: GridComponent },
  { path: 'paginate', component: PaginateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
