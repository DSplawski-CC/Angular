import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieDb, MovieResponse, MovieResult, PopularMoviesRequest, PopularMoviesResponse } from 'moviedb-promise';
import { MOVIE_DB } from '@/app.config';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
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

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [MoviesListComponent],
      providers: [
        {provide: MOVIE_DB, useValue: movieDb},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
