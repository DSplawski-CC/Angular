import {
  Directive,
  ElementRef,
  OnDestroy,
  ViewContainerRef,
  inject,
  effect,
  ComponentRef, input, EffectRef, output,
} from '@angular/core';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { IkUploadComponent } from 'imagekitio-angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Directive({
  selector: '[loader]',
  standalone: true,
})
export class LoadingDirective implements OnDestroy {
  private hostElement = inject(ElementRef).nativeElement as HTMLElement;
  private viewContainerRef = inject(ViewContainerRef);
  private cleanupEffect?: EffectRef;
  private spinnerRef: ComponentRef<SpinnerComponent> | null = null;
  public isLoading = input(false);

  constructor() {
    const position = getComputedStyle(this.hostElement).position;
    if (position === 'static' || !position) {
      this.hostElement.classList.add('relative');
    }

    this.cleanupEffect = effect(() => {
      const isLoading = this.isLoading();
      if (isLoading) {
        if (!this.spinnerRef) {
          this.spinnerRef = this.viewContainerRef.createComponent(SpinnerComponent);
          this.hostElement.appendChild(this.spinnerRef.location.nativeElement);
        }
      } else {
        this.disableLoader();
      }
    });
  }

  disableLoader() {
    if (this.spinnerRef) {
      this.viewContainerRef.clear();
      this.spinnerRef = null;
    }
  }

  ngOnDestroy() {
    this.cleanupEffect?.destroy();
    this.disableLoader();
  }
}

@Directive({
  selector: '[ik-loader]',
  standalone: true,
})
export class IkLoadingDirective {
  private ikUploadComponent: IkUploadComponent = inject(IkUploadComponent);

  loading = output<boolean>()

  constructor() {
    this.ikUploadComponent.onUploadStart = (e) => {
      this.loading.emit(true);
      console.log("upload start");
    };

    this.ikUploadComponent.onSuccess
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.loading.emit(false);
      });

    this.ikUploadComponent.onError
      .pipe(takeUntilDestroyed())
      .subscribe((e) => {
        this.loading.emit(false);
        console.log("upload error", e);
      });
  }
}
