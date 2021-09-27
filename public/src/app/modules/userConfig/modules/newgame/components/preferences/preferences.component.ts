import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { League, Team } from 'src/app/Models';
import { UserService } from 'src/app/services/user/user.service';
import { DialogDataComponent } from '../dialog-data/dialog-data.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component(
  {
    selector: 'app-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.sass']
  }
)

export class PreferencesComponent implements OnInit, OnDestroy
{
  public games: string[] = ['Mantra', 'Classic'];
  public config: boolean = true;
  public loading!: boolean;
  public errorMsg!: string;
  public dialogSubscription!: Subscription;

  public leagueForm!: FormGroup; 

  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void
  {
    this.loading = true
    this.leagueForm = this.fb.group(
      {
        name: ['', Validators.required],
        playersMin: [25, Validators.required],
        playersMax: [30, Validators.required],
        teamsNumber:['', [Validators.min(2), Validators.required]],
        game: ['', Validators.required],
        isRandom: [null, Validators.required],
        credits: ['', Validators.required],
      }
    )
    this.loading = false;


    // this.userService
    //   .getLeague()
    //     .subscribe(
    //       (response: HttpResponse) =>
    //       {
    //         if(response.success)
    //         {
    //           const league = response.response;
    //           this.leagueForm = this.fb.group(
    //             {
    //               name: [league?.name, Validators.required],
    //               playersMin: [league?.playersMin, Validators.required],
    //               playersMax: [league?.playersMax, Validators.required],
    //               teamsNumber:[league?.teamsNumber, [Validators.min(2), Validators.required]],
    //               game: [league?.game, Validators.required],
    //               isRandom: [league?.isRandom, Validators.required],
    //               credits: [league?.credits, Validators.required],
    //             }
    //           )
    //           this.loading = false;
    //         }
    //         else
    //         {
    //           this.leagueForm = this.fb.group(
    //             {
    //               name: ['', Validators.required],
    //               playersMin: [25, Validators.required],
    //               playersMax: [30, Validators.required],
    //               teamsNumber:['', [Validators.min(2), Validators.required]],
    //               game: ['', Validators.required],
    //               isRandom: [null, Validators.required],
    //               credits: ['', Validators.required],
    //             }
    //           )
    //           this.loading = false;
    //         }
    //       },
    //       (error: ErrorEvent) => 
    //       {
    //         if(error.error.message === 'Unauthorized access')
    //           this.router.navigate(['/'])
    //         else
    //         {
    //           this.errorMsg = error.error.message
    //           this.loading = false
    //         }
    //       }
    //     )
  }

  ngOnDestroy(): void
  {
    this.dialogSubscription && this.dialogSubscription.unsubscribe()
  }

  handleSubmit(league: League): void
  {
    const dialogRef = this.dialog.open(DialogDataComponent, { data: [league] });

    this.dialogSubscription =
      dialogRef
        .afterClosed()
          .subscribe(
            result => 
            {
              if(result)
              {
                this.loading = true;
                this.userService
                  .setLeague(league)
                    .subscribe(
                      () =>
                      {
                        this.loading = false
                        this.leagueForm.reset();
                        this.router.navigate(['/game/customize'])
                      },
                      (error: ErrorEvent) => 
                      {
                        this.loading = false;
                        this.errorMsg = error.error.message
                        console.log(error);
                      }
                    )
                this.loading = false
              }
            }
          )
  }

  generateTeam(): Team[]
  {
    const league: League = this.leagueForm.value
    const game: string = league.game
    const teamsNumber: number = league.teamsNumber
    const credits: number = league.credits
    
    let teams: Team[] = [];

    for(let i = 0; i < teamsNumber; i++)
    {
      teams = 
      [
        ...teams, 
        {
            owner: `Giocatore ${i+1}`,
            name: `Squadra ${i+1}`,
            players: 
              (game === 'Mantra')
                ? {
                    goalkeepers: [],
                    defenders: { dc: [], dd: [], ds: [], e: [] },
                    midfielders: { m: [], c: [], tc: [] },
                    strikers: { w: [], a: [], pc: [] },
                  } 
                : {
                    goalkeepers: [],
                    defenders: [],
                    midfielders: [],
                    strikers: [],
                  },
            creditTot: credits,
            creditLeft: credits
        }
      ]
    }
    return teams
  }

}

