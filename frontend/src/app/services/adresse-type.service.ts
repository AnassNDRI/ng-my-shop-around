import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AdresseType } from '../models/adresse-type';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AdresseTypeService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url = this.apiService.baseUrl + '/adressetypes';

  findById(id: number): Observable<AdresseType> {
    return this.http.get<AdresseType>(this.url + '/' + id);
  }
  list(): Observable<AdresseType[]> {
    return this.http.get<AdresseType[]>(this.url + '/list');
  }
  delete(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  save(adresseType: AdresseType): Observable<AdresseType> {
    if (adresseType.id) {
      return this.http.put<AdresseType>(this.url, adresseType);
    } else {
      return this.http.post<AdresseType>(this.url, adresseType);
    }
  }
}
