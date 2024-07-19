import { Injectable } from '@angular/core';
import {  CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';


import { filter, map, take } from 'rxjs/operators';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  canActivate(): Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      filter(Data => Data !== null),
      take(1),
      map( isAuthenticated => {
        console.log('autologin guard', isAuthenticated)
        if(isAuthenticated===false){
          return true;
        }else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
