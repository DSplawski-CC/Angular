import { Component, DestroyRef, inject, OnInit, resource } from '@angular/core';
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
import { firstValueFrom, take } from 'rxjs';
import { MovieGalleryComponent } from '@/movies/movie-gallery/movie-gallery.component';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  imports: [
    MovieDetailsComponent,
    ReviewListComponent,
    AddReviewComponent,
    ModalComponent,
    MovieGalleryComponent,
  ],
  providers: [DecimalPipe]
})
export class MovieComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  public movieDetailsService = inject(MovieDetailsService);
  public reviewsApiService = inject(ReviewsApiService);
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  reviews = resource({
    request: () => ({ movieId: this.movieDetailsService.movieId}),
    defaultValue: [],
    loader: (params) => firstValueFrom(this.reviewsApiService.getReviews(params.request.movieId))
  });

  constructor() {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        const movieId = Number(param?.['movieId']);

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

    this.reviewsApiService.addReview(review, this.movieDetailsService.movieId)
      .pipe(take(1))
      .subscribe({
        next: () => { this.reviews.reload() },
      });
  }
}
