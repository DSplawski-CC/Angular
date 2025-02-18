import { Component, forwardRef, Input } from '@angular/core';
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
  @Input() label: string = '';
  @Input() type: InputTypes = 'text';
  @Input() showError = true;

  value: any = '';
  disabled = false;

  onChange: any = (_: any) => {};
  onTouched: any = () => {};

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  writeValue(obj: any) {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
