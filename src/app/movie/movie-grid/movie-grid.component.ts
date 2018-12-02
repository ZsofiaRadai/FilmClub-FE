import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../../header/header.component";
import { Movie } from "../movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-movie-grid',
    templateUrl: './movie-grid.component.html',
    styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit {

    movies: Movie[] = []

    subscription: Subscription;

    constructor(private movieService: MovieService,
                private router: Router) {};

    ngOnInit() {
        this.subscription = this.movieService.searchedMovies
            .subscribe(
                (movies: Movie[]) => {
                    this.movies = movies;
                }
            )
        this.movies = this.movieService.getMovies();    
    }

    onMovieSelected(movie: Movie) {
        console.log(movie);
        this.router.navigate(['/movie-details/movie', movie.imdbID]);
    }

}