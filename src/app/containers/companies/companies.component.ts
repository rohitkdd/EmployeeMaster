import { DataFetchService } from './../../services/data-fetch.service';
import { Component, OnInit } from '@angular/core';
import { Company } from './company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(private dataFetchService: DataFetchService) { }
  companiesList: Company[] = [];
  totalCompanies = 0;
  currentPage = 1;
  limit = 5; 
  ngOnInit() {
    this.dataFetchService.getListOfCompanies().subscribe((listOfCompanies: Company[]) => {
      if (listOfCompanies && listOfCompanies.length) {
        // this.companiesList = listOfCompanies;
        this.totalCompanies = listOfCompanies.length;
      }
    });  
    this.getPaginatedCompanies();
  }

  getPaginatedCompanies() {
    this.dataFetchService.getPaginatedListOfCompanies(this.currentPage, this.limit).subscribe((listOfCompanies: Company[]) => {
      if (listOfCompanies && listOfCompanies.length) {
        this.companiesList = listOfCompanies;
      }
    }); 
  }

}
