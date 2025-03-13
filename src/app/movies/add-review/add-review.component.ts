import { Component, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewData } from '@/movies/types';
import { FormInputComponent } from '@shared/components/form-input/form-input.component';
import { CustomValidators } from '@narik/custom-validators';
import { cloneDeep } from 'lodash-es';


type DataForm<T extends Object> = {
  [Key in keyof T]: FormControl<T[Key]>
}

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule, FormInputComponent],
  templateUrl: './add-review.component.html',
})
export class AddReviewComponent {
  submitForm = output<ReviewData>();

  reviewForm: FormGroup<DataForm<ReviewData>>
  constructor() {
    const formBuilder = new FormBuilder().nonNullable;
    this.reviewForm = formBuilder.group({
      title: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
      content: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)] }),
      author: formBuilder.control('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)] }),
      email: formBuilder.control('', { validators: [Validators.required, Validators.email] }),
      rating: formBuilder.control(NaN, { validators: [Validators.required, CustomValidators.number, Validators.min(1), Validators.max(10)] }),
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = cloneDeep(this.reviewForm.value as unknown as ReviewData);
      this.reviewForm.reset();
      this.submitForm.emit(reviewData);
    }
  }
}
