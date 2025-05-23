import { computed, inject, Injectable, resource, ResourceRef, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PopularMoviesResponse } from 'moviedb-promise';
import { registerResource } from '@shared/services/register-resource';


@Injectable({
  providedIn: 'root',
})
export class MoviesApiService {
  private httpClient = inject(HttpClient);

  constructor() {}

  private currentPage = signal(1);

  private moviesPopularResponse = registerResource({
    request: () => ({page: this.currentPage()}),
    loader: async ({request}) => {
      try {
        return await firstValueFrom(this.httpClient.get<PopularMoviesResponse>(`/movies/popular?page=${request.page}`))
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
      }
    },
  });

  totalPages = computed(() => this.moviesPopularResponse.value()?.total_pages ?? NaN);
  hasPreviousPage = computed(() => this.currentPage() > 1);
  hasNextPage = computed(() => this.totalPages() > this.currentPage());
  moviesPopular = computed(() => this.moviesPopularResponse.value()?.results ?? []);
  moviesPopularError = computed(() => (this.moviesPopularResponse.error() as Error));

  get page() {
    return this.currentPage();
  }

  set page(page: number) {
    this.currentPage.set(page);
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage.update(page => --page);
    }
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage.update(page => ++page);
    }
  }
}
