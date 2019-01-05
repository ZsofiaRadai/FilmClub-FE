import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieStorageService } from 'src/app/movie/movie-storage.service';
import { NgForm } from '@angular/forms';
import { MovieService } from 'src/app/movie/movie.service';
import { UserRestService } from 'src/app/user/user.rest.service';
import { User } from 'src/app/user/model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private backIcon = "././assets/back-icon.png";

  @ViewChild('f') form: NgForm;

  private validForm: boolean = false;

  constructor(private router: Router,
              private movieService: MovieService,
              private movieStorageService: MovieStorageService,
              private userRestService: UserRestService) { }

  ngOnInit() {
  }

  onSignup(): void {
    const username = this.form.value.username;
    const email = this.form.value.email;
    const password1 = this.form.value.password;
    const password2 = this.form.value.passwordAgain;

    this.validateForm(password1, password2);

    if (this.validForm == true) {
      var user = new User(username, email, password1);
      this.userRestService.createUser(user)
        .subscribe( data => {
          console.log("User created successfully.");
          this.form.reset();
        });
    }

    this.validForm = false;
    
  }

  validateForm(password1: string, password2: string) {
    if (password1 != password2) {
      $('#invalid-password-error')[0].style.visibility = 'visible';
      $('.passwords').addClass('invalid-password');
    } else {
      $('#invalid-password-error')[0].style.visibility = 'hidden';
      $('.passwords').removeClass('invalid-password');
      this.validForm = true;
    }
  }

  onBack() {
    /* const movie = this.movieService.getMovieDetails();
    if (movie !== undefined) {
      this.router.navigate(['/movie-details/movie', movie.imdbID])
      return;
    } */

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
