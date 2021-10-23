import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { League } from 'src/app/Models';

@Component({
  selector: 'dialog-data',
  templateUrl: 'dialog-data.component.html',
  styleUrls: ['dialog-data.component.sass']
})

export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: League[]) { }

  displayedColumns: string[] = ['Gioc. Min', 'Gioc. Max', 'N. Squadre', 'Crediti', 'Gioco', 'Chiamata'];
}