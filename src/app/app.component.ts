import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Movie DB';
}
