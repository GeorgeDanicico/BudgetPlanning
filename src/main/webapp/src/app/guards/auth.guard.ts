import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { access } from 'fs';
import { Observable } from 'rxjs';
import { PATHS } from '../utils/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const sessionId = localStorage.getItem('sessionId');
      // const url = route.url[0].path;
      // console.log(url);
      // if ((url === PATHS.LOGIN || url === PATHS.REGISTER) && !sessionId) {
      //   return true;
      // }

      // if ((url === PATHS.LOGIN || url === PATHS.REGISTER) && sessionId) {
      //   this.router.navigate(['dashboard']); 
      //   return false;
      // }

      // if (sessionId) {
      //   return true;
      // }
      // this.router.navigate(['login']); 
      // return false;
      return true;
  }
  
}
