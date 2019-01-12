import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private backIcon = "././assets/back-icon.png";

  @ViewChild('f') form: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    let credentials = {
      "email": email,
      "password": password
    };

    let body = JSON.stringify(credentials);
    this.authService.login(body)
      .subscribe( data => {
        console.log(data);
        this.form.reset();
      });

  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
