import { inject, Injectable, resource, signal } from '@angular/core';
import { isNumber } from 'lodash-es';
import { HttpClient } from '@angular/common/http';
import { MovieResponse } from 'moviedb-promise';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private httpClient = inject(HttpClient);

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

      const response = await firstValueFrom(this.httpClient.get<MovieResponse>(`/movies/${request.id}`));

      return response
    }
  });
}
