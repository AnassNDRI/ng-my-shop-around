import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Adresse } from '../models/adresse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/adresses';

  list(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.url + '/list');
  }

  save(adresse: Adresse): Observable<Adresse> {
    if (adresse.id) {
      return this.http.put<Adresse>(this.url, adresse);
    }
    return this.http.post<Adresse>(this.url, adresse);
  }

  findById(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(this.url + '/detail/' + id);
  }

  findByUtilisateur(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.url + '/utilisateurs');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/delete/' + id);
  }
}
