import { Component, input } from '@angular/core';
import { Review } from '@/movies/types';
import { DatePipe } from '@angular/common';
import { StarIconComponent } from '@shared/components/star-icon/star-icon.component';


@Component({
  selector: 'app-review',
  imports: [
    DatePipe,
    StarIconComponent,
  ],
  templateUrl: './review.component.html',
})
export class ReviewComponent {
  review = input.required<Review>();

  constructor() {}
}
