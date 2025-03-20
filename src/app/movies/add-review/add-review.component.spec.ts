import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AddReviewComponent } from './add-review.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { outputEventMatchers } from '@tests/matchers/eventEmiterMatcher';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;
  let submitBtn: HTMLButtonElement;
  let ratingInput: DebugElement;
  let authorInput: DebugElement;
  let titleInput: DebugElement;
  let contentInput: DebugElement;

  beforeEach(async () => {
    jasmine.addMatchers(outputEventMatchers);
    await TestBed.configureTestingModule({
      imports: [AddReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    submitBtn = fixture.nativeElement.querySelector('button[type="submit"]');
    ratingInput = fixture.debugElement.query(By.css('app-form-input[label="rating"]'));
    authorInput = fixture.debugElement.query(By.css('app-form-input[label="name"]'));
    titleInput = fixture.debugElement.query(By.css('app-form-input[label="title"]'));
    contentInput = fixture.debugElement.query(By.css('app-form-input[label="description"]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all required fields invalid when empty (initial state)', () => {
    const controls = component.reviewForm.controls;
    expect(component.reviewForm.valid).toBeFalse();
    expect(controls['rating'].hasError('number')).toBeTrue();
    expect(controls['author'].hasError('required')).toBeTrue();
    expect(controls['title'].hasError('required')).toBeTrue();
    expect(controls['content'].hasError('required')).toBeTrue();
    fixture.detectChanges();

    expect(submitBtn.disabled).toBeTrue();
  });



  it('Form should be valid', () => {
    const controls = component.reviewForm.controls;
    controls.content.setValue('test');
    controls.author.setValue({ name: 'test', email: 'test@test.com' });
    controls.title.setValue('test');
    controls.rating.setValue(5);

    expect(component.reviewForm.invalid).toBeFalse();
    expect(controls['rating'].hasError('number')).toBeFalse();
    expect(controls['author'].hasError('required')).toBeFalse();
    expect(controls['title'].hasError('required')).toBeFalse();
    expect(controls['content'].hasError('required')).toBeFalse();

    fixture.detectChanges();

    expect(submitBtn.disabled).toBeFalse();
  });

  it('should display validation errors when required fields are touched and left empty', () => {
    component.reviewForm.markAllAsTouched();
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(component.reviewForm.controls.rating.touched).toBeTrue();
    expect(component.reviewForm.controls.rating.invalid).toBeTrue();
    expect(ratingInput.componentInstance.showError()).toBeTrue();

    expect(component.reviewForm.controls.author.touched).toBeTrue();
    expect(component.reviewForm.controls.author.invalid).toBeTrue();
    expect(authorInput.componentInstance.showError()).toBeTrue();

    expect(component.reviewForm.controls.title.touched).toBeTrue();
    expect(component.reviewForm.controls.title.invalid).toBeTrue();
    expect(titleInput.componentInstance.showError()).toBeTrue();

    expect(component.reviewForm.controls.content.touched).toBeTrue();
    expect(component.reviewForm.controls.content.invalid).toBeTrue();
    expect(contentInput.componentInstance.showError()).toBeTrue();
  });

  it('should keep rating invalid when value of of valid range', () => {
    component.reviewForm.controls.rating.setValue(11);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(component.reviewForm.controls.rating.invalid).toBeTrue();

    component.reviewForm.controls.rating.setValue(0);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(component.reviewForm.controls.rating.invalid).toBeTrue();
  });

  it('should submit valid form', (done) => {
    const controls = component.reviewForm.controls;
    controls.content.setValue('test');
    controls.author.setValue({ name: 'test', email: 'test@test.com' });
    controls.title.setValue('test');
    controls.rating.setValue(5);

    fixture.detectChanges();

    const subscription = fixture.componentInstance.submitForm.subscribe(review => {
      expect(review.content).toEqual('test');
      controls.author.setValue({ name: 'test', email: 'test@test.com' });
      expect(review.title).toEqual('test');
      expect(review.rating).toEqual(5);
      subscription.unsubscribe();
      done();
    });

    submitBtn.click();
  });

  it('should not submit invalid form', fakeAsync(() => {
    expect(component.reviewForm.invalid).toBeTrue();
    const submitSpy = spyOn(fixture.componentInstance, 'onSubmit').and.callThrough();
    const submitFn = () => {
      fail();
    }
    const submitObjSpy = spyOn({ submitFn }, 'submitFn');
    const subscription = fixture.componentInstance.submitForm.subscribe(submitObjSpy);

    submitBtn.click();

    expect().nothing();
    expect(submitSpy).not.toHaveBeenCalled();
    expect(submitObjSpy).not.toHaveBeenCalled();
  }));
});
