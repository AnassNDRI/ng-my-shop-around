import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

import {LivraisonStatut} from '../models/livraison-statut';
import {Base_url} from "../utils/baseUrl";


@Injectable({
  providedIn: 'root'
})
export class LivraisonStatutService {

  url = Base_url.Url_ServBack + '/livraisonstatuts';


  constructor(private http: HttpClient) {
  }

  list(): Observable<LivraisonStatut[]> {
    return this.http.get<LivraisonStatut[]>(this.url + '/list');
  }

  save(livraisonStatut: LivraisonStatut): Observable<LivraisonStatut> {
    if( livraisonStatut.id ) {
      return this.http.put<LivraisonStatut>(this.url, livraisonStatut);
    } else {
      return this.http.post<LivraisonStatut>(this.url, livraisonStatut);
    }
  }

  findById(id: number): Observable<LivraisonStatut> {
    return this.http.get<LivraisonStatut>(this.url + '/' + id);
  }

  delete(id: number): Observable<void> {

    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

}

