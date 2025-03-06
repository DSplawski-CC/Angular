import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieDetailsComponent } from '@/movies/movie/movie-details/movie-details.component';
import { ReviewListComponent } from '@/movies/review-list/review-list.component';
import { ReviewsApiService } from '@/movies/reviews-api.service';
import { AddReviewComponent } from '@/movies/add-review/add-review.component';
import { Review, ReviewData } from '@/movies/types';
import { MovieDetailsService } from '@/movies/movie-details.service';
import { DecimalPipe } from '@angular/common';
import { ModalComponent } from "@shared/components/modal/modal.component";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  imports: [
    MovieDetailsComponent,
    ReviewListComponent,
    AddReviewComponent,
    ModalComponent,
  ],
  providers: [DecimalPipe]
})
export class MovieComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public movieDetailsService = inject(MovieDetailsService);
  public reviewsApiService = inject(ReviewsApiService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  reviews = computed(() => this.reviewsApiService.getReviews(this.movieDetailsService.movieId) ?? []);

  constructor() {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        const movieId = Number(param?.get('movieId'));
        console.log('movieId', movieId);

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
      movieId: this.movieDetailsService.movieId,
      createdAt: new Date(Date.now()).toISOString(),
      id: '',
    }

    this.reviewsApiService.addReview(review, this.movieDetailsService.movieId);
  }
}
