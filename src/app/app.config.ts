import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiInterceptor } from '@core/api.interceptor';
import { environment } from '../environments/environment';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ImagekitioAngularModule.forRoot({
      publicKey: '',
      urlEndpoint: environment.imageKit.urlEndpoint,
    }).providers ?? [],
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover'
      } as GalleryConfig,
    },
    provideHttpClient(withInterceptors([apiInterceptor])),
  ]
};
