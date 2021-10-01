import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { League, LeagueResponse } from "../Models";
import { UserService } from "../services/user/user.service";

@Injectable({ providedIn: 'root' })

export class LeagueResolver implements Resolve<League>
{
    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<League> | Promise<League> | League
    {
        console.log('Single League Resolver', route.params);
        const id = route.params?.id
        
        return this.userService
          .getLeague(id)
            .pipe(
                map(
                    (res: LeagueResponse) => res.response
                )
            )
    }
}