import { Component, input } from '@angular/core';
import { ReviewComponent } from '@/movies/review/review.component';
import { Review } from '@/movies/types';


@Component({
  selector: 'app-review-list',
  imports: [
    ReviewComponent,
  ],
  templateUrl: './review-list.component.html',
  styles: ``
})
export class ReviewListComponent {
  reviews = input<Review[]>([]);
}
