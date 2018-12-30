import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { MovieService } from './movie.service';
import { Movie } from './model/movie.model';

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { MovieDetails } from './model/movieDetails.model';

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

            /*POSSIBLE TODO: remove movies without Posters from results + decrease totalResults number accordingly*/
            if (responseJSON.Response === 'False' && responseJSON.Error === "Movie not found!" && !responseJSON.Search) {
                console.log('Movie not found!');
            }

            else {
                const movies = responseJSON.Search;
                this.totalResults = responseJSON.totalResults;
                console.log(movies);
    
                for (let movie of movies) {
                    if (movie.Poster === "N/A") {
                        movie = new Movie(movie.imdbID, movie.Title, movie.Year, movie.Type, "https://crc2.pw/404.png");
                        this.moviesSearchedWithPages.push(movie);
                    } else {
                        movie = new Movie(movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster);
                        this.moviesSearchedWithPages.push(movie);
                    }
                }
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
                    if (this.movieService.getMovies().length === 0) {
                        this.router.navigate(['/not-found']);
                    }
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

/*     getMovieImdbRating(movie: Movie) {
        this.http.get("http://www.omdbapi.com/?apikey=ac3c14bf&i=" + movie.imdbID)
        .map(
            (response: Response) => {
                const movie = response.json();
                return movie.imdbRating;
            }
        )
        .subscribe(
            (rating: number) => {
                movie.setImdbRating(rating);
            }
        )
    } */

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