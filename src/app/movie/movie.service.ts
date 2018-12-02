import { Movie } from "./model/movie.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class MovieService {

    movieSelected = new EventEmitter<Movie>();

    searchedMovies = new Subject<Movie[]>();
    
    private movies: Movie[] = [
        new Movie('tt199', 'Fight club', '1999', 'drama', 'https://images-na.ssl-images-amazon.com/images/I/51v5ZpFyaFL.jpg'),
        new Movie('tt198', 'Gattaca', '1997', 'sci-fi', 'https://images-na.ssl-images-amazon.com/images/I/51pawxK0GBL.jpg')
    ];

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
}