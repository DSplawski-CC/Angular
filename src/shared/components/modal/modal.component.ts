import {
  Component,
  contentChild,
  effect,
  HostListener,
  input,
  model,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { BlockWheelingDirective } from '@shared/directives/block-wheeling.directive';


@Component({
  selector: 'app-modal',
  imports: [
    NgTemplateOutlet,
    ClickOutsideDirective,
    BlockWheelingDirective,
  ],
  templateUrl: './modal.component.html',
  host: {
    class: 'fixed top-auto bottom-auto right-auto left-auto',
  }
})
export class ModalComponent {
  customActions = contentChild<TemplateRef<any>>('customActions');
  show = model(false);
  activator = input<HTMLElement>();

  constructor() {
    effect(() => {
      const activator = this.activator();
      if (activator) {
        activator.onclick = () => this.show.set(true);
      }
    })
  }

  @HostListener('window:keydown.esc', ['$event'])
  closeModal() {
    if (this.show()) {
      this.show.set(false);
    }
  }
}
