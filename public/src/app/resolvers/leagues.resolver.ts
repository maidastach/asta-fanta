import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { League, LeaguesResponse } from "../Models";
import { ProcessService } from "../services/processing/process.service";
import { UserService } from "../services/user/user.service";

@Injectable({ providedIn: 'root' })

export class LeaguesResolver implements Resolve<League[]>
{
    constructor(private userService: UserService, private processService: ProcessService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<League[]> | Promise<League[]> | League[]
    {
        console.log('Resolver');
        
        return this.userService
          .getAdminLeagues()
            .pipe(
                map(
                    (res: LeaguesResponse) =>
                    {
                        //this.processService.setLoading(false)
                        return res.response
                    } 
                )
            )
    }
}