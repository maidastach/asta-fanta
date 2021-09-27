import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadgameComponent } from './loadgame.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoadgameComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadgameRoutingModule { }
