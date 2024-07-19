import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Base_url} from '../utils/baseUrl';
import {Observable} from 'rxjs';
import {Tva} from '../models/tva';


@Injectable({
  providedIn: 'root'
})
export class TvaService {

  url = Base_url.Url_ServBack + '/tvas';


  constructor(private http: HttpClient) {
  }

  list(): Observable<Tva[]> {
    return this.http.get<Tva[]>(this.url + '/list');
  }

  save(tva: Tva): Observable<Tva> {
    if( tva.id ) {
      return this.http.put<Tva>(this.url, tva);
    } else {
      return this.http.post<Tva>(this.url, tva);
    }
  }

  findById(id: number): Observable<Tva> {
    return this.http.get<Tva>(this.url + '/' + id);
  }

  delete(id: number): Observable<void> {
    /*
    const tokenString = sessionStorage.getItem(TOKEN_KEY);
    const token: any = JSON.parse( tokenString );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.jwt}`
    })
     */

    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

}

