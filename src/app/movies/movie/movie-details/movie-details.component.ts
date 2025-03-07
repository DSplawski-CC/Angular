import { Component, input } from '@angular/core';
import { StarIconComponent } from '@shared/components/star-icon/star-icon.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MovieResponse } from 'moviedb-promise';
import { RatingFormatPipe } from '@shared/pipes/rating-format.pipe';


@Component({
  selector: 'app-movie-details',
  imports: [
    StarIconComponent,
    DatePipe,
    RatingFormatPipe,
  ],
  providers: [DecimalPipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  movie = input.required<MovieResponse>();
}
