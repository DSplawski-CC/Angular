import { inject, Injectable, resource, signal } from '@angular/core';
import { MOVIE_DB } from '@/app.config';
import { isNumber } from 'lodash-es';


@Injectable({
  providedIn: 'root',
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
      if (!isNumber(request.id) || isNaN(request.id) || request.id < 1) {
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
