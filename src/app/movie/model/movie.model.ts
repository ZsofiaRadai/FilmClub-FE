export class Movie {

    public imdbID: string;
    private title: string;
    private year: string;
    private type: string;
    private poster: string;

    constructor(imdbID: string, title: string, year: string, type: string, poster: string) {
        this.imdbID = imdbID;
        this.title = title;
        this.year = year;
        this.type = type;
        this.poster = poster;
    }

}