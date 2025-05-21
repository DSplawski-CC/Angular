import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MovieGalleryService {
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  async getMovieImages(movieId: number) {
    if (!movieId) {
      throw new Error('MovieId is invalid.');
    }

    return await firstValueFrom(this.httpClient.get<string[]>(`/movies/${movieId}/images`));
  }
}
