import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadgameRoutingModule } from './loadgame-routing.module';
import { LoadgameComponent } from './loadgame.component';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataComponent } from './components/dialog-data/dialog-data.component';


@NgModule({
  declarations: [
    LoadgameComponent,
    DialogDataComponent
  ],
  imports: [
    CommonModule,
    LoadgameRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,

  ],
  providers:[HasGameGuard]
})
export class LoadgameModule { }
