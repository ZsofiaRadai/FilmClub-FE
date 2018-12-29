import { Component, OnInit, OnDestroy } from "@angular/core";
import { Movie } from "../model/movie.model";
import { MovieService } from "../movie.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MovieStorageService } from "../movie-storage.service";
import { PagerService } from "src/app/util/pager.service";

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
                private router: Router,
                private pagerService: PagerService) {};

    // array of all items to be paged
    private allItems: number;
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

    ngOnInit() {
        this.pager = this.pagerService.getPager(this.allItems, this.movieStorageService.getPageNum());
        this.subscSearchedMovies = this.movieService.searchedMovies
            .subscribe(
                (movies: Movie[]) => {
                    this.movies = movies;
                    this.allItems = this.movieStorageService.getTotalResults();
                }
            )
        this.movies = this.movieService.getMovies();    
    }

    ngOnDestroy() {
        console.log("movie grid destroyed.")
        this.subscSearchedMovies.unsubscribe();
    }

    //TODO: scroll to top when new page called

    setPage(page: number) {
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems, page);
 
        // get current page of items
        this.pagedItems = this.movies.slice(this.pager.startIndex, this.pager.endIndex + 1);
        this.movieStorageService.clearMoviesSearchedWithPages();
        this.movieStorageService.searchMovieWithPage(this.movieStorageService.getSearchedMovieTitle(), page);
        this.router.navigate(
            ['/search'], {queryParams: {page: page}, queryParamsHandling: 'merge'} 
            );
    }

/*     onNextPage() {
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
    } */

}