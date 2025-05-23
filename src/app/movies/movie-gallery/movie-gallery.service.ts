import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  async uploadImage(movieId: number, file: File) {
    const headers = new HttpHeaders()
      .append('enctype', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return await firstValueFrom(this.httpClient.post<string>(`/movie-images/${movieId}/upload`,
      formData,
      {
        headers,
    })
    )
  }
}
