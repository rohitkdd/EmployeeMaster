import { DataFetchService } from './../../services/data-fetch.service';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { Employee } from './employee';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employeesList: Employee[] = [];
  filter = new FormControl('');
  totalEmployees = 0;
  currentPage = 1;
  limit = 5;
  hasEmployeeDeleted = false;
  isDeletionUnsuccessful = false;
  selectedEmployee: Employee = null;
  message = '';
  hasEmployeeUpdated = false;
  
  constructor(private dataFetchService: DataFetchService) { }
  
  ngOnInit() {
    this.dataFetchService.getListOfEmployees().subscribe((listOfEmployees: Employee[]) => {
      if (listOfEmployees && listOfEmployees.length) {
        this.totalEmployees = listOfEmployees.length;
      }
    });
    this.getPaginatedEmployees();
  }

  getPaginatedEmployees() {
    this.dataFetchService.getPaginatedListOfEmployees(this.currentPage, this.limit).subscribe((listOfEmployees: Employee[]) => {
      if (listOfEmployees && listOfEmployees.length) {
        this.employeesList = listOfEmployees;
      }
    });
  }

  deleteEmployee(id) {
    let confirmation = confirm('Are you sure you want to delete ?');

    if (confirmation) {
      this.dataFetchService.deleteEmployee(id).subscribe((employeeDeleted) => {
        if (employeeDeleted) {
          this.message = 'Employee deleted successfully';
          this.hasEmployeeDeleted = true;
          setTimeout(() => {
            this.hasEmployeeDeleted = false;
          }, 2500);
          this.getPaginatedEmployees();
        }
      }, (error) => {
        this.message = 'Error in deleting, please try again later';
        this.isDeletionUnsuccessful = false;
      })
    }

  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  employeeUpdated() {
    this.hasEmployeeUpdated = true;
    setTimeout(() => {
      this.hasEmployeeUpdated = false;  
    }, 3000);
    this.message = 'Employee update successful';
    this.getPaginatedEmployees();
    this.selectedEmployee = null;
  }

  toggleEditView() {
    this.selectedEmployee = null;
  }

}
