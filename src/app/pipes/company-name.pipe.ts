import { Company } from './../containers/companies/company';
import { DataFetchService } from './../services/data-fetch.service';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {

  constructor(private dataFetchService: DataFetchService) {
  }

  transform(value: number, ...args: any[]): any {
    if (value) {
      let companies: Company[] = JSON.parse(localStorage.getItem('companies'));
      return (companies.find((company) => company.id === value)).compaName;
    }
  } 
    //   .subscribe((company: Company) => {
    //     if (company) {
    //       return company.compaName;
    //     }
    //   });
    // } else {
    //   return null;
    // }







}
