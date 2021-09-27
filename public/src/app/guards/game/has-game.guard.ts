import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaguesResponse } from 'src/app/Models';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class HasGameGuard implements CanActivate, CanLoad
{
  constructor(private userService: UserService) {}

  canLoad(route: Route):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.userService
      .getAllLeagues()
        .pipe(
          map(
            (res: LeaguesResponse) => {
              console.log(res)
              return res.success
            }
          )     
        )
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.userService
      .getAllLeagues()
        .pipe(
          map(
            (res: LeaguesResponse) => res.success
          )
          
    )
  }
  
}
