import { Directive, ElementRef, input, OnDestroy } from '@angular/core';


@Directive({
  selector: '[appBlockWheeling]',
  standalone: true,
})
export class BlockWheelingDirective implements OnDestroy {
  readonly wheelBlockHandler = (e: WheelEvent) => {
    if (this.ignoreWheeling() && !this.el.nativeElement.contains(e.target as HTMLElement)) {
      e.preventDefault();
    }
  };

  constructor(private el: ElementRef<HTMLElement>) {
    window.addEventListener('wheel', this.wheelBlockHandler, { passive: false });
  }


  ngOnDestroy() {
    window.removeEventListener('wheel', this.wheelBlockHandler);
  }

  ignoreWheeling = input(true);
}
