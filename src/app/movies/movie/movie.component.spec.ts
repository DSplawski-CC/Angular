import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MovieComponent } from './movie.component';
import { MovieDb, MovieResponse } from 'moviedb-promise';
import { MOVIE_DB } from '@/app.config';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { routes } from '@/app.routes';
import { ReviewData } from '@/movies/types';


describe('MovieComponent', () => {
  let component: MovieComponent;
  let route: ActivatedRoute;
  let router: Router;
  let fixture: ComponentFixture<MovieComponent>;
  const movie: MovieResponse = {
    vote_average: 5.82,
    vote_count: 12_503,
    runtime: 95,
    release_date: '2020-01-01',
    title: 'Movie 1',
    id: 1,
    overview: 'Overview 1',
  };

  beforeEach(async () => {
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

    await TestBed.configureTestingModule({
      imports: [MovieComponent, DecimalPipe],
      providers: [
        provideRouter(routes),
        {provide: MOVIE_DB, useValue: movieDb},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty reviews', () => {
    expect(component.reviews().length).toBe(0);
  });

  it('should add review', async () => {
    const reviewsCount = component.reviews().length;
    const review: ReviewData = {
      author: 'test',
      content: 'test',
      title: 'test',
      rating: 5,
    };


    fixture.detectChanges();

    expect(component.movieDetailsService.movieId).toEqual(1);
    component.onAddReview(review);

    expect(component.reviews().length).toBe(reviewsCount + 1);
  });
});
