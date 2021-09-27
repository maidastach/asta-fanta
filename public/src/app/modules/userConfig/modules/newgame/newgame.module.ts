import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewgameRoutingModule } from './newgame-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { PreferencesComponent } from './components/preferences/preferences.component';

import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataComponent } from './components/dialog-data/dialog-data.component';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';


@NgModule({
  declarations: [
    PreferencesComponent,
    DialogDataComponent,
  ],
  imports: [
    CommonModule,
    NewgameRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule,
    MatDialogModule,
  ],
  providers: [AuthGuard]
})
export class NewgameModule { }
