import { Inject, Injectable, resource, signal } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { MovieDb } from 'moviedb-promise';

@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private tmdbApi: MovieDb;

  constructor(private apiService: ApiService) {
    this.tmdbApi = new MovieDb(this.apiService.getApiKey());
  }

  private currentPage = signal(1);

  moviesPopular = resource({
    request: () => ({page: this.currentPage()}),
    loader: async ({request}) => (await this.tmdbApi.moviePopular(
      {
        page: request.page,
      }
    )).results,
  });

  get page() {
    return this.currentPage.asReadonly()();
  }

  set page(page: number) {
    this.currentPage.set(page);
  }

  previousPage(): void {
    this.currentPage.update(page => --page);
  }

  nextPage(): void {
    this.currentPage.update(page => ++page);
  }
}
