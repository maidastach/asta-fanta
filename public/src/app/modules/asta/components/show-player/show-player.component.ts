import { Component, Input, OnInit } from '@angular/core';
import { Players } from 'src/app/Models';
import { AstaService } from 'src/app/services/asta/asta.service';

@Component(
  {
    selector: 'app-show-player',
    templateUrl: './show-player.component.html',
    styleUrls: ['./show-player.component.sass']
  }
)

export class ShowPlayerComponent implements OnInit 
{
  @Input() game!: string;
  @Input() isRandom!: boolean;
  public player!: Players;
 // public players!: Players[];
  // public remainingPlayers!: Players[];
  // public discardedPlayers!: Players[];

  constructor(private astaService: AstaService) { }

  ngOnInit(): void 
  {
    this.astaService.currentPlayer.subscribe(player => this.player = player)
    //this.astaService.
    // this.astaService
    //   .getAstaPlayer()
    //     .subscribe(
    //       (player: Players) => 
    //       {
    //         if(!player)
    //         {
    //           this.astaService
    //           .getPlayers()
    //             .subscribe(
    //               (players: Players[]) => 
    //               {
    //                 this.players = players;
    //                 //this.astaService.setLoading(false)
    //                 this.loading = false;
    //               },
    //               (error: ErrorEvent) => 
    //               {
    //                 //this.astaService.setErroMsg('Error Loading Players')
    //                 this.errorMsg = 'Error Loading Players';
    //                 //this.astaService.setLoading(false)
    //                 this.loading = false;
    //               }
    //             );
    //         }
    //         else
    //         {
    //           this.player = player;
    //           this.astaService.setPlayerForAsta(player)
    //           //this.astaService.setLoading(false)
    //           this.loading = false;
    //         }
    //       }
    //     )

    //this.astaService.players.subscribe(players => this.players = players)
    // this.astaService.remainingPlayers.subscribe(players => this.remainingPlayers = players)
    // this.astaService.discardedPlayers.subscribe(players => this.discardedPlayers = players)
  }

  changeRandom(): void
  {
    this.astaService.setLoading(true)
    const actual = this.astaService.configSource.value
    this.astaService.configSource.next({...actual, league: {... actual.league, isRandom: !this.isRandom}})
    this.astaService
      .resetPlayerForAsta()
        .subscribe(
          data => 
          { 
            this.astaService.setPlayerForAsta('')
            this.astaService.setLoading(false)
            this.astaService.configSource.value.league.isRandom && this.astaService.randomCall()
          },
          (error: ErrorEvent) => 
          {
            this.astaService.setErroMsg('Error Setting Players')
            this.astaService.setLoading(false)
            console.log(error, 'in changing mode call show player  component');
            throw new Error(error.message)
          }
        );
  }

}
