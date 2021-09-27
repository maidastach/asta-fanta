import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { HasGameGuard } from 'src/app/guards/game/has-game.guard';
import { UserConfigComponent } from './userConfig.component';

const routes: Routes = 
[
  {
    path: '', // '/game' route
    component: UserConfigComponent,
  },
  {
    path: 'new-game',
    loadChildren: () => import('./modules/newgame/newgame.module').then(m => m.NewgameModule),
  },
  { 
    path: 'load-game', 
    loadChildren: () => import('./modules/loadgame/loadgame.module').then(m => m.LoadgameModule),
    canLoad: [HasGameGuard]
  },
  { 
    path: 'customize', 
    loadChildren: () => import('./modules/customize/customize.module').then(m => m.CustomizeModule),
    canLoad: [HasGameGuard]
  },
]

@NgModule(
  {
    imports: 
      [
        RouterModule.forChild(routes)
      ],
    exports: 
      [
        RouterModule
      ]
  }
)

export class UserConfigRoutingModule { }
