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

  constructor(private httpClient: HttpClient) {
    this.fetchToken();
  }

  // TODO: need to check if the token is still valid
  private fetchToken() {
    const token = sessionStorage.getItem('token');
    this.token = token;
  }

  private saveToken() {
    if (this.token) {
      sessionStorage.setItem('token', this.token);
    }
  }

  login(emailAddress: string, password: string) {
    this.httpClient
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, { emailAddress, password })
      .pipe(take(1))
      .subscribe((response) => {
        this.token = response.token;
        this.saveToken();
      });
  }
}
