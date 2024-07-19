import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { PageNoteFoundComponent } from './components/page-note-found/page-note-found.component';
import {RouterModule} from "@angular/router";
import {JwtInterceptor} from "./services/jwt.interceptor";
import {Pipe, PipeTransform} from "@angular/core";
import {RegisterComponent} from "./components/enregistrer/register.component";
import { DatePipe} from "@angular/common";
import { LOCALE_ID } from '@angular/core';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNoteFoundComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
    DatePipe,
    Pipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


 // export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
 // return new TranslateHttpLoader(http);
// }
