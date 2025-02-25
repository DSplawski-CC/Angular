import { inject, Injectable, resource, signal } from '@angular/core';
import { ApiService } from '@core/api.service';
import { MovieDb } from 'moviedb-promise';
import { MOVIE_DB } from '@/app.config';


@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {
  private tmdbApi = inject(MOVIE_DB);

  constructor() {}

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
