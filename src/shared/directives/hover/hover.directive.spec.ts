import { HoverDirective } from './hover.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
  template: `<div [appHover]></div>`,
  imports: [HoverDirective],
})
class TestComponent {}

describe('HoverDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let appliedHoverDirective: HoverDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [HoverDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directiveElement = fixture.debugElement.query(By.directive(HoverDirective));
    appliedHoverDirective = directiveElement.injector.get(HoverDirective);
  });

  it('should be applied to element', () => {
    expect(appliedHoverDirective).toBeTruthy();
  });

  it('#hoverChange should emit true on mouseenter', (done) => {
    const subscription = appliedHoverDirective.hoverChange.subscribe(value => {
      subscription.unsubscribe();
      expect(value).toBeTrue();
      done();
    });

    directiveElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
  });

  it('#hoverChange should emit false on mouseleave', (done) => {
    const subscription = appliedHoverDirective.hoverChange.subscribe(value => {
      subscription.unsubscribe();
      expect(value).toBeFalse();
      done();
    });

    directiveElement.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
  });
});
