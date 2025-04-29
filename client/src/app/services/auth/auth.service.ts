import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  get hasToken() {
    return this.token !== null;
  }

  get getToken() {
    return this.token;
  }

  constructor(private httpClient: HttpClient) {}

  login(emailAddress: string, password: string) {
    this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, { emailAddress, password })
      .pipe(take(1))
      .subscribe((response) => {
        this.token = response.token;
      });
  }
}
