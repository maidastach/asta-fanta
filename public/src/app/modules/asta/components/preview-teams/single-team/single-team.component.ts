import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerToAdd, Team } from 'src/app/Models';

export interface SortedTeams
{
  portieri: PlayerToAdd[];
  terzini: PlayerToAdd[];
  difensori: PlayerToAdd[];
  esterni: PlayerToAdd[];
  mediani: PlayerToAdd[];
  centrocampisti: PlayerToAdd[];
  trequartisti: PlayerToAdd[];
  ali: PlayerToAdd[];
  ataccanti: PlayerToAdd[];
  punte: PlayerToAdd[];
}


@Component({
  selector: 'app-single-team',
  templateUrl: './single-team.component.html',
  styleUrls: ['./single-team.component.sass']
})
export class SingleTeamComponent implements OnInit 
{
  @Input() team!: Team;
  public playersInGroup!: any;
  public sortedTeams!: SortedTeams[];
  public players: PlayerToAdd[] = [];
  displayedColumns: string[] = ['Ruolo', 'Nome', 'Pagato', 'Azioni']
  dataSource = new MatTableDataSource(this.players);

  constructor() { }

  ngOnInit(): void 
  {
    // this.players = [...this.team.goalkeepers, ...this.team.defenders, ...this.team.midfielders, ...this.team.offensives, ...this.team.strikers]
    this.dataSource = new MatTableDataSource(this.players);
  }

  // groupPlayers(teams: Team[])
  // {
  //   return teams.map(
  //     team => 
  //     {
  //       let players: any = []
  //       team.goalkeepers.forEach(pl => players.push(pl))
  //       team.defenders.forEach(pl => players.push(pl))
  //       team.midfielders.forEach(pl => players.push(pl))
  //       team.offensives.forEach(pl => players.push(pl))
  //       team.strikers.forEach(pl => players.push(pl))
  //       return players
  //     }
  //   )
  // }

  handleDelete(a: any)
  {
    console.log(a);
    
  }

}
