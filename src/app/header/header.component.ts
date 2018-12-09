import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MovieStorageService } from "../movie/movie-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private router: Router,
                private movieStorageService: MovieStorageService) {};

    private logo = "./assets/filmclub2.jpg";

    private searchedMovie;

    onMovieSearched() {
        this.movieStorageService.clearPreviousSearch();
        this.movieStorageService.searchMovie(this.searchedMovie);
        this.searchedMovie = '';
        this.router.navigate(['/']);
    }

}