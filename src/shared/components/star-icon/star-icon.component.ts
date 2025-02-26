import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  imports: [],
  templateUrl: './star-icon.component.html',
})
export class StarIconComponent {
  private readonly defaultSize = 14;
  size = input(this.defaultSize);

  validSize = computed(() => {
    const size = this.size();
    return size > 0 ? size : this.defaultSize;
  });
}
