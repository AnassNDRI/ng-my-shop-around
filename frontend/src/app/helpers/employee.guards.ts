import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ){}

  canActivate(): Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      filter(Data => Data !== null),
      take(1),
      map( isAuthenticated => {
        if(isAuthenticated){

          const isEmploye = this.authService.isEmploye;
          const isAdmin = this.authService.isAdmin;
          if(isEmploye || isAdmin) {
            return true;
          } else {
            this.router.navigate(['/home']);
            return false;
          }

        }else {
          this.router.navigate(['/login']) ;
          return false;
        }
      })
    );
  }

}
