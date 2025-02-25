import { ClickOutsideDirective } from './click-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div [appClickOutside]></div>`,
  imports: [ClickOutsideDirective],
})
class TestComponent {
  readonly ignore = signal(true);
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let appliedDirective: ClickOutsideDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ClickOutsideDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directiveElement = fixture.debugElement.query(By.directive(ClickOutsideDirective));
    appliedDirective = directiveElement.injector.get(ClickOutsideDirective);
  });

  it('should be applied to element', () => {
    expect(appliedDirective).toBeTruthy();
  });
});
