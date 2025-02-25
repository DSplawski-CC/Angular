import { Directive, ElementRef, input, OnDestroy } from '@angular/core';


@Directive({
  selector: '[appBlockWheeling]',
  standalone: true,
})
export class BlockWheelingDirective implements OnDestroy {
  public readonly wheelBlockHandler = (e: WheelEvent) => {
    if (this.ignoreWheeling() && !this.el.nativeElement.contains(e.target as HTMLElement)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  constructor(private el: ElementRef<HTMLElement>) {
    document.addEventListener('wheel', this.wheelBlockHandler, { passive: false });
  }

  ngOnDestroy() {
    document.removeEventListener('wheel', this.wheelBlockHandler);
  }

  ignoreWheeling = input(true);
}
