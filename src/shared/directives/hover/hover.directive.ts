import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

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

  @Output()
  hoverChange = new EventEmitter<boolean>();
}
