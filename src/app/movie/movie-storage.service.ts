import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { MovieService } from './movie.service';
import { Movie } from './model/movie.model';
import { MovieDetails } from './model/movie-details.model';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class MovieStorageService {

    constructor(private http: Http,
                private movieService: MovieService,
                private router: Router) {}

    moviesSearchedWithPages: Movie[] = [];

    pageNumOMDB: number[] = [1, 2, 3];

    pageNum: number;
    
    searchedMovieTitle: string;

    searchMovieWithPage(title:string) {
        this.searchedMovieTitle = title;
        this.pageNumOMDB = [this.pageNum * 3 - 2, this.pageNum * 3 - 1, this.pageNum * 3];
        for (let i of this.pageNumOMDB) {
            this.searchMovie(this.searchedMovieTitle, i);
        }
        console.log(this.pageNumOMDB);
        
    }

    searchMovie(title: string, pageNumOMDB: number) {
        this.http.get("http://www.omdbapi.com/?apikey=ac3c14bf&s=" + title + "&page=" + pageNumOMDB)
        .map(
            (response: Response) => {
            const responseJSON = response.json();

            /*TODO: write logic to match page number with result number 
            - to not throw error, if result list is less than page number requested */
            if (responseJSON.Response === 'False' && responseJSON.Error === "Movie not found!" && !responseJSON.Search) {
                console.log('Movie not found!');
                this.router.navigate(['/not-found']);
                return;
            }

            const movies = response.json().Search;

            for (let movie of movies) {
                movie = new Movie(movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster);
                this.moviesSearchedWithPages.push(movie);
            }
            return this.moviesSearchedWithPages;
        },
        err => {
            console.log("oops")
        })
        .subscribe(
            (movies: Movie[]) => {
                if (movies) {
                    console.log(this.moviesSearchedWithPages);
                    this.movieService.setMovies(movies);
                }
            }
        )
    }

    getMovieDetails(imdbID: string): Observable<MovieDetails> {
        return this.http.get("http://www.omdbapi.com/?apikey=ac3c14bf&i=" + imdbID)
            .map(
                (response: Response) => {
                    let movieDetails: MovieDetails;
                    const movie = response.json();
                    movieDetails = new MovieDetails(movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster, movie.Rated, 
                                                    movie.Released, movie.Runtime, movie.Genre, movie.Director, movie.Writer, movie.Actors,
                                                    movie.Plot, movie.Language, movie.Country, movie.imdbRating, movie.Awards);
                    return movieDetails;
                }
            )
    }

    clearPreviousSearch() {
        this.pageNumOMDB = [1, 2, 3];
        this.moviesSearchedWithPages = [];
    }

    clearMoviesSearchedWithPages() {
        this.moviesSearchedWithPages = [];
    }

    setSearchedMovieTitle(title: string) {
        this.searchedMovieTitle = title;
    }

    getSearchedMovieTitle() {
        return this.searchedMovieTitle;
    }

    getPageNum() {
        return this.pageNum;
    }

    setPageNum(num: number) {
        this.pageNum = num;
    }

    incrementPageNum() {
        this.pageNum++;
    }

    decrementPageNum() {
        this.pageNum--;
    }

}