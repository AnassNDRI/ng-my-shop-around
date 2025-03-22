import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FactureStatut } from '../models/facture-statut';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FactureStatutService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/facturestatuts';

  list(): Observable<FactureStatut[]> {
    return this.http.get<FactureStatut[]>(this.url + '/list');
  }

  findById(id: number): Observable<FactureStatut> {
    return this.http.get<FactureStatut>(this.url + '/' + id);
  }
}
