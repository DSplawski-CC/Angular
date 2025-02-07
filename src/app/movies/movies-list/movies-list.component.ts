import { Component } from '@angular/core';
import { MovieResult } from 'moviedb-promise';
import { MoviesApiService } from '@/movies/movies-api.service';
import { HoverDirective } from '../../../shared/hover.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [HoverDirective, NgClass],
  templateUrl: './movies-list.component.html',
})
export class MoviesListComponent {
  hoveredMovie?: MovieResult;

  constructor(public moviesApiService: MoviesApiService) {}

  previousPage(): void {
    this.moviesApiService.previousPage();
  }

  nextPage(): void {
    this.moviesApiService.nextPage();
  }
}
