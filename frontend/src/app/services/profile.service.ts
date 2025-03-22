import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/users';

  save(utilisateur: Utilisateur): Observable<Utilisateur> {
    if (utilisateur.id) {
      return this.http.put<Utilisateur>(this.url, utilisateur);
    } else {
      return this.http.post<Utilisateur>(this.url, utilisateur);
    }
  }

  getAccount(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.url + '/profile');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
