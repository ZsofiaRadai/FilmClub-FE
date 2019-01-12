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
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpModule, RequestOptions } from '@angular/http';
import { AuthRequestOptions } from './auth/auth.request.options';


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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService,
    {
      provide: RequestOptions, 
      useClass: AuthRequestOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
