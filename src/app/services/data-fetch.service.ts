import { Employee } from './../containers/employees/employee';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { tap } from 'rxjs/operators';
import { Company } from '../containers/companies/company';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  totalEmployees: number;
  companies: Company[] =  [];
  constructor(private http: HttpClient) {
    this.getListOfCompanies().subscribe((listOfCompanies: Company[]) => {
      if (listOfCompanies && listOfCompanies.length) {
        this.companies = listOfCompanies;
        localStorage.setItem('companies', JSON.stringify(this.companies));
      }
    });
  }

  employeesBaseUrl = environment.EMPLOYEES_ENDPOINT;
  companiesBaseUrl = environment.COMPANIES_ENDPOINT;

  getListOfEmployees() {
    return this.http.get(this.employeesBaseUrl);
  }

  getPaginatedListOfEmployees(page = 1, size = 10) {
    let params = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', size.toString());
    return this.http.get(this.employeesBaseUrl, {params: params});
  }

  getListOfCompanies() {
    return this.http.get(this.companiesBaseUrl);
  }

  getPaginatedListOfCompanies(page = 1, size = 10) {
    let params = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', size.toString());
    return this.http.get(this.companiesBaseUrl, {params: params});
  }
  
  deleteEmployee(id) {
    return this.http.delete(`${this.employeesBaseUrl}/${id}`);
  }

  getCompanyByCompanyId(id) {
    return this.http.get(`${this.companiesBaseUrl}/${id}`);
  }

  getChangesInObject(obj1: any, obj2: any) {
    let result: any = {};
    let change;
    for (let key in obj1) {
      if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
        change = this.getChangesInObject(obj1[key], obj2[key]);
        if (this.isEmptyObject(change) === false) {
          result[key] = change;
        }
      }
      else if (obj2[key] != obj1[key]) {
        result[key] = obj2[key];
      }
    }
    return result;
  }

  isEmptyObject(obj: any) {
    let name;
    for (name in obj) {
      return false;
    }
    return true;
  }

  updateEmployee(id, changes) {
    return this.http.patch(`${this.employeesBaseUrl}/${id}`, changes);
  }

}
