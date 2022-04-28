import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LecturaService } from 'src/app/services/lecturas/lectura.service';

@Component({
  selector: 'app-dialoglecturascreate',
  templateUrl: './dialoglecturascreate.component.html',
  styleUrls: ['./dialoglecturascreate.component.css']
})
export class DialoglecturascreateComponent implements OnInit {

  lecturanueva: any;
  lecturaact: string = '';
  fecha: any;

  constructor(public dialogRef: MatDialogRef<DialoglecturascreateComponent>, @Inject(MAT_DIALOG_DATA)
  public lectura: any,
  private toastr: ToastrService,
  private _lectura: LecturaService) { }

  ngOnInit(): void {
    console.log(this.lectura);
    this.lecturanueva = {
      apellidos_cli: '',
      ciruc_cli: '',
      consumo_lec: 0,
      create_at: '',
      direccion_cli: '',
      email_cli: '',
      fechalecact_lec: '',
      fechalecant_lec: '',
      foto_lec: '',
      id_cli: '',
      id_lec: '',
      id_med: '',
      lecturaact_lec: '',
      lecturaant_lec: '',
      nombres_cli: '',
      telefono_cli: ''
    };
    this.lecturaact = '';
  }

  guardarLectura(){
    
    if(this.lecturaact < this.lectura.lecturaact_lec){
      this.toastError("Debe ingresar la lectura nueva para continuar");
    }else{

      this.fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

      let consumo = parseInt(this.lecturaact) - parseInt(this.lectura.lecturaact_lec);

      this.lecturanueva.id_med = this.lectura.id_cli;
      this.lecturanueva.consumo_lec = consumo;
      this.lecturanueva.lecturaact_lec = this.lecturaact;
      this.lecturanueva.fechalecact_lec = this.fecha;
      this.lecturanueva.lecturaant_lec = this.lectura.lecturaact_lec;
      this.lecturanueva.fechalecant_lec = this.lectura.fechalecact_lec;
      this.lecturanueva.foto_lec = '0';
      
      this._lectura.createLectura(this.lecturanueva).subscribe(res=>{

        if(res){
          this.toastSuccess("Lectura registrada!!!");
          this.dialogRef.close(this.lecturanueva.id_cli)
        }else{
          this.toastError("Ups, tenemos problemas para registrar la lectura,intentalo nuevamente más tarde");
          this.dialogRef.close(this.lecturanueva.id_cli)
        }

      });
    }

  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4500,
    });
  }


}
