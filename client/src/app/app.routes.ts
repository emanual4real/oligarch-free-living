import { Routes } from '@angular/router';
import {
  AboutComponent,
  CompaniesComponent,
  HomeComponent,
  OligarchTableComponent,
  PoliticiansComponent,
  ProductsComponent,
} from '@components';
import { Project2025Component } from './components/project2025/project2025.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oligarchs', component: OligarchTableComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'politicians', component: PoliticiansComponent },
  { path: 'project2025', component: Project2025Component },
  { path: 'about', component: AboutComponent },
];
