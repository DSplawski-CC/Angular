import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarIconComponent } from './star-icon.component';


describe('StarIconComponent', () => {
  let component: StarIconComponent;
  let fixture: ComponentFixture<StarIconComponent>;
  let svg: SVGElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarIconComponent);
    component = fixture.componentInstance;
    svg = fixture.nativeElement.querySelector('svg');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have fill set to currentColor', () => {
    expect(svg.getAttribute('fill')).toBe('currentColor');
  });

  it('should have default size 14px if not provided', () => {
    expect(svg.style.width).toBe('14px');
    expect(svg.style.height).toBe('14px');
  });

  it('should handle invalid sizes gracefully', () => {
    fixture.componentRef.setInput('size', null);
    fixture.detectChanges();
    expect(svg.style.width).toBe('14px');
    expect(svg.style.height).toBe('14px');

    fixture.componentRef.setInput('size', -5);
    fixture.detectChanges();
    expect(svg.style.width).toBe('14px');
    expect(svg.style.height).toBe('14px');
  });

  it('should set height and width', () => {
    fixture.componentRef.setInput('size', 10);
    fixture.detectChanges();

    expect(svg.style.height).toBe('10px');
    expect(svg.style.width).toBe('10px');
  })
});
