import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { League, LeagueResponse } from 'src/app/Models';
import { ProcessService } from 'src/app/services/processing/process.service';
import { UserService } from 'src/app/services/user/user.service';
import { DialogDataComponent } from './components/dialog-data/dialog-data.component';

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
  public leagueForm!: FormGroup;
  public isEditMode: boolean = false;
  public dialogSubscription!: Subscription;

  constructor(private userService: UserService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private processService: ProcessService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void
  {
    setTimeout(() => this.processService.setLoading(false), 1)

    this.league = this.activatedRoute.snapshot.data['league']

    this.leagueForm = this.fb.group(
      {
        name: [ this.league.config.name, Validators.required ],
        playersMin: [ this.league.config.playersMin, [ Validators.min(18), Validators.required ] ],
        playersMax: [ this.league.config.playersMax, Validators.required ],
        //teamsNumber:[ this.league.config.teamsNumber, [ Validators.min(2), Validators.required ] ],
        isMantra: [ this.league.config.isMantra, Validators.required ],
        isRandom: [ this.league.config.isRandom, Validators.required ],
        //credits: [ this.league.config.credits, Validators.required ],
      }
    )

  }

  handleSubmit(config: League['config']): void
  {
    //this.userService.updateLeagueConfig('a', config).subscribe()
    const dialogRef = this.dialog.open(DialogDataComponent, { data: [{...config, teamsNumber: this.league.config.teamsNumber, credits: this.league.config.credits}] });

    this.dialogSubscription =
      dialogRef
        .afterClosed()
          .subscribe(
            result => 
            {
              if(result)
              {
                //this.loading = true;
                this.userService
                  .updateLeagueConfig(this.league._id, config)
                    .subscribe(
                      (response: LeagueResponse) =>
                      {
                        //this.loading = false
                        this.leagueForm.reset();
                        this.router.navigate([`/game/customize/${response.response._id}`])
                      },
                      (error: ErrorEvent) => 
                      {
                        //this.loading = false;
                        //this.errorMsg = error.error.message
                        console.log(error);
                      }
                    )
                //this.loading = false
              }
            }
          )
    
  }

  goToCustomize(): void
  {
   this.router.navigate([`game/customize/${this.league._id}`])
  }

  handleEditMode(): void
  {
    this.isEditMode = !this.isEditMode
  }

}
