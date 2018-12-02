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

    searchMovie(title: string) {
        this.http.get("http://localhost:8080/search?title=" + title)
        .map(
            (response: Response) => {
            console.log(response.json());

            const movies = response.json();
            const searchedMovies: Movie[] = [];

            for (let movie of movies.Search) {
                movie = new Movie(movie.imdbID, movie.Title, movie.Year, movie.Type, movie.Poster);
                searchedMovies.push(movie);
            }
            return searchedMovies;
        },
        err => {
            console.log("oops")
        })
        .subscribe(
            (movies: Movie[]) => {
                this.movieService.setMovies(movies);
            }
        )
    }

    getMovieDetails(imdbID: string): Observable<MovieDetails> {
        return this.http.get("http://localhost:8080/movies/" + imdbID)
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
}