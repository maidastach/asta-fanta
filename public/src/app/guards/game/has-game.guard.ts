import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaguesResponse } from 'src/app/Models';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class HasGameGuard implements CanActivate, CanLoad
{
  constructor(private userService: UserService, private router: Router) {}

  canLoad(route: Route):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    console.log('canLoad GameGuard');
    return this.userService
      .getAdminLeagues()
        .pipe(
          map(
            (res: LeaguesResponse) => {
              this.userService.setLocalLeagues(res.response)
              return this.handleRedirect(res)
            }
          )     
        )
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    console.log('canActivate GameGuard');
    return this.userService
      .getAdminLeagues()
        .pipe(
          map(
            (res: LeaguesResponse) => res.success
          )
          
    )
  }



  handleRedirect(response: LeaguesResponse): boolean
  {
    if(response.response.length > 0)
      return true
    else
    {
      this.router.navigate(['/game'])
      return false
    }
  }
  
}
