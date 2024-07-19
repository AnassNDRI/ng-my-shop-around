import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from 'rxjs';
import {Role} from '../models/role';
import {Base_url} from "../utils/baseUrl";


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = Base_url.Url_ServBack + '/roles';


  constructor(private http: HttpClient) {
  }

  list(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url + '/list');
  }


  findById(id: number): Observable<Role> {
    return this.http.get<Role>(this.url + '/' + id);
  }



}

