import { Component, inject, input, signal } from '@angular/core';
import { MovieGalleryService } from '@/movies/movie-gallery/movie-gallery.service';
import { GalleryComponent, ImageItem } from 'ng-gallery';
import { registerResource } from '@shared/services/register-resource';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { IkLoadingDirective, LoadingDirective } from '@shared/directives/loading.directive';
import { AuthService } from '@shared/services/auth.service';
import { HTMLInputEvent } from 'imagekitio-angular/lib/utility/ik-type-def-collection';


@Component({
  selector: 'app-movie-gallery',
  imports: [
    GalleryComponent,
    ImagekitioAngularModule,
    LoadingDirective,
    IkLoadingDirective,
  ],
  templateUrl: './movie-gallery.component.html',
})
export class MovieGalleryComponent {
  readonly movieId = input<number>();
  readonly isUploading = signal(false);
  readonly authService = inject(AuthService);
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
    const getToken = this.authService.getToken.bind(this.authService);
    return {
      signature: 'dcb8e72e2b6e98186ec56c62c9e62886f40eaa96',
      token: getToken(),
      expire: parseInt(String(Date.now() / 1000)) + 2400,
    }
  }

  async onImageUpload(e: HTMLInputEvent) {
    const file = this.getFileFromHTMLInputEvent(e);

    if (!file) {
      return;
    }

    await this.movieGalleryService.uploadImage(this.movieId()!, file)
      .then((imageUrl: string) => {
        this.movieGallery.value().push(new ImageItem({ src: imageUrl }))
      });
  }

  getFileFromHTMLInputEvent(e: HTMLInputEvent) {
    if (e.target.files?.length) {
      return e.target.files.item(0);
    }

    return null;
  }
}
