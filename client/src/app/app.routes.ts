import { Routes } from '@angular/router';
import {
  AboutComponent,
  CompaniesComponent,
  HomeComponent,
  OligarchComponent,
  PoliticiansComponent,
  ProductsComponent,
} from '@components';
import { LoginComponent } from './components/login';
import { Project2025Component } from './components/project2025/project2025.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oligarchs', component: OligarchComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'politicians', component: PoliticiansComponent },
  { path: 'project2025', component: Project2025Component },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: LoginComponent },
];
