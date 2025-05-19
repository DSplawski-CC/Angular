import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, Router, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from '@/app.routes';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MovieDb, MovieResult, PopularMoviesRequest, PopularMoviesResponse } from 'moviedb-promise';
import { MoviesListComponent } from '@/movies/movies-list/movies-list.component';
import { MovieComponent } from '@/movies/movie/movie.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let moviesLinkDebug: DebugElement;
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
        const response: PopularMoviesResponse = {
          page: params?.page,
          total_pages: 2,
          total_results: 2,
          results: [firstMovie, secondMovie],
        }

        return Promise.resolve(response);
      }
    } satisfies Partial<MovieDb>;


    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(routes),
        Router, RouterLink, RouterOutlet,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    moviesLinkDebug = fixture.debugElement.query(By.css(`[data-testid="movies-link"]`));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Angular' title`, () => {
    expect(component.title).toEqual('Movie DB');
  });

  it('should navigate to movies', fakeAsync(() => {
    moviesLinkDebug.nativeElement.click();
    fixture.detectChanges();
    tick();

    const movieListComponent = fixture.debugElement.query(By.directive(MoviesListComponent));

    expect(movieListComponent).toBeTruthy();
  }));

  it('should navigate to movie', fakeAsync(async () => {
    moviesLinkDebug.nativeElement.click();
    tick();
    fixture.detectChanges();

    const movieListComponent = fixture.debugElement.query(By.directive(MoviesListComponent));
    const movieLink =  movieListComponent.query(By.css(`a[id="movie-link-1"`));
    movieLink.nativeElement.click();
    tick();
    fixture.detectChanges();

    const movieComponent = fixture.debugElement.query(By.directive(MovieComponent));

    expect(movieComponent).toBeTruthy();
  }));
});
