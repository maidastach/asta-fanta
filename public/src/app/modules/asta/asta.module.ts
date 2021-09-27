import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AstaRoutingModule } from './asta-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CountdownModule } from 'ngx-countdown';

import { AstaComponent } from './asta.component';

import { ShowPlayerService } from './components/show-player/show-player.service';
import { ShowPlayerComponent } from './components/show-player/show-player.component';
import { BidComponent } from './components/bid/bid.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { InAstaComponent } from './components/in-asta/in-asta.component';
import { PreviewTeamsComponent } from './components/preview-teams/preview-teams.component';
import { PickPlayerComponent } from './components/pick-player/pick-player.component';
import { StartRandomComponent } from './components/start-random/start-random.component';
import { SingleTeamComponent } from './components/preview-teams/single-team/single-team.component';
import { AstaService } from 'src/app/services/asta/asta.service';
import { AuthGuard } from 'src/app/guards/auth/auth.guard';


@NgModule(
  {
    declarations: 
      [
        AstaComponent,
        ShowPlayerComponent,
        BidComponent,
        CountdownComponent,
        InAstaComponent,
        PreviewTeamsComponent,
        PickPlayerComponent,
        StartRandomComponent,
        SingleTeamComponent,
      ],
    imports: 
      [
        CommonModule,
        AstaRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        CountdownModule,
      ],
    providers: 
      [
        AstaService,
        ShowPlayerService,
        AuthGuard
      ],
    exports: 
      [
        AstaComponent,
      ],
  }
)
export class AstaModule { }
