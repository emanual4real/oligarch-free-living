import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Company, Oligarch, Product, Project2025 } from '@types';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getOligarchs() {
    return this.httpClient.get<Oligarch[]>(`${environment.apiUrl}/oligarchs`);
  }

  getProducts() {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getCompanies() {
    return this.httpClient.get<Company[]>(`${environment.apiUrl}/companies`);
  }

  getProject2025Data() {
    return this.httpClient.get<Project2025[]>(`${environment.apiUrl}/project2025`);
  }
}
