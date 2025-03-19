import { Component, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewData } from '@/movies/types';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { CustomValidators } from '@narik/custom-validators';


type DataForm<T extends Object> = {
  [Key in keyof T]: T[Key] extends Object ? { [SubKey in keyof T[Key]]: FormControl<T[Key][SubKey]> } : FormControl<T[Key]>
}

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './add-review.component.html',
})
export class AddReviewComponent {
  submitForm = output<ReviewData>();

  reviewForm = this.initForm();

  initForm() {
    const formBuilder = new FormBuilder().nonNullable;

    return formBuilder.group({
      author: formBuilder.group({
        name: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3)] }),
        email: formBuilder.control('', { validators: [Validators.email] }),
      }),
      title: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
      content: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)] }),
      rating: formBuilder.control(NaN, { validators: [Validators.required, CustomValidators.number, Validators.min(1), Validators.max(10)] }),
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = {
        ...this.reviewForm.value,
      } as unknown as ReviewData;
      this.reviewForm.reset();
      this.submitForm.emit(reviewData);
    }
  }
}
