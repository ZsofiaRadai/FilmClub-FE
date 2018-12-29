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

    private moviesSearchedWithPages: Movie[] = [];
    private pageNumOMDB: number[] = [1, 2, 3];
    private pageNum: number = 1;
    private searchedMovieTitle: string;
    private totalResults: number;

    searchMovieWithPage(title:string, pageNum: number) {
        this.searchedMovieTitle = title;
        this.pageNum = pageNum;
        this.pageNumOMDB = [pageNum * 3 - 2, pageNum * 3 - 1, pageNum * 3];
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

            /*TODO: FIX LOGIC write logic to match page number with result number 
            - to not throw error, if result list is less than page number requested */
            if (responseJSON.Response === 'False' && responseJSON.Error === "Movie not found!" && !responseJSON.Search) {
                console.log('Movie not found!');
                this.router.navigate(['/not-found']);
                return;
            }

            const movies = responseJSON.Search;
            this.totalResults = responseJSON.totalResults;

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

    public clearPreviousSearch() {
        this.pageNumOMDB = [1, 2, 3];
        this.moviesSearchedWithPages = [];
    }

    public clearMoviesSearchedWithPages() {
        this.moviesSearchedWithPages = [];
    }

    public setSearchedMovieTitle(title: string) {
        this.searchedMovieTitle = title;
    }

    public getSearchedMovieTitle() {
        return this.searchedMovieTitle;
    }

    public getTotalResults(): number {
        return this.totalResults;
    }

    public getPageNum() {
        return this.pageNum;
    }

    public setPageNum(num: number) {
        this.pageNum = num;
    }

}