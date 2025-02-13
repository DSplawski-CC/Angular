import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieDetailsComponent } from '@/movies/movie/movie-details/movie-details.component';
import { ReviewListComponent } from '@/movies/review-list/review-list.component';
import { ReviewsApiService } from '@/movies/reviews-api.service';
import { AddReviewComponent } from '@/movies/add-review/add-review.component';
import { Review, ReviewData } from '@/movies/types';
import { MovieDetailsService } from '@/movies/movie-details.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  imports: [
    MovieDetailsComponent,
    ReviewListComponent,
    AddReviewComponent,
  ],
})
export class MovieComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  reviews = computed(() => this.reviewsApiService.getReviews(this.movieDetailsService.movieId) ?? []);

  constructor(
    public movieDetailsService: MovieDetailsService,
    public reviewsApiService: ReviewsApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        const movieId = Number(param?.get('movieId'));

        if (!movieId) {
          this.router.navigateByUrl('/page-not-found').then();
          return;
        } else {
          this.movieDetailsService.movieId = movieId;
        }
      });
  }

  onAddReview(reviewData: ReviewData) {
    const review: Review = {
      ...reviewData,
      movieId: Number(this.movieDetailsService.movieId),
      createdAt: new Date(Date.now()).toISOString(),
      id: '',
    }

    this.reviewsApiService.addReview(review, this.movieDetailsService.movieId);
  }
}
