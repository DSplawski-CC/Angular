import { inject, Injectable } from '@angular/core';
import { LocalDbApiService } from '@core/local-db-api.service';
import { Review } from '@/movies/types';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService {
  private localDbApiService= inject(LocalDbApiService);
  private httpClient= inject(HttpClient);

  constructor() { }

  getReviews(movieId: number) {
    return this.httpClient.get<Review[]>(`/movies/${ movieId }/reviews`);
  }

  addReview(review: Review, movieId: number) {
    return this.httpClient.post<Review>(`/movies/${ movieId }/reviews`, review);
  }
}
