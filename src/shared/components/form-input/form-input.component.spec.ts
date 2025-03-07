import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormInputComponent } from './form-input.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;
  let inputElementDebug: DebugElement;
  let inputElement: HTMLInputElement;
  let labelElementDebug: () => DebugElement;
  let errorContainerDebugGetter: () => DebugElement;
  let errorContainerGetter: () => HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
    inputElementDebug = fixture.debugElement.query(By.css('input'));
    inputElement = inputElementDebug.nativeElement;

    labelElementDebug = () => fixture.debugElement.query(By.css('label'));

    errorContainerDebugGetter = () => fixture.debugElement.query(By.css('[data-testid="input-error"]'));
    errorContainerGetter = () => errorContainerDebugGetter()?.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized with default value', () => {
    expect(component.type()).toEqual('text');
    expect(component.label()).toEqual('');
    expect(component.value()).toEqual('');
    expect(component.showError()).toBeTrue();
    expect(inputElement.type).toEqual('text');
    expect(inputElement.value).toEqual('');
    expect(labelElementDebug()?.nativeElement).toBeFalsy();
    expect(errorContainerGetter).toBeTruthy();
  });

  it('should be initialized with custom values', () => {
    const labelText = 'number test';
    fixture.componentRef.setInput('label', labelText);
    fixture.componentRef.setInput('type', 'number');
    fixture.componentRef.setInput('showError', false);
    fixture.componentRef.setInput('value', '5');
    fixture.detectChanges();

    expect(component.label()).toEqual(labelText);
    expect(component.type()).toEqual('number');
    expect(component.showError()).toBeFalse();
    expect(labelElementDebug().nativeElement.textContent).toContain(labelText);
    expect(inputElement.value).toEqual('5');
    expect(inputElement.type).toEqual('number');
    expect(errorContainerGetter()).toBeFalsy();
  });

  it('should update component value', () => {
    const onChangeSpy = spyOn(component, 'onChange').and.callThrough();
    inputElement.value = '5';
    inputElementDebug.triggerEventHandler('input', { target: inputElement });
    fixture.detectChanges();

    expect(component.value()).toEqual('5');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('should trigger input touched', () => {
    const onTouchedSpy = spyOn(component, 'onTouched').and.callThrough();
    inputElementDebug.triggerEventHandler('blur', { target: inputElement });

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should register onChange function', () => {
    const mockFn = jasmine.createSpy('mockOnChange');
    component.registerOnChange(mockFn);

    expect(component.onChange).toBe(mockFn);
  });

  it('should register onTouched function', () => {
    const mockFn = jasmine.createSpy('mockOnTouched');
    component.registerOnTouched(mockFn);
    expect(component.onTouched).toBe(mockFn);
  });
});
