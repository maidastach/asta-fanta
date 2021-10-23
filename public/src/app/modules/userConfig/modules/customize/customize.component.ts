import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LeagueResponse, Team } from 'src/app/Models';
import { ProcessService } from 'src/app/services/processing/process.service';
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

  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router, private processService: ProcessService) { }

  get members(): FormArray
  {
    return this.teamForm.get('members') as FormArray;
  }

  ngOnInit(): void 
  {
    this.teams = this.activatedRoute.snapshot.data['teams']
    setTimeout(() => this.processService.setLoading(false), 1)
    //this.loading = true;
    this.teamForm = this.fb.group(
      {
        members: this.fb.array([]),
        credits: [ this.teams[0].creditTot, Validators.required ],
      }
    )
   
    this.teams.forEach(team => this.addTeam(team.name, team.owner.name, team._id))            

  }

  ngOnDestroy(): void
  {
    this.dialogSubscription && this.dialogSubscription.unsubscribe()
  }

  updateTeamsFromInputs(form: any): void
  {
    this.teams.map(
      (team, i) => [...this.teams, team.owner.name = form[i].owner, team.name = form[i].name]
    )
  }

  addTeam(
    name = `Squadra ${this.members.controls.length + 1}`, 
    owner = `Giocatore ${this.members.controls.length + 1}`, 
    id = (this.members.controls.length + 1).toString()
  ): void
  {
    const team = this.fb.group(
      {
        name: [name, Validators.required],
        owner: [owner, Validators.required],
        id: [id]
      }
    )
    this.members.push(team)
  }

  deleteTeam(id: string, i: number): void
  {
    if(confirm('Are you sure you want to dele this team?'))
    {
      if(id.length > 5)
        this.userService.deleteTeamFromConfig(id).subscribe(res => this.members.removeAt(i))
      else
        this.members.removeAt(i)
    }

  }

  handleSubmit(form: any): void
  {
    const dialogRef = this.dialog.open(DialogDataComponent, { data: form.members });
    const id = this.activatedRoute.snapshot.params.id;
    const newTeams = () => 
    {
       if(form.members.length > this.teams.length)
      {
        const difference = this.teams.length - form.members.length
        return form.members.slice(difference)
      }
      return null    
    }    

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
                .updateTeamsOwnership(id, { teams: this.teams, newTeams: newTeams(), credits: form.credits })
                  .subscribe(
                    (res: LeagueResponse) => 
                    {
                      this.router.navigate([`/asta/${res.response._id}`])
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