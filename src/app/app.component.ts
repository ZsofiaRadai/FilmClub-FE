import { Component, OnInit } from '@angular/core';
import { MovieStorageService } from './movie/movie-storage.service';
import { MovieService } from './movie/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieStorageService, MovieService]
})
export class AppComponent {
}
