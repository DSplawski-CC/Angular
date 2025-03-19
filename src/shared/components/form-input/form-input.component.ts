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
  showError = input<boolean | undefined>(true);

  value = model(this.type() === 'number' ? null : '');
  disabled = signal(false);

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue: any = input.value;

    // Auto-convert if type is number
    if (this.type() === 'number') {
      newValue = input.value === '' ? null : Number(input.value);
    }

    this.value.set(newValue);
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
