import { TestBed } from '@angular/core/testing';

import { MovieGalleryService } from './movie-gallery.service';

describe('MovieGalleryService', () => {
  let service: MovieGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
