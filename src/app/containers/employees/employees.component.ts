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
        this.hasEmployeeDeleted= false;
      }
    });
  }

  deleteEmployee(id) {
    let confirmation = confirm('Are you sure you want to delete ?');

    if (confirmation) {
      this.dataFetchService.deleteEmployee(id).subscribe((employeeDeleted) => {
        if (employeeDeleted) {
          this.hasEmployeeDeleted = true;
          this.getPaginatedEmployees();
        }
      }, (error) => {
        this.isDeletionUnsuccessful = false;
      })
    }

  }

}
