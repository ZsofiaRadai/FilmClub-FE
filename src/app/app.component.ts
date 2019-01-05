import { Component } from '@angular/core';
import { MovieStorageService } from './movie/movie-storage.service';
import { MovieService } from './movie/movie.service';
import { PagerService } from './util/pager.service';
import { UserRestService } from './user/user.rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MovieStorageService, MovieService, PagerService, UserRestService]
})
export class AppComponent {
}
