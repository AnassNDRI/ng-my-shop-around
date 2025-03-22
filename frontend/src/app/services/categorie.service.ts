import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Category } from '../models/category';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {}

  url = this.apiService.baseUrl + '/products';

  list(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/category');
  }

  save(category: Category): Observable<Category> {
    if (category.categorie_id) {
      return this.http.put<Category>(this.url, category);
    } else {
      return this.http.post<Category>(this.url, category);
    }
  }

  findById(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.url + '/delete/' + id);
  }
}
