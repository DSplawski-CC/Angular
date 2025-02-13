import { Injectable, resource, signal } from '@angular/core';
import { ApiService } from '@core/api.service';
import { MovieDb } from 'moviedb-promise';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private tmdbApi: MovieDb;

  constructor(private apiService: ApiService) {
    this.tmdbApi = new MovieDb(this.apiService.getApiKey());
  }

  private _movieId = signal<number>(NaN);

  get movieId() {
    return this._movieId();
  }
  set movieId(value: number) {
    this._movieId.set(value);
  }

  movie = resource({
    request: () => ({id: this._movieId()}),
    loader: async ({request}) => {
      if (!request.id) {
        return undefined;
      }

      return (await this.tmdbApi.movieInfo(
        {
          id: request.id,
        }
      ))
    }
  });
}
