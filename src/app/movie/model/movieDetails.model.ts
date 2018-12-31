import { Movie } from "./movie.model";

export class MovieDetails extends Movie {

    private rated: string;
    private released: string;
    private runtime: string;
    private genre: string[];
    private director: string;
    private writer: string[];
    private actors: string[];
    private plot: string;
    private language: string[];
    private country: string;
    private awards: string;

     constructor(imdbID: string, title: string, year: string, type: string, poster: string,
                 rated: string, released: string, runtime: string, genre: string[], director: string, writer: string[], 
                 actors: string[], plot: string, language: string[], country: string, imdbRating: number, awards: string ) {

        super(imdbID, title, year, type, poster);

        this.rated = rated;
        this.released = released;
        this.runtime = runtime;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.actors = actors;
        this.plot = plot;
        this.language = language;
        this.country = country;
        this.awards = awards;
        this.setImdbRating(imdbRating);
     }
}