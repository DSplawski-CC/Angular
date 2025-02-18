import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostListener('mouseenter')
  onMouseEnter() {
    this.hoverChange.emit(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hoverChange.emit(false);
  }

  hoverChange = output<boolean>();
}
