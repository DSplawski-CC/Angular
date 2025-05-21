import { Component, inject, input } from '@angular/core';
import { MovieGalleryService } from '@/movies/movie-gallery/movie-gallery.service';
import { GalleryComponent, ImageItem } from 'ng-gallery';
import { registerResource } from '@shared/services/register-resource';
import { ImagekitioAngularModule } from 'imagekitio-angular';


@Component({
  selector: 'app-movie-gallery',
  imports: [
    GalleryComponent,
    ImagekitioAngularModule,
  ],
  templateUrl: './movie-gallery.component.html',
})
export class MovieGalleryComponent {
  readonly movieId = input<number>();
  private readonly movieGalleryService = inject(MovieGalleryService);
  readonly movieGallery = registerResource({
    request: () => this.movieId(),
    loader: async ({ request: param }) => {
      if (!param) {
        return (Array<ImageItem>());
      }

      return (await this.movieGalleryService.getMovieImages(param))
        .map(imageUrl => new ImageItem({ src: imageUrl }));
    },
    defaultValue: Array<ImageItem>(),
  });

  async authenticator() {
    return {
      signature: '',
      token: '',
      expire: ''
    }
  }
}
