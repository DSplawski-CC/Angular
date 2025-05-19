import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from '@core/api.interceptor';
import { environment } from '../environments/environment';
import { ImagekitioAngularModule } from 'imagekitio-angular';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ImagekitioAngularModule.forRoot({
      publicKey: '',
      urlEndpoint: environment.imageKit.urlEndpoint,
    }).providers ?? [],
    provideHttpClient(withInterceptors([apiInterceptor])),
  ]
};
