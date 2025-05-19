import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { Review } from '@/movies/types';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  const review: Review = {
    author: { name: 'test', email: 'test@test.com' },
    content: 'test',
    rating: 5,
    title: 'test',
    movieId: 1,
    createdAt: '2020-01-01',
    id: 'review1',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('review', review);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
