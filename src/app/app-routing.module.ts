import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'employees', pathMatch: 'full'},
      { path: 'employees', loadChildren: () => import('./containers/employees/employees.module').then(m => m.EmployeesModule) },
      { path: 'companies', loadChildren: () => import('./containers/companies/companies.module').then(m => m.CompaniesModule) }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
