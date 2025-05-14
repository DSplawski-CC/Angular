import { Routes } from '@angular/router';
import { authGuard, authGuardSkip } from '@core/auth.guard';


export const routes: Routes = [
  {
    loadComponent: () => import('app/homepage/homepage.component').then(component => component.HomepageComponent),
    title: 'Home page',
    path: '',
  },
  {
    loadComponent: () => import('app/login/login.component').then(component => component.LoginComponent),
    title: 'Sign in',
    path: 'sign-in',
    canActivate: [authGuardSkip],
  },
  {
    loadComponent: () => import('app/register/register.component').then(component => component.RegisterComponent),
    title: 'Register',
    path: 'register',
  },
  {
    loadComponent: () => import('app/movies/movies-list/movies-list.component').then(component => component.MoviesListComponent),
    title: 'Movies',
    path: 'movies',
    canActivate: [authGuard],
  },
  {
    loadComponent: () => import('app/movies/movie/movie.component').then(component => component.MovieComponent),
    title: 'Movie',
    path: 'movie/:movieId',
    canActivate: [authGuard],
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
