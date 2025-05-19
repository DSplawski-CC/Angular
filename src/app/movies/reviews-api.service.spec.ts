import { TestBed } from '@angular/core/testing';

import { ReviewsApiService } from './reviews-api.service';
import { Review } from '@/movies/types';
import { lastValueFrom } from 'rxjs';

describe('ReviewsApiService', () => {
  let service: ReviewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return reviews', async () => {
    expect((await lastValueFrom(service.getReviews(1249289))).length).toBeTruthy();
  });

  it('should return falsy', async () => {
    expect(await lastValueFrom(service.getReviews(0))).toEqual([]);
  });

  it('should add review to existing list', () => {
    const review: Review = {
      author: { name: 'test', email: 'test@test.com' },
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
      author: { name: 'test', email: 'test@test.com' },
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

  it('should create reviews list for first added review', () => {
    const review: Review = {
      author: { name: 'test', email: 'test@test.com' },
      content: 'test',
      title: 'test',
      rating: 5,
      movieId: 1249289,
      createdAt: new Date(Date.now()).toISOString(),
      id: '',
    };

    service.addReview(review, 1);
    expect(service.getReviews(1)).toContain(review);
  });
});
