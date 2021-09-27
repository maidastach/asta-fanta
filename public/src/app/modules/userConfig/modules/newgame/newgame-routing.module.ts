import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { PreferencesComponent } from './components/preferences/preferences.component';

const routes: Routes = [
  { 
    path: '', 
    component: PreferencesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewgameRoutingModule { }
