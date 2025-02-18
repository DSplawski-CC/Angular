import { Component, input } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  imports: [],
  templateUrl: './star-icon.component.html',
})
export class StarIconComponent {
  size = input(14);
}
