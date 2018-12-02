import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;

  private backIcon = "././assets/back-icon.png";

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const imdbID = this.route.snapshot.params['id'];
    this.movie = this.movieService.getMovie(imdbID);
  }

  onBack() {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }

}
