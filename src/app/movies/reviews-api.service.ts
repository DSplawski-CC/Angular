import { Injectable } from '@angular/core';
import { LocalDbApiService } from '@core/local-db-api.service';
import { Review } from '@/movies/types';

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService {
  constructor(public localDbApiService: LocalDbApiService) { }

  get movieId() {
    return this.localDbApiService.movieId;
  }
  set movieId(movieId: Maybe<string>) {
    this.localDbApiService.movieId = movieId;
  }

  get reviews() {
    return this.localDbApiService.reviews;
  }

  addReview(review: Review) {
    this.localDbApiService.addReview(review);
  }
}
