import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OligarchData } from '@types';
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
  } /////local
}
