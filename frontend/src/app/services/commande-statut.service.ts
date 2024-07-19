import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

import {CommandeStatut} from '../models/commande-statut';
import {Base_url} from "../utils/baseUrl";


@Injectable({
  providedIn: 'root'
})
export class CommandeStatutService {

  url = Base_url.Url_ServBack + '/commandestatuts';


  constructor(private http: HttpClient) {
  }

  list(): Observable<CommandeStatut[]> {
    return this.http.get<CommandeStatut[]>(this.url + '/list');
  }

  save(commandeStatut: CommandeStatut): Observable<CommandeStatut> {
    if( commandeStatut.id ) {
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

