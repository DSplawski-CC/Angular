import { Injectable } from '@angular/core';
import { LocalDbApiService } from '@core/local-db-api.service';
import { Review } from '@/movies/types';


@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService {
  constructor(
    public localDbApiService: LocalDbApiService,
  ) { }

  getReviews(movieId: number) {
    return this.localDbApiService.getReviews(movieId);
  }

  addReview(review: Review, movieId: number) {
    this.localDbApiService.addReview(review, movieId);
  }
}
