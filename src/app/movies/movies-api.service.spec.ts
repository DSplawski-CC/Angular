import { fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { MoviesApiService } from './movies-api.service';
import { MovieDb, MovieResult, PopularMoviesRequest, PopularMoviesResponse } from 'moviedb-promise';


describe('MoviesApiService', () => {
  let service: MoviesApiService;
  const firstMovie = {
    vote_average: 5.82,
    title: 'Movie 1',
    id: 1,
    overview: 'Overview 1',
  } as unknown as MovieResult;
  const secondMovie = {
    vote_average: 7.521,
    title: 'Movie 2',
    id: 2,
    overview: 'Overview 2',
  } as unknown as MovieResult;

  beforeEach(waitForAsync(() => {
    const movieDb = {
      async moviePopular(params?: PopularMoviesRequest): Promise<PopularMoviesResponse> {
          const page = params?.page ?? 1;
          const totalPages = 2;

          if (page > totalPages) {
            return Promise.reject(new Error('Page out of bound'));
          }

          const response: PopularMoviesResponse = {
            page: page,
            total_pages: totalPages,
            total_results: 2,
            results: page === 1
              ? [firstMovie]
              : page === 2
                ? [secondMovie]
                : []
            ,
          }

          return Promise.resolve(response);
      }
    } satisfies Partial<MovieDb>;

    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesApiService);
    TestBed.flushEffects();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#page should return first page', () => {
    expect(service.page).toBe(1);
  });

  it('#nextPage should be available', () => {
    expect(service.hasNextPage()).toBe(true);
    service.nextPage();
    expect(service.page).toBe(2);
  });

  it('#previousPage should be available', () => {
    service.nextPage();
    expect(service.hasPreviousPage()).toBe(true);
    expect(service.page).toBe(2);
    service.previousPage();
    expect(service.page).toBe(1);
  });

  it('#previousPage should be not available', fakeAsync(() => {
    tick();
    expect(service.hasPreviousPage()).toBe(false);
    service.previousPage();
    expect(service.page).toBe(1);
  }));

  it('#nextPage should be not available', fakeAsync(() => {
    tick();
    service.page = service.totalPages();
    expect(service.hasNextPage()).toBe(false);
    service.nextPage();
    expect(service.page).toBe(2);
  }));

  it('#totalPages should contain 2 total pages', fakeAsync(() => {
    tick();
    expect(service.totalPages()).toBe(2);
  }));

  it('#moviesPopular should return first Movie', fakeAsync(() => {
    tick();
    expect(service.moviesPopular()).toEqual([firstMovie]);
  }));

  it('#moviesPopular should return second Movie', fakeAsync(() => {
    service.nextPage();
    tick();
    expect(service.moviesPopular()).toEqual([secondMovie]);
  }));

  it('should set an error message when API call fails', fakeAsync(() => {
    service.page = 3;
    tick();

    expect(service.moviesPopularError().message).toBe('Page out of bound');
  }));
});
