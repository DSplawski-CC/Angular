import { Component, output } from '@angular/core';
import { generatePasswordValidationRegex } from '@shared/utils/password-regex.utils';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { LoginData } from '@/movies/types';


@Component({
  selector: 'app-login-form',
  imports: [
    FormInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  protected readonly passwordValidationRegex= generatePasswordValidationRegex();

  submitForm = output<LoginData>();
  passwordErrorMessage = 'Password must contain at least 8 characters and:\n' +
    '- one lower case character\n' +
    '- one upper case character\n' +
    '- one digit\n' +
    '- one symbol\n';

  loginForm = this.initForm();

  initForm() {
    const formBuilder = new FormBuilder().nonNullable;

    return formBuilder.group({
      email: formBuilder.control('', { validators: [Validators.required, Validators.email] }),
      password: formBuilder.control('', { validators: [Validators.required, Validators.pattern(this.passwordValidationRegex)] }),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginData = {
        ...this.loginForm.value,
      } as unknown as LoginData;

      this.loginForm.reset();
      this.submitForm.emit(loginData);
    }
  }
}
