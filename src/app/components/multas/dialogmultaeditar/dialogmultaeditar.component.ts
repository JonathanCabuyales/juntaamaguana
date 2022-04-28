import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultaService } from 'src/app/services/multa/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmultaeditar',
  templateUrl: './dialogmultaeditar.component.html',
  styleUrls: ['./dialogmultaeditar.component.css']
})
export class DialogmultaeditarComponent implements OnInit {

  multaconexionedit: any;

  constructor(public dialogRef: MatDialogRef<DialogmultaeditarComponent>, @Inject(MAT_DIALOG_DATA)
  public multaconexion: any,
  private _multaconexion: MultaService) { }

  ngOnInit(): void {

    this.multaconexionedit = this.multaconexion;
    
  }

  guardarCambios(){
    
    if(this.multaconexionedit.descripcion_mul == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'La descripción no puede estar vacia.'
      });
    }else{

      this._multaconexion.updateMultaConexion(this.multaconexionedit).subscribe(res=>{
        if(res){
          this.dialogRef.close(true);
        }
      });
      
    }
  }

}
