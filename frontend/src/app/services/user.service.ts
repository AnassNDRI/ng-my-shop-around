import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Utilisateur } from '../models/utilisateur';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/utilisateurs';

  list(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.url + '/list');
  }

  save(utilisateur: Utilisateur): Observable<Utilisateur> {
    if (utilisateur.id) {
      return this.http.put<Utilisateur>(this.url, utilisateur);
    } else {
      return this.http.post<Utilisateur>(this.url, utilisateur);
    }
  }

  findById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/delete/' + id);
  }

  findAccount(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/account');
  }
}
