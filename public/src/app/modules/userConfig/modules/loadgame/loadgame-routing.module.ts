import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueResolver } from 'src/app/resolvers/league.resolver';
import { LoadgameComponent } from './loadgame.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
  {
    path: ':id', 
    component: LoadgameComponent,
    resolve: { league: LeagueResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadgameRoutingModule { }
