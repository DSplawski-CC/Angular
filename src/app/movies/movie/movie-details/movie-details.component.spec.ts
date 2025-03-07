import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { DecimalPipe } from '@angular/common';
import { MovieResponse } from 'moviedb-promise';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  const movie: MovieResponse = {
    vote_average: 5.82,
    vote_count: 12_503,
    runtime: 95,
    release_date: '2020-01-01',
    title: 'Movie 1',
    id: 1,
    overview: 'Overview 1',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent, DecimalPipe],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movie);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
