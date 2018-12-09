import { Component, OnInit, OnDestroy } from "@angular/core";
import { Movie } from "../model/movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MovieStorageService } from "../movie-storage.service";
import { HeaderComponent } from "src/app/header/header.component";

@Component({
    selector: 'app-movie-grid',
    templateUrl: './movie-grid.component.html',
    styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit, OnDestroy {

    movies: Movie[] = []

    subscription: Subscription;

    /* when movie grid component is created, a search already have been made 
    - so we need to call the next section of results (page 2 in our app)*/
    pageNum: number = 2;

    private previousArrow = "./assets/previous.png";
    private nextArrow = "./assets/next.png";

    constructor(private movieService: MovieService,
                private movieStorageService: MovieStorageService,
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

    onNextPage() {
        this.movieStorageService.clearMoviesSearchedWithPages();
        console.log(this.movieStorageService.getSearchedMovieTitle());
        this.movieStorageService.searchMovieWithPage(this.movieStorageService.getSearchedMovieTitle(), this.pageNum);
        this.pageNum++;
    }

}