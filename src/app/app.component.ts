import { Component, OnInit } from '@angular/core';
import { Movie } from './movie/model/movie.model';
import { MovieService } from './movie/movie.service';
import { MovieStorageService } from './movie/movie-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieService, MovieStorageService]
})
export class AppComponent {
}
