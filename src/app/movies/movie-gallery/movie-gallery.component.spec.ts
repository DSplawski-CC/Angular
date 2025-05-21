import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGalleryComponent } from './movie-gallery.component';

describe('MovieGalleryComponent', () => {
  let component: MovieGalleryComponent;
  let fixture: ComponentFixture<MovieGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
