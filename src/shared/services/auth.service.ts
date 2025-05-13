import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '@/movies/types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@/login/types';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'accessToken' satisfies keyof Token;

  public isLoggedIn = signal<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  signIn(loginData: LoginData) {
    return this.httpClient.post<Token>('/auth/login', loginData)
      .pipe(tap(response => {
        console.log('signIn', response);
        this.saveToken(response.accessToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

  refreshToken() {
    return this.httpClient.post<Token>(`/auth/refresh`, null)
      .pipe(tap(response => {
        console.log('refresh', response);
        this.saveToken(response.accessToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn.set(false);
    this.router.navigate(['/sign-in']).then();
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    return token;
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
