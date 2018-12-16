import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieStorageService } from '../movie-storage.service';
import { MovieDetails } from '../model/movie-details.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  movieDetails: MovieDetails;
  dataAvailable: boolean = false;

  private backIcon = "././assets/back-icon.png";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private movieStorageService: MovieStorageService) { }

  ngOnInit() {
    const imdbID = this.route.snapshot.params['id'];
    this.movieStorageService.getMovieDetails(imdbID)
      .subscribe(
        (response: MovieDetails) => {
          this.movieDetails = response;
          console.log(this.movieDetails);
          this.dataAvailable = true
        }
      );
  }

  onBack() {
    this.router.navigate(
      ['/search'], 
        {queryParams: {
          title: this.movieStorageService.getSearchedMovieTitle(), 
          page: this.movieStorageService.getPageNum()
          } 
        })
  }

}
