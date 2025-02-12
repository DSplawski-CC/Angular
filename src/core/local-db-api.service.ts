import { computed, Injectable, signal } from '@angular/core';
import { Review } from '@/movies/types';


@Injectable({
  providedIn: 'root'
})
export class LocalDbApiService {
  moviesReviewsMap = signal(new Map<string, Review[]>([
    [
      '1249289', [
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
  _currentMovieId = signal<Maybe<string>>(undefined);

  constructor() {

  }

  get movieId() {
    return this._currentMovieId();
  }
  set movieId(movieId: Maybe<string>) {
    this._currentMovieId.set(movieId);
  }

  get reviews() {
    return !!this._currentMovieId()
      ? this.moviesReviewsMap().get(this._currentMovieId()!)
      : undefined;
  }

  addReview(review: Review) {
    if (!this._currentMovieId()) {
      throw new Error('MovieId not set!');
    }
    if (!review) {
      throw new Error('Review is not defined!');
    }

    const movieId = this._currentMovieId()!;
    let reviews = this.moviesReviewsMap().get(movieId) ?? [];

    if (reviews.find(item => item.id === review.id)) {
      throw new Error('Review already exists!');
    }

    reviews.push(review);
    this.moviesReviewsMap().set(movieId, reviews);
  }
}
