import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MovieDetailsService } from './movie-details.service';
import { MovieDb, MovieResponse } from 'moviedb-promise';


describe('MovieDetailsService', () => {
  let service: MovieDetailsService;
  const movie: MovieResponse = {
    vote_average: 5.82,
    vote_count: 12_503,
    runtime: 95,
    release_date: '2020-01-01',
    title: 'Movie 1',
    id: 1,
    overview: 'Overview 1',
  };

  beforeEach(() => {
    const movieDb = {
      async movieInfo(params, config): Promise<MovieResponse> {
        if (params === '1' ||
          (params === 1) ||
          (typeof params === 'object' && params.id === 1)
        ) {
          return Promise.resolve(movie);
        } else {
          return Promise.reject();
        }
      }
    } satisfies Partial<MovieDb>;

    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default values', () => {
    expect(service.movieId).toBeNaN();
    expect(service.movie.value()).toBe(undefined);
  });

  it('should set new value', () => {
    service.movieId = 1;

    expect(service.movieId).toBe(1);
  });

  it('should return undefined', fakeAsync(() => {
    service.movieId = 0;
    TestBed.flushEffects();
    tick();
    expect(service.movie.value()).toBe(undefined);
  }));

  it('should return movie', fakeAsync(() => {
    service.movieId = 1;
    TestBed.flushEffects();
    tick();
    expect(service.movie.value()).toBe(movie);
  }));
});
