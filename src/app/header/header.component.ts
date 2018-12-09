import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MovieStorageService } from "../movie/movie-storage.service";
import { MovieService } from "../movie/movie.service";

@Component({
    selector: 'app-header',
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private router: Router,
                private movieStorageService: MovieStorageService,
                private movieService: MovieService) {};

    private logo = "./assets/filmclub2.jpg";

    private searchedMovie;

    onMovieSearched() {
        this.movieStorageService.clearPreviousSearch();

        /* we call page 1, because from header we always call the first search
        - see next pages in movie grid */
        this.movieStorageService.searchMovieWithPage(this.searchedMovie, 1);
        this.searchedMovie = '';
        this.router.navigate(['/']);
    }

}