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
                private movieStorageService: MovieStorageService) {};

    private logo = "./assets/filmclub2.jpg";

    private searchedMovie: string;

    onMovieSearched() {
        this.movieStorageService.clearPreviousSearch();

        /* we call page 1, because from header we always call the first search
        - see next pages in movie grid */
        this.movieStorageService.setPageNum(1);
        this.movieStorageService.searchMovieWithPage(this.searchedMovie, this.movieStorageService.getPageNum());

        this.router.navigate(
            ['/search'], 
            {queryParams: {
                title: this.searchedMovie, 
                page: this.movieStorageService.getPageNum()
            }, 
                queryParamsHandling: 'merge'} 
            );
        this.searchedMovie = '';
    }

}