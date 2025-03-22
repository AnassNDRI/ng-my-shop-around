import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tva } from '../models/tva';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TvaService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/products';

  list(): Observable<Tva[]> {
    return this.http.get<Tva[]>(this.url + '/tva');
  }

  save(tva: Tva): Observable<Tva> {
    if (tva.tva_id) {
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
