import { Component } from "@angular/core";
import { Movie } from "../movie/movie.model";
import { MovieService } from "../movie/movie.service";
import { MovieStorageService } from "../movie/movie-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private movieService: MovieService,
                private movieStorageService: MovieStorageService) {};

    private logo = "./assets/filmclub2.jpg";

    private searchedMovie;

    onMovieSearched() {
       this.movieStorageService.searchMovie(this.searchedMovie);
       this.searchedMovie = '';
    }

}