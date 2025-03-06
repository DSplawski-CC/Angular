import { TestBed } from '@angular/core/testing';

import { ReviewsApiService } from './reviews-api.service';
import { Review } from '@/movies/types';

describe('ReviewsApiService', () => {
  let service: ReviewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return reviews', () => {
    expect(service.getReviews(1249289)).toBeTruthy();
  });

  it('should return falsy', () => {
    expect(service.getReviews(0)).toBeFalsy();
  });

  it('should add review', () => {
    const review: Review = {
      author: 'test',
      content: 'test',
      title: 'test',
      rating: 5,
      movieId: 1249289,
      createdAt: new Date(Date.now()).toISOString(),
      id: '',
    };

    service.addReview(review, 1249289);
    expect(service.getReviews(1249289)).toContain(review);
  });

  it('should not add review', () => {
    const review: Review = {
      author: 'test',
      content: 'test',
      title: 'test',
      rating: 5,
      movieId: 1249289,
      createdAt: new Date(Date.now()).toISOString(),
      id: '',
    };

    expect(() => service.addReview(null as unknown as Review, 1249289)).toThrow();
    expect(() => service.addReview(review, null as unknown as number)).toThrow();
    expect(service.getReviews(1249289)).not.toContain(review);
  });
});
