import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MoyenPaiement } from '../models/moyen-paiement';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MoyenPaiementService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/moyenpaiements';

  list(): Observable<MoyenPaiement[]> {
    return this.http.get<MoyenPaiement[]>(this.url + '/list');
  }

  save(moyenPaiement: MoyenPaiement): Observable<MoyenPaiement> {
    if (moyenPaiement.id) {
      return this.http.put<MoyenPaiement>(this.url, moyenPaiement);
    } else {
      return this.http.post<MoyenPaiement>(this.url, moyenPaiement);
    }
  }

  findById(id: number): Observable<MoyenPaiement> {
    return this.http.get<MoyenPaiement>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
