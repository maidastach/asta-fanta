import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserConfigComponent } from './userConfig.component';

import { UserConfigRoutingModule } from './userConfig-routing.module';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';


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
    ],
    providers: [HasGameGuard]
  }
)
export class UserConfigModule { }
