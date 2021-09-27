import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CurrentBid, Players, PlayerToAdd } from 'src/app/Models';
import { AstaService } from 'src/app/services/asta/asta.service';
import { ShowPlayerService } from '../show-player/show-player.service';


@Component(
  {
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.sass']
  }
)

export class CountdownComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('cd', { static: false }) private cd: any;

  public isCountdown!: boolean;
  public isCountdownDone!: boolean;
  public startCountDown = setTimeout(() => this.restartCountDown(), 2000)

  public player!: Players;

  public currentBid: CurrentBid = {value: 100, team: 'SSC Miano'};

  public config = 
    {
      leftTime: 4,
      format: 'ss',
      demand: true,
    }

  constructor(private astaService: AstaService) { }

  ngOnInit(): void 
  {
    this.astaService
      .currentPlayer
        .subscribe(
          (player: Players) => this.player = player
        )    

        //subscribe at currentBid
  }

  ngAfterViewInit(): void
  {
    this.startCountDown
  }

  ngOnDestroy(): void 
  {
    clearTimeout(this.startCountDown)
  }

  handleCountDownButton(): void
  {
    this.isCountdown = !this.isCountdown;
    !this.isCountdown ? this.cd.pause() : this.cd.resume()
  }

  restartCountDown(): void
  {
    clearTimeout(this.startCountDown)
    this.isCountdownDone = false;
    this.cd.restart();
    this.cd.begin();
    this.isCountdown = true;
  }

/// LOGIC TO ADD PLAYER TO THE TEAM OR DISCARD HIM AFTER COUNTDWN IS OVER
  handleCountDownEvent(event: any)
  {      
    if(event.action === 'done')
    {
      this.isCountdownDone = true;
      if(!this.currentBid) //IF NO OFFER
      {
        if(confirm(`Scartare ${this.player.name}`))
          this.astaService.discardPlayer()
        else
          this.restartCountDown()
      }
      else  //IF OFFER
      {
        if(confirm(`Aggiungere ${this.player.name} a ${this.currentBid.team}`))
          this.astaService.assignPlayer()
        else
          this.restartCountDown()
      }
    }
  }

}
