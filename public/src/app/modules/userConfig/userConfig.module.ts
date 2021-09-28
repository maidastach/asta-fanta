import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserConfigComponent } from './userConfig.component';

import { UserConfigRoutingModule } from './userConfig-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule(
  {
    declarations:
    [
      UserConfigComponent,
    ],
    imports:
    [
      CommonModule,
      UserConfigRoutingModule,
      AngularMaterialModule,
      ReactiveFormsModule
    ],
    providers: [HasGameGuard]
  }
)
export class UserConfigModule { }
