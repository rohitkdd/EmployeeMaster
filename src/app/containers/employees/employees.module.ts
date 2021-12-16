import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditEmployeeDetailsComponent } from './components/edit-employee-details/edit-employee-details.component';


@NgModule({
  declarations: [EmployeesComponent, EditEmployeeDetailsComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class EmployeesModule { }
