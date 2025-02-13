import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewData } from '@/movies/types';


type DataForm<T extends Object> = {
  [Key in keyof T]: FormControl<T[Key] | null>
}

@Component({
  selector: 'app-add-review',
  imports: [ReactiveFormsModule],
  templateUrl: './add-review.component.html',
})
export class AddReviewComponent {

  @Output('onSubmit') onSubmitEvent = new EventEmitter<ReviewData>();

  reviewForm = new FormGroup({
    title: new FormControl('', { nonNullable: false, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
    content: new FormControl('', { nonNullable: false, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(1000)] }),
    author: new FormControl('', { nonNullable: false, validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10) ]}),
    rating: new FormControl(null, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(10)] }),
  } satisfies DataForm<ReviewData>)

  onSubmit() {
    this.onSubmitEvent.emit(this.reviewForm.value as unknown as ReviewData);
  }
}
