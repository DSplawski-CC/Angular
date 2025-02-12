import { Component, Input } from '@angular/core';
import { StarIconComponent } from '@shared/components/star-icon/star-icon.component';
import { DatePipe } from '@angular/common';
import { MovieResponse } from 'moviedb-promise';


@Component({
  selector: 'app-movie-details',
  imports: [
    StarIconComponent,
    DatePipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  @Input() movie!: MovieResponse;
}
