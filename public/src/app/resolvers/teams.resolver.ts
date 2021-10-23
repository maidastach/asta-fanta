import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Team, TeamsResponse } from "../Models";
import { ProcessService } from "../services/processing/process.service";
import { UserService } from "../services/user/user.service";

@Injectable({ providedIn: 'root' })

export class TeamsResolver implements Resolve<Team[]>
{
    constructor(private userService: UserService, private processService: ProcessService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Team[]> | Promise<Team[]> | Team[]
    {
        console.log('Teams Resolver');
        const id = route.params?.id
        
        return this.userService
          .getTeamsByLeagueId(id)
            .pipe(
                map(
                    (res: TeamsResponse) =>
                    {
                        //this.processService.setLoading(false)
                        return res.response
                    } 
                )
            )
    }
}