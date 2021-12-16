import { Employee } from './../containers/employees/employee';
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  totalEmployees: number;

  constructor(private http: HttpClient) { }

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
}
