import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { MovieDb } from 'moviedb-promise';


export const API_KEY = new InjectionToken<string>('apiKey');
export const MOVIE_DB = new InjectionToken<MovieDb>('movieDb');


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: API_KEY, useValue: environment?.tmdbApiKey },
    { provide: MOVIE_DB, useValue: new MovieDb(environment?.tmdbApiKey) },
  ]
};
