import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void
  {
    this.userService
      .getAllLeagues()
        .subscribe(
          (res: LeaguesResponse) => this.leagues = res.response
        )
  }


}
