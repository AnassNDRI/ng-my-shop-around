import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Base_url} from "../utils/baseUrl";
import {AuthenticationService} from "./authentication.service";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  url = Base_url.Url_ServBack + '/utilisateurs';


  constructor(private http: HttpClient,
              private authService : AuthenticationService) {
  }


  save(utilisateur: Utilisateur): Observable<Utilisateur> {
    if( utilisateur.id ) {
      return this.http.put<Utilisateur>(this.url, utilisateur);
    } else {
      return this.http.post<Utilisateur>(this.url, utilisateur);
    }
  }

  getAccount(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/account');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id );
  }

}

