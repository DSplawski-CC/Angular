import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ApplicationModule, Component, DebugElement, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';


@Component({
  template: `
    <div>
      <button #activator data-testid="activator-btn"></button>
      <app-modal [activator]="activator">

      </app-modal>
      <div data-testid="outside-container"></div>
    </div>
  `,
  imports: [ModalComponent],
})
class TestComponent {
  modal = viewChild.required(ModalComponent);
}

describe('ModalComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let modalElement: DebugElement;
  let activatorElement: HTMLElement;
  let outsideContainer: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, TestComponent, ClickOutsideDirective],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    modalElement = fixture.debugElement.query(By.directive(ModalComponent));
    activatorElement = fixture.debugElement.query(By.css('[data-testid="activator-btn"]')).nativeElement;
    outsideContainer = fixture.debugElement.query(By.css('[data-testid="outside-container"]')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#activator should activate modal', () => {
    activatorElement.click();
    expect(component.modal().show()).toBeTrue();
  });

  it('click outside should close modal', () => {
    fixture.detectChanges();
    const spy = spyOn(component.modal(), 'closeModal').and.callThrough();

    activatorElement.click();
    fixture.detectChanges();
    expect(component.modal().show()).toBeTrue();
    outsideContainer.click();

    expect(spy).toHaveBeenCalled();
    expect(component.modal().show()).toBeFalse();
  });

  it('click inside should not close modal', () => {
    fixture.detectChanges();
    const spy = spyOn(component.modal(), 'closeModal').and.callThrough();

    activatorElement.click();
    fixture.detectChanges();
    expect(component.modal().show()).toBeTrue();
    modalElement.nativeElement.firstElementChild.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
    expect(component.modal().show()).toBeTrue();
  });
});
