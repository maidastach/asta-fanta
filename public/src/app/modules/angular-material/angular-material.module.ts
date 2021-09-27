import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';



@NgModule(
  {
    declarations: [],
    imports:
      [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        MatTableModule,
        MatDialogModule,
      ],
    exports: 
      [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatProgressBarModule,
        MatTableModule,
        MatDialogModule,
      ]
  }
)

export class AngularMaterialModule { }
