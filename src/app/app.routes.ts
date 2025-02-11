import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    loadComponent: () => import('app/movies/movies-list/movies-list.component').then(component => component.MoviesListComponent),
    title: 'Movies',
    path: 'movies',
  },
  {
    loadComponent: () => import('app/movies/movie/movie.component').then(component => component.MovieComponent),
    title: 'Movie',
    path: 'movie/:movieId',
  },
  {
    loadComponent: () => import('@shared/components/page-not-found/page-not-found.component').then(component => component.PageNotFoundComponent),
    title: 'Page not found',
    path: 'page-not-found',
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  }
];
