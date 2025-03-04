import { Component, inject } from '@angular/core';
import { MoviesApiService } from '@/movies/movies-api.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingFormatPipe } from "@shared/pipes/rating-format.pipe";


@Component({
  selector: 'app-movies-list',
  imports: [DatePipe, RouterLink, RatingFormatPipe],
  providers: [DecimalPipe],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent {
  moviesApiService = inject(MoviesApiService);
}
