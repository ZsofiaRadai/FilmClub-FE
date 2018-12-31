import { Component } from '@angular/core';
import { MovieStorageService } from './movie/movie-storage.service';
import { MovieService } from './movie/movie.service';
import { PagerService } from './util/pager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieStorageService, MovieService, PagerService]
})
export class AppComponent {
}
