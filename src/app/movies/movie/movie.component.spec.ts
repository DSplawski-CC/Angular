import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieComponent } from './movie.component';
import { MovieDb, MovieResponse } from 'moviedb-promise';
import { MOVIE_DB } from '@/app.config';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Params, provideRouter, Router } from '@angular/router';
import { routes } from '@/app.routes';
import { ReviewData } from '@/movies/types';
import { Subject } from 'rxjs';


describe('MovieComponent', () => {
  let component: MovieComponent;
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

  const params$ = new Subject<Params>();

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
        { provide: ActivatedRoute, useValue: {
            params: params$,
          }
        },
        {provide: MOVIE_DB, useValue: movieDb},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial empty reviews', () => {
    expect(component.reviews.value().length).toBe(0);
  });

  it('should add review', () => {
    params$.next({ 'movieId': '1' });
    const reviewsCount = component.reviews.value().length;
    const review: ReviewData = {
      author: 'test',
      content: 'test',
      title: 'test',
      rating: 5,
    };

    component.onAddReview(review);

    expect(component.reviews.value().length).toBe(reviewsCount + 1);
  });

  it('should navigate to page-not-found', () => {
    const spy = spyOn(router, 'navigateByUrl').and.callThrough();
    params$.next({});

    expect(spy).toHaveBeenCalledWith('/page-not-found');
  });
});
