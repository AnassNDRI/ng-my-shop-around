import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import {Base_url} from "../utils/baseUrl";
import {JwtHelperService} from '@auth0/angular-jwt';

export const  TOKEN_KEY  = 'my-token';
const BASE_URL = Base_url.Url_ServBack + '/users/signin';
const  BASE_URLrg = Base_url.Url_ServBack  + '/users/register-customer';
const  BASE_URLId = Base_url.Url_ServBack  + '/users/signin';


export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentIsAuth = this.isAuthenticated.asObservable();



  constructor(private http: HttpClient, private jwtService: JwtHelperService) {
    this.loadToken();
  }

  get isAdmin(): boolean {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken.admin;
    }
    return false;
  }

  get isEmploye(): boolean {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken.employe;
    }
    return false;
  }

  get userId(): number | null {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken.id;
    }
    return null;
  }

  get token(): string | null {
    const stringJwt = sessionStorage.getItem(TOKEN_KEY);
    if(stringJwt) {
      const modele: any = JSON.parse( stringJwt );
      return modele.jwt;
    } else {
      return null;
    }
  }
  async loadToken(){
    const token = await sessionStorage.getItem(TOKEN_KEY);
    if(token){
      console.log(token);
      this.isAuthenticated.next(true);
      console.log('load token - yes', this.isAuthenticated);
    }else {
      this.isAuthenticated.next(false);
      console.log('load token - no', this.isAuthenticated);
    }
  }

  login(credentials: {utilisateur_email: string, utilisateur_mdp: string}){
    const body = new URLSearchParams();
    body.set('utilisateur_email', credentials.utilisateur_email);
    body.set('utilisateur_mdp', credentials.utilisateur_mdp);
    return this.http.post(BASE_URL, body, httpOptions).pipe(
      map((data: any) => {
        if(data){
          sessionStorage.setItem(TOKEN_KEY,JSON.stringify(data));
          this.isAuthenticated.next(data);
          console.log('login token - oui', this.isAuthenticated);
        }else{
          this.isAuthenticated.next(false);
          console.log('login token - no', this.isAuthenticated);
        }
        return data;
      }));
  }

  register(credentials: { utilisateur_nom: string, utilisateur_prenom: string, utilisateur_email: string, utilisateur_mdp: string, utilisateur_date_naissance: string, utilisateur_gsm: string, actif: boolean }) {
    console.log(credentials);
    const body = new URLSearchParams();
    body.set('utilisateur_nom', credentials.utilisateur_nom);
    body.set('utilisateur_prenom', credentials.utilisateur_prenom);
    body.set('utilisateur_email', credentials.utilisateur_email);
    body.set('utilisateur_mdp', credentials.utilisateur_mdp);
    body.set('utilisateur_date_naissance', credentials.utilisateur_date_naissance);
    body.set('utilisateur_gsm', credentials.utilisateur_gsm);

    return this.http.post(BASE_URLrg, body.toString(), httpOptions).pipe(
      map((data: any) => {
        if (data) {
          console.log('data', data);
          sessionStorage.setItem(TOKEN_KEY, JSON.stringify(data));
          this.isAuthenticated.next(true);
          console.log('register token - yes', this.isAuthenticated);
        } else {
          this.isAuthenticated.next(false);
          console.log('register token - no', this.isAuthenticated);
        }
        return data;
      })
    );
  }




  public getUser():any{
    return this.http.get(BASE_URLId).pipe(
      map((data: any) => {
        console.log('data', data);

        if(data){

          sessionStorage.getItem(TOKEN_KEY);
          this.isAuthenticated.next(data);
          console.log('login token - no', this.isAuthenticated);
        }else{
          this.isAuthenticated.next(false);
          console.log('login token - no', this.isAuthenticated);
        }
        return data;
      }));
  }


  logout(){
    this.isAuthenticated.next(false);
    sessionStorage.removeItem(TOKEN_KEY);

  }
}
