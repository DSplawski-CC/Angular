import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '@/movies/types';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from '@/login/types';
import { createSignal } from '@angular/core/primitives/signals';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'accessToken' satisfies keyof Token;
  private readonly token = signal
  public isLoggedIn = signal<boolean>(!!this.getToken());

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
  ) { }

  signIn(loginData: LoginData) {
    return this.httpClient.post<Token>('/auth/login', loginData, {
      withCredentials: true,
    })
      .pipe(tap(response => {
        this.saveToken(response.accessToken);
        this.isLoggedIn.set(true);
      }),
    );
  }

  refreshToken() {
    return this.httpClient.post<Token>(`/auth/refresh`, null, {
      withCredentials: true,
    })
      .pipe(tap(response => {
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
