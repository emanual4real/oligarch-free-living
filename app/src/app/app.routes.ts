import { Routes } from '@angular/router';
import {
  AboutComponent,
  CompaniesComponent,
  HomeComponent,
  OligarchTableComponent,
  PoliticiansComponent,
  ProductsComponent,
} from '@components';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oligarchs', component: OligarchTableComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'politicians', component: PoliticiansComponent },
  { path: 'about', component: AboutComponent },
];
