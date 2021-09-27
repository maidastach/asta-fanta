import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ConfigForm, Team } from 'src/app/Models';
import { AstaService } from 'src/app/services/asta/asta.service';

@Component(
  {
    selector: 'app-preview-teams',
    templateUrl: './preview-teams.component.html',
    styleUrls: ['./preview-teams.component.sass']
  }
)

export class PreviewTeamsComponent implements OnInit
{
  public teams!: Team[];
  constructor(private astaService: AstaService) { }

  ngOnInit(): void 
  {
    // this.astaService.config
    // .pipe( map((config: ConfigForm) => config.teams) )
    //   .subscribe(teams => this.teams = teams);
  }

}


/* 
subscribe to teams
ngfor teams to render single team

*/