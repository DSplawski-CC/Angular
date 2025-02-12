import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '@/movies/movies-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieDetailsComponent } from '@/movies/movie/movie-details/movie-details.component';
import { ReviewListComponent } from '@/movies/review-list/review-list.component';
import { ReviewsApiService } from '@/movies/reviews-api.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  imports: [
    MovieDetailsComponent,
    ReviewListComponent,
  ],
})
export class MovieComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(
    public moviesApiService: MoviesApiService,
    public reviewsApiService: ReviewsApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        if (!param) {
          this.router.navigateByUrl('/page-not-found').then();
        } else {
          const movieId = param.get('movieId')!;
          this.moviesApiService.movieId = movieId;
          this.reviewsApiService.movieId = movieId;
        }
      });
  }
}
