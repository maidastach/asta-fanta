import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { AstaComponent } from './asta.component';

const routes: Routes = 
[
  {
    path: ':id',
    component: AstaComponent,
  }
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

export class AstaRoutingModule { }
