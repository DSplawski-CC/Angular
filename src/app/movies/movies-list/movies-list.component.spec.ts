import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieDb, MovieResponse } from 'moviedb-promise';
import { MOVIE_DB } from '@/app.config';


describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
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
