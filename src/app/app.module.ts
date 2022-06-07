import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Route, Router, RouterModule, Routes} from "@angular/router";
import {CreateLinkComponent} from './create-link/create-link.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { ShortUrlComponent } from './short-url/short-url.component';

const routes: Routes = [
  {path: 'home', component: CreateLinkComponent},
  {path: ':shortUrl', component: ShortUrlComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    CreateLinkComponent,
    PageNotFoundComponent,
    ShortUrlComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
