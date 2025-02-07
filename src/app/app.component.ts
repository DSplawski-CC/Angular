import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header.component';
import { MoviesListComponent } from '@/movies/movies-list/movies-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MoviesListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Movie DB';
}
