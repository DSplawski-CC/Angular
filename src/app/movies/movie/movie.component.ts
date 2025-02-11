import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MoviesApiService } from '@/movies/movies-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor(
    public moviesApiService: MoviesApiService,
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
          this.moviesApiService.movieId = param.get('movieId');
        }
      });
  }
}
