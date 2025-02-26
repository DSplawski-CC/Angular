import { RatingFormatPipe } from './rating-format.pipe';
import { DecimalPipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';


describe('RatingFormatPipe', () => {
  let pipe: RatingFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe, RatingFormatPipe],
    });

    pipe = TestBed.inject(RatingFormatPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform longer fraction to shorter', () => {
    const transformedValue = pipe.transform(5.217);
    expect(transformedValue).toBe('5.2');
  });

  it('should transform shorter fraction to longer', () => {
    const transformedValue = pipe.transform(5);
    expect(transformedValue).toBe('5.0');
  });

  it('should correctly round value during transforming', () => {
    const transformedValue = pipe.transform(5.26);
    expect(transformedValue).toBe('5.3');
  });

  it('should return null for NaN', () => {
    const transformedValue = pipe.transform(NaN);
    expect(transformedValue).toBeNull();
  });

  it('should return null for null', () => {
    const transformedValue = pipe.transform(null);
    expect(transformedValue).toBeNull();
  });

  it('should return null for undefined', () => {
    const transformedValue = pipe.transform(undefined);
    expect(transformedValue).toBeNull();
  });

  it('should throw error for not parsable string', () => {
    expect(() => pipe.transform('not number')).toThrowError();
  });
});
