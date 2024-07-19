import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Base_url, } from '../utils/baseUrl';
import {Observable} from 'rxjs';
import {Adresse} from '../models/adresse';


@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  url = Base_url.Url_ServBack + '/adresses';


  constructor(private http: HttpClient) {
  }

  list(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(this.url + '/list');
  }

  save(adresse: Adresse): Observable<Adresse> {
    if(adresse.id) {
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
    return this.http.delete<void>( this.url + '/delete/' + id);
  }






}

