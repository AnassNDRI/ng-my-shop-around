import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from 'rxjs';
import {Role} from '../models/role';
import { ApiService } from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class RoleService {

 
  constructor(private http: HttpClient, private apiService: ApiService) {}
 
   url = this.apiService.baseUrl + '/roles';

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/list');
  }


  findById(id: number): Observable<Role> {
    return this.http.get<Role>(this.url + '/' + id);
  }



}

