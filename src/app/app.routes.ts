import { Routes } from '@angular/router';


export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/movies',
  //   pathMatch: 'full',
  // },
  {
    loadComponent: () => import('app/movies/movies-list/movies-list.component').then(component => component.MoviesListComponent),
    title: 'Movies',
    path: 'movies',
  },
  {
    loadComponent: () => import('app/movies/movie/movie.component').then(component => component.MovieComponent),
    title: 'Movie',
    path: 'movie/:id',
  },
];
