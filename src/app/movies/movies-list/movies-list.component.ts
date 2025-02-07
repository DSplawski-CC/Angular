import { Component } from '@angular/core';
import { MoviesApiService } from '@/movies/movies-api.service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent {
  constructor(public moviesApiService: MoviesApiService) {}

  previousPage(): void {
    this.moviesApiService.previousPage();
  }

  nextPage(): void {
    this.moviesApiService.nextPage();
  }
}
