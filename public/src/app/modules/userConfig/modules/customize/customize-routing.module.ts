import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsResolver } from 'src/app/resolvers/teams.resolver';
import { CustomizeComponent } from './customize.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/game',
    pathMatch: 'full'
  },
  {
    path: ':id', 
    component: CustomizeComponent,
    resolve: { teams: TeamsResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeRoutingModule { }
