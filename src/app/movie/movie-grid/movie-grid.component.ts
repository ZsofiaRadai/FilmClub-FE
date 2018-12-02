import { Component, OnInit, OnDestroy } from "@angular/core";
import { Movie } from "../model/movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-movie-grid',
    templateUrl: './movie-grid.component.html',
    styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit, OnDestroy {

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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

/*     onMovieSelected(movie: Movie) {
        this.router.navigate(['/movie-details/movie', movie.imdbID]);
    } */

}