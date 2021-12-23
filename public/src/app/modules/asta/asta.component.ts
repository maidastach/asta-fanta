import { Component, OnInit } from '@angular/core';
import { AstaService } from 'src/app/services/asta/asta.service';
import { ProcessService } from 'src/app/services/processing/process.service';
import { ConfigForm, Players } from '../../Models';

@Component(
  {
    selector: 'app-asta',
    templateUrl: './asta.component.html',
    styleUrls: ['./asta.component.sass']
  }
)

export class AstaComponent implements OnInit
{

  constructor(private astaService: AstaService, private processService: ProcessService) { }

  public players!: Players[];
  public player!: Players;
  public isAstaStarted!: boolean;
  public game!: string;
  public isRandom!: boolean;

  public loading: boolean = true;
  public errorMsg!: string;
  public successMsg!: string;


  ngOnInit(): void 
  {
    setTimeout(() => this.processService.setLoading(false), 1)
    // this.astaService.config
    //   .subscribe(
    //     (league: ConfigForm) =>
    //     {
    //       this.game = config.league?.game
    //       this.isRandom = config.league?.isRandom
    //     }
    //   )
    this.astaService.players.subscribe((players: Players[]) => this.players = players)
    this.astaService.currentPlayer.subscribe((player: Players) => this.player = player)
    this.astaService.isAstaStarted.subscribe((isAstaStarted: boolean) => this.isAstaStarted = isAstaStarted)

    this.astaService.loading.subscribe((loading: boolean) => this.loading = loading)
    this.astaService.errorMsg.subscribe((errorMsg: string) => this.errorMsg = errorMsg)
    this.astaService.successMsg.subscribe((successMsg: string) => this.successMsg = successMsg)
  }
}
