import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogconfirmacion',
  templateUrl: './dialogconfirmacion.component.html',
  styleUrls: ['./dialogconfirmacion.component.css']
})
export class DialogconfirmacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogconfirmacionComponent>, @Inject(MAT_DIALOG_DATA)
  public mensaje) { }

  ngOnInit(): void {
  }

  eliminar(){
    this.dialogRef.close(true);
  }

  cancelar(){
    this.dialogRef.close(false);
  }


}
