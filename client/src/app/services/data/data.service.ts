import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OligarchData, Products, Project2025 } from '@types';
import { environment } from '@environment';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getDataByOligarch() {
    return this.httpClient.get<OligarchData[]>(
      `${environment.apiUrl}/oligarch.json`
    );
  }

  getProject2025Data() {
    return this.httpClient.get<Project2025[]>(
      `${environment.apiUrl}/project2025.json`
    );
  }

  getDataByProducts() {
    return this.httpClient.get<Products[]>(
      `${environment.apiUrl}/products.json`
    );
  }

  getFromApi() {
    return this.httpClient.get(`https://oligarchfreeliving.com/server`);
  }
}
