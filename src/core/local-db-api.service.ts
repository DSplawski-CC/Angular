import { Injectable, signal } from '@angular/core';
import { Review } from '@/movies/types';


@Injectable({
  providedIn: 'root'
})
export class LocalDbApiService {
  moviesReviewsMap = signal(new Map<number, Review[]>([
    [
      1249289, [
        {
        id: 'review1',
        movieId: 1249289,
        title: 'Made my day',
        author: 'Mike',
        content: 'Really good action movie',
        rating: 7.5,
        createdAt: '2018-06-01',
        },
        {
          id: 'review2',
          movieId: 1249289,
          title: 'Best dialogues ever!',
          author: 'Jason',
          content: 'I had fun watching this movie. The dialogs between main characters is essential part',
          rating: 6.8,
          createdAt: '2018-04-21',
        }
      ]
    ]
  ]));

  constructor() {}

  getReviews(movieId: number) {
    if (!this.moviesReviewsMap().has(movieId)) {
      this.moviesReviewsMap().set(movieId, []);
    }

    return this.moviesReviewsMap().get(movieId)!;
  }

  addReview(review: Review, movieId: number) {
    if (!movieId) {
      throw new Error('MovieId is not valid!');
    }
    if (!review) {
      throw new Error('Review is not defined!');
    }

    const reviews = this.getReviews(movieId);
    review.id = 'review' + reviews?.length + 1;

    reviews.push(review);
    this.moviesReviewsMap().set(movieId, reviews);

    return review;
  }
}
