import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private backIcon = "././assets/back-icon.png";

  @ViewChild('f') form: NgForm;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSignin() {

  }

  onBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
