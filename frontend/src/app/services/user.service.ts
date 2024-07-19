import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {config, Observable} from "rxjs";

import {User} from "../models/users";
import {Base_url} from "../utils/baseUrl";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UserService {
 url = Base_url.Url_ServBack + '/utilisateurs';

  constructor(private http: HttpClient) { }

  list(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + '/list');
  }

  save(utilisateur: Utilisateur): Observable<Utilisateur> {
    if( utilisateur.id ) {
      return this.http.put<Utilisateur>(this.url, utilisateur);
    } else {
      return this.http.post<Utilisateur>(this.url, utilisateur);
    }
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id );
  }

  findAccount(): Observable<Utilisateur>{
    return this.http.get<Utilisateur>(this.url + '/account');
  }

}
