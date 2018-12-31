import { Movie } from "./model/movie.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MovieDetails } from "./model/movieDetails.model";

@Injectable({
    providedIn: 'root',
  })
export class MovieService {

    private movieDetails: MovieDetails;

    searchedMovies = new Subject<Movie[]>();
    
    private movies: Movie[] = [];

    setMovies(movies: Movie[]) {
        this.movies = movies;
        this.searchedMovies.next(this.movies.slice());
    }

    getMovies() {
        return this.movies.slice();
    }

    addMovie(movie: Movie) {
        this.movies.push(movie);
    }

    getMovie(id: string) {
        const movie = this.movies.find(
            (m) => {
                return m.imdbID === id;
            }
        );
        return movie;
    }

    setMovieDetails(movie: MovieDetails) {
        this.movieDetails = movie;
    }

    getMovieDetails() {
        return this.movieDetails;
    }
    
}