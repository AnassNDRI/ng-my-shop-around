import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CommandeStatut } from '../models/commande-statut';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CommandeStatutService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/commandestatuts';

  list(): Observable<CommandeStatut[]> {
    return this.http.get<CommandeStatut[]>(this.url + '/list');
  }

  save(commandeStatut: CommandeStatut): Observable<CommandeStatut> {
    if (commandeStatut.id) {
      return this.http.put<CommandeStatut>(this.url, commandeStatut);
    } else {
      return this.http.post<CommandeStatut>(this.url, commandeStatut);
    }
  }

  findById(id: number): Observable<CommandeStatut> {
    return this.http.get<CommandeStatut>(this.url + '/' + id);
  }

  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
}
