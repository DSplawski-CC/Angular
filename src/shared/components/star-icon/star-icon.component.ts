import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-icon',
  imports: [],
  templateUrl: './star-icon.component.html',
})
export class StarIconComponent {
  @Input() size = 14;
}
