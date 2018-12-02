export class Movie {

    public imdbID: string;
    private title: string;
    private year: string;
    private type: string;
    private poster: string;

    private rated: string;
    private released: string;
    private runtime: string;
    private genre: string;
    private Director: string;
    private writer: string;
    private actors: string;
    private plot: string;
    private language: string;
    private country: string;
    private imdbRating: number;

    constructor(imdbID: string, title: string, year: string, type: string, poster: string) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
        this.poster = poster;
    }

}