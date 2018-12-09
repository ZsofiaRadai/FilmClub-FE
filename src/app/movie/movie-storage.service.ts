import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { MovieService } from './movie.service';
import { Movie } from './model/movie.model';
import { MovieDetails } from './model/movie-details.model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MovieStorageService {

    constructor(private http: Http,
                private movieService: MovieService) {}

    public moviesSearchedWithPages: Movie[] = [];
    page: number = 1;

    searchMovie(title: string) {
        this.http.get("http://www.omdbapi.com/?apikey=ac3c14bf&s=" + title + "&page=" + this.page)
        .map(
            (response: Response) => {
            console.log(response.json());
            const responseJSON = response.json();

            const movies = response.json().Search;
            const searchedMovies: Movie[] = [];

            if ( (responseJSON.totalResults / 10) >= 3 ) {
                while( this.page < 3) {
                    this.page++;
                    this.searchMovie(title);
                }
            }

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
                console.log(this.moviesSearchedWithPages);
                this.movieService.setMovies(movies);
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
        this.page = 1;
        this.moviesSearchedWithPages = [];
    }
}