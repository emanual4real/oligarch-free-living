import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OligarchData } from '@types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getDataByOligarch() {
    return this.httpClient.get<OligarchData[]>(
      'http://localhost:4200/oligarch.json'
    );
  }
}
