export class Movie {

    public imdbID: string;
    private title: string;
    private year: string;
    private type: string;
    private poster: string;
    private imdbRating: number;

    constructor(imdbID: string, title: string, year: string, type: string, poster: string) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
        this.poster = poster;
    }

    public getImdbRating(): number {
        return this.imdbRating;
    }
    public setImdbRating(value: number) {
        this.imdbRating = value;
    }



}