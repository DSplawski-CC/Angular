import { BlockWheelingDirective } from './block-wheeling.directive';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
  template: `<div [appBlockWheeling] [ignoreWheeling]="ignore()"></div>`,
  imports: [BlockWheelingDirective],
})
class TestComponent {
  readonly ignore = signal(true);
}

describe('BlockWheelingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let appliedDirective: BlockWheelingDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [BlockWheelingDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    directiveElement = fixture.debugElement.query(By.directive(BlockWheelingDirective));
    appliedDirective = directiveElement.injector.get(BlockWheelingDirective);
  });

  it('should be applied to element', () => {
    expect(appliedDirective).toBeTruthy();
  });

  it('should prevent default action on wheel event when blocking', () => {
    const event = new WheelEvent('wheel', { cancelable: true });
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('should block wheeling',fakeAsync(() => {
    const handler = (e: WheelEvent) => {
      fail('Wheel event was expected to be prevented');
    };
    const obj = { handler };
    const spyHandler = spyOn(obj, 'handler')

    document.addEventListener('wheel', handler);
    document.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
    tick();
    document.removeEventListener('wheel', handler);
    expect(spyHandler).not.toHaveBeenCalled();
  }));

  it('should allow wheeling in host element',fakeAsync(() => {
    const handler = (e: WheelEvent) => {
      expect(e).toBeTruthy();
    };
    const obj = { handler };
    const spyHandler = spyOn(obj, 'handler')

    directiveElement.nativeElement.addEventListener('wheel', obj.handler);
    directiveElement.nativeElement.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
    tick();
    directiveElement.nativeElement.removeEventListener('wheel', obj.handler);
    expect(spyHandler).toHaveBeenCalled();
  }));

  it('should allow wheeling in host element child',fakeAsync(() => {
    const handler = (e: WheelEvent) => {
      expect(e).toBeTruthy();
    };
    const obj = { handler };
    const spyHandler = spyOn(obj, 'handler')

    const childElement = document.createElement('div');
    directiveElement.nativeElement.appendChild(childElement);

    childElement.addEventListener('wheel', obj.handler);
    childElement.dispatchEvent(new WheelEvent('wheel', { bubbles: true }));
    tick();
    childElement.removeEventListener('wheel', obj.handler);
    expect(spyHandler).toHaveBeenCalled();
  }));

  it('should remove wheel listener on destroy', () => {
    const removeSpy = spyOn(document, 'removeEventListener').and.callThrough();
    fixture.destroy();

    expect(removeSpy).toHaveBeenCalledWith('wheel', appliedDirective.wheelBlockHandler);

    const event = new WheelEvent('wheel', { cancelable: true });
    const wasPrevented = event.defaultPrevented;
    document.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(wasPrevented);
  });

  it('should allow wheeling when ignoreWheeling is false', () => {
    fixture.componentInstance.ignore.set(false);
    fixture.detectChanges();

    const handler = (e: WheelEvent) => {};
    const obj = { handler };
    const spyHandler = spyOn(obj, 'handler')

    document.addEventListener('wheel', obj.handler);
    document.dispatchEvent(new WheelEvent('wheel', { cancelable: true }));
    document.removeEventListener('wheel', obj.handler);

    expect(spyHandler).toHaveBeenCalled();
  });
});
