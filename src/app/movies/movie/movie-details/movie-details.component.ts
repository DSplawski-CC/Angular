import { Component, input } from '@angular/core';
import { StarIconComponent } from '@shared/components/star-icon/star-icon.component';
import { DatePipe } from '@angular/common';
import { MovieResponse } from 'moviedb-promise';
import { RatingFormatPipe } from '@shared/pipes/rating-format.pipe';


@Component({
  selector: 'app-movie-details',
  imports: [
    StarIconComponent,
    DatePipe,
    RatingFormatPipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movie = input.required<MovieResponse>();
}
