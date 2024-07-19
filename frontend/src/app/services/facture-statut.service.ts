import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

import {FactureStatut} from '../models/facture-statut';
import {Base_url} from "../utils/baseUrl";


@Injectable({
  providedIn: 'root'
})
export class FactureStatutService {

  url = Base_url.Url_ServBack + '/facturestatuts';


  constructor(private http: HttpClient) {
  }

  list(): Observable<FactureStatut[]> {
    return this.http.get<FactureStatut[]>(this.url + '/list');
  }


  findById(id: number): Observable<FactureStatut> {
    return this.http.get<FactureStatut>(this.url + '/' + id);
  }


}

