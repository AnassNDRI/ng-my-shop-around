import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // baseUrl = 'http://localhost:3000/api';
  baseUrl = environment.apiUrl;

  constructor() {}
}
