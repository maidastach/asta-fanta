import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { CustomizeComponent } from './customize.component';

const routes: Routes = [
  { 
    path: '', 
    component: CustomizeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeRoutingModule { }
