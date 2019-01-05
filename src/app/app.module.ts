import './jquery';
import 'bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MovieGridComponent } from './movie/movie-grid/movie-grid.component';
import { MovieGridDirective } from './movie/movie-grid/movie-grid.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HttpModule } from '@angular/http';
import { UserRestService } from './user/user.rest.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieGridComponent,
    MovieGridDirective,
    MovieDetailComponent,
    ErrorPageComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
