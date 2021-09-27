import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/Models';
import { AppService } from '../../app.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad 
{
  constructor(private authService: AuthService, private router: Router, private appService: AppService) {}

  canLoad(route: Route):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    const location: string = `/${route.path}`
    return this.authService
      .isLogged()
        .pipe(
          map(
            res => this.handleRedirect(res, location)
          )
        )
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const location: string = state.url
    return this.authService
      .isLogged()
        .pipe(
          map(
            res => this.handleRedirect(res, location)
          )
        )
  }

  handleRedirect(response: AuthResponse, location: string): boolean
  {
    this.appService.loadingSource.next(false)
    if(location === '/')
      return (response.success) ? this.goNext() : true
    if(location === '/game')
      return (!response.success) ? this.goHome() : true
    else if(location === '/game/new-game')
      return (!response.success) ? this.goHome() : true
    else if(location === '/game/load-game')
      return (!response.success) ? this.goHome() : true
    else if(location === '/game/customize')
      return (!response.success) ? this.goHome() : true
    else if (location === '/asta')
      return (!response.success) ? this.goHome() : true
    else
      return this.goHome();
  }

  goHome(): boolean
  {
    this.router.navigate(['/'])
    return false;
  }

  goNext(): boolean
  {
    this.router.navigate(['game/new-game'])
    return false;
  }
  
}

