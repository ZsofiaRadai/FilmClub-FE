import { Component, OnInit, OnDestroy } from "@angular/core";
import { Movie } from "../model/movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MovieStorageService } from "../movie-storage.service";

@Component({
    selector: 'app-movie-grid',
    templateUrl: './movie-grid.component.html',
    styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit, OnDestroy {

    movies: Movie[] = []

    subscSearchedMovies: Subscription;

    private previousArrow = "./assets/previous.png";
    private nextArrow = "./assets/next.png";

    constructor(private movieService: MovieService,
                private movieStorageService: MovieStorageService,
                private router: Router) {};

    ngOnInit() {
        this.subscSearchedMovies = this.movieService.searchedMovies
            .subscribe(
                (movies: Movie[]) => {
                    this.movies = movies;
                }
            )
        this.movies = this.movieService.getMovies();    
    }

    ngOnDestroy() {
        this.subscSearchedMovies.unsubscribe();
    }

    onNextPage() {
        this.movieStorageService.clearMoviesSearchedWithPages();
        this.movieStorageService.incrementPageNum();
        this.movieStorageService.searchMovieWithPage(this.movieStorageService.getSearchedMovieTitle());
        this.router.navigate(
            ['/search'], {queryParams: {page: this.movieStorageService.getPageNum()}, queryParamsHandling: 'merge'} 
            );
    }

    onPreviousPage() {
        this.movieStorageService.clearMoviesSearchedWithPages();
        this.movieStorageService.decrementPageNum();
        this.movieStorageService.searchMovieWithPage(this.movieStorageService.getSearchedMovieTitle());
        this.router.navigate(
            ['/search'], {queryParams: {page: this.movieStorageService.getPageNum()}, queryParamsHandling: 'merge'} 
            );
    }

}