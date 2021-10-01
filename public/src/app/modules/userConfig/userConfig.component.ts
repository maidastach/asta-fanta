import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaguesResponse, League } from 'src/app/Models';
import { ProcessService } from 'src/app/services/processing/process.service';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private processService: ProcessService) { }

  ngOnInit(): void
  {
    this.leagues = this.activatedRoute.snapshot.data['leagues']
    setTimeout(() => this.processService.setLoading(false), 1)
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
