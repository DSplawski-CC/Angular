import { Component, computed, input } from '@angular/core';
import { ReviewComponent } from '@/movies/review/review.component';
import { Review } from '@/movies/types';
import { StarIconComponent } from '@shared/components/star-icon/star-icon.component';

@Component({
  selector: 'app-review-list',
  imports: [
    ReviewComponent,
    StarIconComponent,
  ],
  templateUrl: './review-list.component.html',
  styles: ``
})
export class ReviewListComponent {
  reviews = input<Review[]>([]);

  averageRating = computed(() => this.reviews().length > 0
    ? this.reviews()
        .map(r => r.rating)
        .reduce((a, b) => a + b) / this.reviews().length
    : null
  );
}
