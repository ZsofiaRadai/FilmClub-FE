import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieStorageService } from 'src/app/movie/movie-storage.service';
import { NgForm } from '@angular/forms';
import { MovieService } from 'src/app/movie/movie.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private backIcon = "././assets/back-icon.png";

  @ViewChild('f') form: NgForm;

  constructor(private router: Router,
              private movieService: MovieService,
              private movieStorageService: MovieStorageService) { }

  ngOnInit() {
  }

  onSignup() {
    const email = this.form.value.email;
    const password1 = this.form.value.password;
    const password2 = this.form.value.passwordAgain;
    console.log(email);
    console.log(password1);
    console.log(password2);

    if (password1 != password2) {
      $('#invalid-password-error')[0].style.visibility = 'visible';
      $('.passwords').addClass('invalid-password');
    } else {
      $('#invalid-password-error')[0].style.visibility = 'hidden';
      $('.passwords').removeClass('invalid-password');
    }
  }

  onBack() {
    const movie = this.movieService.getMovieDetails();

    if (movie !== undefined) {
      this.router.navigate(['/movie-details/movie', movie.imdbID])
      return;
    }

    if (this.movieStorageService.getSearchedMovieTitle() === undefined) {
      this.router.navigate(['/']);
      return;
    }

    this.router.navigate(
      ['/search'], 
        {
          queryParams: {
          title: this.movieStorageService.getSearchedMovieTitle(), 
          page: this.movieStorageService.getPageNum()
          } 
        },)
  }

}
