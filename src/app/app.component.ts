import {Component, resource } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { MovieDb } from 'moviedb-promise';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  providers: [ApiService],
})
export class AppComponent {
  title = 'Movie DB';
  tmdbApi: MovieDb;

  constructor(private apiService: ApiService) {
    this.tmdbApi = new MovieDb(this.apiService.getApiKey());
  }

  movies = resource({
    loader: async () => (await this.tmdbApi.moviePopular()).results,
  })
  protected readonly Date = Date;
}
