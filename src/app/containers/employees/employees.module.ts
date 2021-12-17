import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyNamePipe } from 'src/app/pipes/company-name.pipe';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';


@NgModule({
  declarations: [EmployeesComponent, CompanyNamePipe, EmployeeDetailsComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [DatePipe]
})
export class EmployeesModule { }
