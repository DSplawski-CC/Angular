import { Directive, ElementRef, input, OnDestroy, output, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnDestroy {
  unlisten: () => void;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
  ) {
    this.unlisten = this.renderer.listen('window', 'click', (e: MouseEvent) => {
      if (
        !this.el.nativeElement.contains(e.target as HTMLElement)
        && !this.ignoreElements()?.some(el => el === e.target && e.target === window.document.querySelector(el))
      ) {
        this.clickOutside.emit();
      } else {
        e.stopImmediatePropagation();
      }
    },
      { capture: true });
  }

  ngOnDestroy() {
    this.unlisten();
  }

  ignoreElements = input<any[]>([]);
  clickOutside = output();
}
