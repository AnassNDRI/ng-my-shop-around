import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Livraison} from '../models/livraison';
import {Base_url} from "../utils/baseUrl";


@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  url = Base_url.Url_ServBack + '/livraisons';


  constructor(private http: HttpClient) {
  }

  list(): Observable<Livraison[]> {
    return this.http.get<Livraison[]>(this.url + '/list');
  }

  save(livraison: Livraison): Observable<Livraison> {

    if( livraison.id ) {
      return this.http.put<Livraison>(this.url, livraison);
    } else {
      return this.http.post<Livraison>(this.url, livraison);
    }
  }

  findById(id: number): Observable<Livraison> {
    return this.http.get<Livraison>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }



}

