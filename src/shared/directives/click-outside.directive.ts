import { Directive, effect, ElementRef, input, OnDestroy, output, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnDestroy {
  unlisten: () => void = () => {};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
  ) {
    effect(() => {
      if (this.clickOutsideEnabled()) {
        this.unlisten = this.renderer.listen('document', 'click', (e: MouseEvent) => {
          if (
            !this.el.nativeElement.contains(e.target as Element)
            && !this.ignoreElements()?.some(el => el === e.target || (typeof el === 'string' && e.target === document.querySelector(el)))
          ) {
            this.clickOutside.emit();
          } else {
            e.stopImmediatePropagation();
          }
        },
        { capture: true });
      } else {
        this.unlisten();
      }
    });

  }

  ngOnDestroy() {
    this.unlisten();
  }

  ignoreElements = input<(Element | string | undefined)[]>([]);
  clickOutsideEnabled = input<boolean>(true);
  clickOutside = output();
}
