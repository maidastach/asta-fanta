import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamForm } from 'src/app/Models';

@Component({
  selector: 'dialog-data',
  templateUrl: 'dialog-data.component.html',
  styleUrls: ['dialog-data.component.sass']
})

export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  displayedColumns: string[] = ['position', 'Giocatore', 'Squadra'];
  dataSource = this.data;
}