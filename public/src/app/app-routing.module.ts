import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = 
[
  {
    path: '',
    loadChildren: () => import('./modules/auth/home.module').then(m => m.HomeModule), //homeModule
    canLoad: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'game',
    loadChildren: () => import('./modules/userConfig/userConfig.module').then(m => m.UserConfigModule), //userConfigModule
    canLoad: [AuthGuard],
  },
  {
    path: 'asta',
    loadChildren: () => import('./modules/asta/asta.module').then(m => m.AstaModule),
    canLoad: [AuthGuard],
  }
];

@NgModule(
  {
    imports: 
      [
        RouterModule.forRoot(routes)
      ],
    exports: 
      [
        RouterModule
      ]
  }
)

export class AppRoutingModule { }
