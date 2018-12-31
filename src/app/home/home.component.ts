import { Component, OnInit } from '@angular/core';
import { MovieStorageService } from '../movie/movie-storage.service';
import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private movieStorageService: MovieStorageService,
              private movieService: MovieService) { }

  ngOnInit() {
    this.movieStorageService.setSearchedMovieTitle(undefined);
    this.movieService.setMovieDetails(undefined);
  }

}
