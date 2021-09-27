import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomizeRoutingModule } from './customize-routing.module';
import { CustomizeComponent } from './customize.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogDataComponent } from './components/dialog-data/dialog-data.component';

import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';
import { AngularMaterialModule } from 'src/app/modules/angular-material/angular-material.module';

@NgModule({
  declarations: [
    CustomizeComponent,
    DialogDataComponent,
  ],
  imports: [
    CommonModule,
    CustomizeRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,

    AngularMaterialModule
  ],
  providers: [HasGameGuard]
})
export class CustomizeModule { }
