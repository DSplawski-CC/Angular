import { Component } from '@angular/core';
import { MoviesApiService } from '@/movies/movies-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  constructor(public moviesApiService: MoviesApiService, public router: Router) {
  }
}
