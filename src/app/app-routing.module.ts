import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieGridComponent } from './movie/movie-grid/movie-grid.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
    {path: '', component: MovieGridComponent},
    {path: 'search', component: MovieGridComponent},
    {path: 'movie-details', component: MovieDetailComponent},
    {path: 'movie-details/movie/:id', component: MovieDetailComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: "Movie not found."}},
    {path: '**', component: ErrorPageComponent, data: {message: "This is not the page you were looking for!"}},
  ]

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
}