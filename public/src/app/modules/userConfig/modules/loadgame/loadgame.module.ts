import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadgameRoutingModule } from './loadgame-routing.module';
import { LoadgameComponent } from './loadgame.component';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';


@NgModule({
  declarations: [
    LoadgameComponent
  ],
  imports: [
    CommonModule,
    LoadgameRoutingModule
  ],
  providers:[HasGameGuard]
})
export class LoadgameModule { }
