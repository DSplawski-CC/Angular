import { Component, inject, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@/login/login-form/login-form.component';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '@/movies/types';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    LoginFormComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public router = inject(Router);

  constructor(private readonly authService: AuthService) {
  }

  async onLoginSubmit(loginData: LoginData) {
    return this.authService.signIn(loginData)
      .pipe(first())
      .subscribe({
        next: (r) => {
          console.log('navigate to /movies', r)
          this.router.navigateByUrl('/movies')
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}
