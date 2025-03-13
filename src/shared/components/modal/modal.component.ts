import {
  Component, computed,
  contentChild,
  effect, EventEmitter,
  HostListener,
  input,
  model, OutputEmitterRef,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ClickOutsideDirective } from '@shared/directives/click-outside.directive';
import { BlockWheelingDirective } from '@shared/directives/block-wheeling.directive';

type Activator = Element | OutputEmitterRef<unknown> | EventEmitter<unknown>;

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
  activator = input<Activator>();
  deactivator = input<Activator>();

  clickOutsideIgnore = computed(() => {
    const activator = this.activator();
    return activator instanceof Element
      ? [activator]
      : [];
  })

  constructor() {
    effect(() => {
      this.setActivatorHandle(this.activator(), this.openModal.bind(this));
    });

    effect(() => {
      this.setActivatorHandle(this.deactivator(), this.closeModal.bind(this));
    });
  }

  private setActivatorHandle(activator: Activator | undefined, action: Function) {
    if (activator) {
      if (activator instanceof HTMLElement) {
        activator.onclick = () => {
          action();
        }
      } else if (activator instanceof OutputEmitterRef) {
        const subscription = activator.subscribe(() => {
          action();
          subscription.unsubscribe();
        });
      } else if (activator instanceof EventEmitter) {
        const subscription = activator.subscribe(() => {
          action();
          subscription.unsubscribe();
        });
      }
    }
  }

  @HostListener('document:keydown.esc', ['$event'])
  public closeModal() {
    if (this.show()) {
      this.show.set(false);
    }
  }

  public openModal() {
    if (!this.show()) {
      this.show.set(true);
    }
  }
}
