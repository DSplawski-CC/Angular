import { Component, forwardRef, input, model, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-form-input',
  imports: [
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    }
  ],
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements ControlValueAccessor {
  label = input('');
  type = input<InputType | 'textarea'>('text');
  showError = input(true);

  value = model('');
  disabled = signal(false);

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(this.value());
  }

  writeValue(obj: any) {
    this.value.set(obj);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
