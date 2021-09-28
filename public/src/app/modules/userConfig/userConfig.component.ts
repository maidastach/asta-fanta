import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaguesResponse, League } from 'src/app/Models';
import { UserService } from 'src/app/services/user/user.service';


@Component(
  {
    selector: 'app-user-config',
    templateUrl: './userConfig.component.html',
    styleUrls: ['./userConfig.component.sass']
  }
)

export class UserConfigComponent implements OnInit
{
  public leagues!: League[];
  public league!: League;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void
  {
    this.userService
      .getMyLeagues()
        .subscribe(
          (res: LeaguesResponse) => this.leagues = res.response
        )
  }

  setLeagueValue(event: any): void
  {
    this.league = event.value
  }

  loadGame(): void
  {
    this.router.navigate([`/game/load-game/${this.league._id}`])
  }

}
