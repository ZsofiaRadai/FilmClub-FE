import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { MovieService } from './movie.service';
import { Movie } from './movie.model';

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

    getMovieDetails(imdbID: string) {
        this.http.get("http://localhost:8080/movies/" + imdbID)
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
            .subscribe(
                (movie: string) => {
                    console.log(movie);
                }
            )
    }
}