import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { League } from 'src/app/Models';
import { ProcessService } from 'src/app/services/processing/process.service';
import { UserService } from 'src/app/services/user/user.service';

@Component(
  {
    selector: 'app-loadgame',
    templateUrl: './loadgame.component.html',
    styleUrls: ['./loadgame.component.sass']
  }
)

export class LoadgameComponent implements OnInit
{
  public league!: League;
  constructor(private activatedRoute: ActivatedRoute, private processService: ProcessService) { }

  ngOnInit(): void
  {
    setTimeout(() => this.processService.setLoading(false), 1)

    this.league = this.activatedRoute.snapshot.data['league']

  }

}
