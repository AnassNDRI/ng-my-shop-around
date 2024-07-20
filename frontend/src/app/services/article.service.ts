import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Base_url} from '../utils/baseUrl';
import {AuthenticationService} from "./authentication.service";
import {Article} from "../models/article";



@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = Base_url.Url_ServBack + '/products';


  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  list(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + '/list');
  }

  save(article: Article): Observable<Article> {
       if( article.article_id ) {
      return this.http.put<Article>(this.url, article);
    } else {
      return this.http.post<Article>(this.url, article);
    }
  }

  findById(id: number): Observable<Article> {
    return this.http.get<Article>(this.url + '/detail/' + id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>( this.url + '/delete/' + id);
  }

}
