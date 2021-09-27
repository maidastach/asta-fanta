import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'dialog-data',
  templateUrl: 'dialog-data.component.html',
  styleUrls: ['dialog-data.component.sass']
})

export class DialogDataComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}