import { ClickOutsideDirective } from './click-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { outputEventMatchers } from '@tests/matchers/eventEmiterMatcher';


@Component({
  template: `
    <div data-testid="blocking-div" [appClickOutside] [ignoreElements]="[ignoreDiv, '[data-testid=&quot;ignore-another-div&quot;']">
      <div data-testid="child-blocking-div"></div>
    </div>
    <div #ignoreDiv data-testid="ignore-div"></div>
    <div data-testid="ignore-another-div"></div>
    <div data-testid="not-ignore-div"></div>
  `,
  imports: [ClickOutsideDirective],
})
class TestComponent {
  readonly ignore = signal(true);
}

describe('ClickOutsideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let appliedDirective: ClickOutsideDirective;
  let notIgnoreDiv: DebugElement;
  let ignoreDiv: DebugElement;
  let childBlockingDiv: DebugElement;
  let blockingDiv: DebugElement;
  let ignoreAnotherDiv: DebugElement;

  beforeEach(() => {
    jasmine.addMatchers(outputEventMatchers);
    fixture = TestBed.configureTestingModule({
      imports: [ClickOutsideDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directiveElement = fixture.debugElement.query(By.directive(ClickOutsideDirective));
    appliedDirective = directiveElement.injector.get(ClickOutsideDirective);
    notIgnoreDiv = fixture.debugElement.query(By.css('[data-testid="not-ignore-div"]'));
    ignoreDiv = fixture.debugElement.query(By.css('[data-testid="ignore-div"]'));
    blockingDiv = fixture.debugElement.query(By.css('[data-testid="blocking-div"]'));
    childBlockingDiv = fixture.debugElement.query(By.css('[data-testid="child-blocking-div"]'));
    ignoreAnotherDiv = fixture.debugElement.query(By.css('[data-testid="ignore-another-div"]'));

    spyOn(appliedDirective.clickOutside, 'emit');
  });

  it('should be applied to element', () => {

    expect(appliedDirective).toBeTruthy();
  });

  it('#notIgnoreDiv should trigger #clickOutside', () => {
    notIgnoreDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutside).toHaveEmitted();
  });

  it('#blockingDiv should not trigger #clickOutside', () => {
    blockingDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutside).not.toHaveEmitted();
  });

  it('#childBlockingDiv should not trigger #clickOutside', () => {
    childBlockingDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutside).not.toHaveEmitted();
  });

  it('#ignoreDiv should not trigger #clickOutside', () => {
    ignoreDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutside).not.toHaveEmitted();
  });

  it('#ignoreAnotherDiv should not trigger #clickOutside', () => {
    ignoreAnotherDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutside).not.toHaveEmitted();
  });

  it('#ignoreAnotherDiv should not trigger #clickOutside', () => {
    ignoreAnotherDiv.nativeElement.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));

    expect(appliedDirective.clickOutsideEnabled).not.toHaveEmitted();
  });
});
