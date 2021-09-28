import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from 'src/app/Models';
import { UserService } from '../../../../services/user/user.service';
import { DialogDataComponent } from './components/dialog-data/dialog-data.component';

@Component(
  {
    selector: 'app-customize',
    templateUrl: './customize.component.html',
    styleUrls: ['./customize.component.sass']
  }
)

export class CustomizeComponent implements OnInit, OnDestroy
{
  public errorMsg!: string;
  public loading!: boolean;
  public teams!: Team[];
  public teamForm!: FormGroup;
  public dialogSubscription!: Subscription;

  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialog, private router: Router) { }

  get members(): FormArray
  {
    return this.teamForm.get('members') as FormArray;
  }

  ngOnInit(): void 
  {
    this.loading = true;
    this.teamForm = this.fb.group(
      {
        members: this.fb.array([])
      }
    )
    this.userService
      .getTeams()
        .subscribe(
          teams => 
          {
            this.teams = teams;
            teams.forEach(team => this.addTeam(team))            
            this.loading = false           
          },
          (error: ErrorEvent) =>
          {
            this.loading = false
            this.errorMsg = 'Errore!!!'
          }
        )
  }

  ngOnDestroy(): void
  {
    this.dialogSubscription && this.dialogSubscription.unsubscribe()
  }

  updateTeamsFromInputs(form: any): void
  {
    this.teams.map(
      (team, i) => [...this.teams, team.owner = form[i].owner, team.name = form[i].name]
    )
  }

  addTeam(squadra: any): void
  {
    const team = this.fb.group(
      {
        name: [squadra.name, Validators.required],
        owner: [squadra.owner, Validators.required]
      }
    )
    this.members.push(team)
  }

  handleSubmit(form: any): void
  {
    const dialogRef = this.dialog.open(DialogDataComponent, { data: form.members });

    this.dialogSubscription = dialogRef
      .afterClosed()
        .subscribe(
          result => 
          {
            if(result)
            {
              this.loading = true;
              this.updateTeamsFromInputs(form.members)
              this.userService
                .updateTeams(this.teams)
                  .subscribe(data => 
                    {
                      this.router.navigate([`/asta`])
                      //this.loading = false
                    },
                    (error: ErrorEvent) =>
                    {
                      this.loading = false
                      this.errorMsg = error.error.message
                    }
                  )
            }
          }
        )
  }
}