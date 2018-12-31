import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Movie } from "../model/movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MovieStorageService } from "../movie-storage.service";
import { PagerService } from "src/app/util/pager.service";
import { MovieDetails } from "../model/movieDetails.model";

@Component({
    selector: 'app-movie-grid',
    templateUrl: './movie-grid.component.html',
    styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent implements OnInit, OnDestroy {

    private movies: Movie[] = []
    private subscSearchedMovies: Subscription;
    private dataAvailable: boolean = false;

    private allItems: number;
    private pager: any = {};
    private pagedItems: any[]; 

    constructor(private movieService: MovieService,
                private movieStorageService: MovieStorageService,
                private router: Router,
                private pagerService: PagerService) {};

    ngOnInit() {
        this.subscSearchedMovies = this.movieService.searchedMovies
        .subscribe(
            (movies: Movie[]) => {
                this.movies = movies;
                console.log(this.movies);
                //when new search initialized (or next page called)
                this.allItems = this.movieStorageService.getTotalResults();
                this.pager = this.pagerService.getPager(this.allItems, this.movieStorageService.getPageNum());
                this.dataAvailable = true;
            }
        )
        //when navigate back to movie grid from movie details (searched movies didn't change)
        this.allItems = this.movieStorageService.getTotalResults();
        this.pager = this.pagerService.getPager(this.allItems, this.movieStorageService.getPageNum());
        this.movies = this.movieService.getMovies();
        this.dataAvailable = true;
    }

    movieSelected(movie: MovieDetails) {
        this.router.navigate(['/movie-details/movie', movie.imdbID]);
        this.movieService.setMovieDetails(movie);
    }

    setPage(page: number) {
        this.pager = this.pagerService.getPager(this.allItems, page);
        this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.movieStorageService.clearMoviesSearchedWithPages();
        this.movieStorageService.searchMovieWithPage(this.movieStorageService.getSearchedMovieTitle(), page);
        this.router.navigate(
            ['/search'], {queryParams: {page: page}, queryParamsHandling: 'merge'} 
            );
        this.movieService.setMovieDetails(undefined);
        document.documentElement.scrollTop = 0;
    }

    ngOnDestroy() {
        this.subscSearchedMovies.unsubscribe();
    }

}