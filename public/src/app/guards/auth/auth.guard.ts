import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from 'src/app/Models';
import { ProcessService } from 'src/app/services/processing/process.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad 
{
  constructor(private authService: AuthService, private router: Router, private processService: ProcessService) {}

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    //this.processService.loadingSource.next(true)
    const location: string = `/${route.path}`
    console.log('canLoad AuthGuard', route.path);

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
    console.log('canActivate AuthGuard', location);
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
    //this.processService.loadingSource.next(false)
    if(location === '/')
      return (response.success) ? this.goNext() : true
    else
      return (!response.success) ? this.goHome() : true;
  }

  goHome(): boolean
  {
    this.router.navigate(['/'])
    return false;
  }

  goNext(): boolean
  {
    this.router.navigate(['/game'])
    return false;
  }
  
}

