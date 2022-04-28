import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultaService } from 'src/app/services/multa/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmultacobrar',
  templateUrl: './dialogmultacobrar.component.html',
  styleUrls: ['./dialogmultacobrar.component.css']
})
export class DialogmultacobrarComponent implements OnInit {

  multaconexionCobrar: any;
  fecha: any;
  valorrecibido: string = '';

  constructor(public dialogRef: MatDialogRef<DialogmultacobrarComponent>, @Inject(MAT_DIALOG_DATA)
  public multaconexion: any,
    private _multaconexion: MultaService) { }

  ngOnInit(): void {

    this.multaconexionCobrar = this.multaconexion;

    this.fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  }

  guardarCambios() {
    if (this.valorrecibido == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el valor a cobrar antes de continuar'
      });
    } else if (this.valorrecibido > this.multaconexionCobrar.valor_mul) {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El valor recibido no puede ser mayor al valor original'
      });

    } else {
      if (this.multaconexionCobrar.saldo_mul == this.valorrecibido) {

        // Pago total de la deuda        
        this.multaconexionCobrar.saldo_mul = 0;
        this.multaconexionCobrar.fechapago = this.fecha;
        this.multaconexionCobrar.cancelada_mul = 'SI';
        this.multaconexionCobrar.valorpagado_mul = this.valorrecibido;
        
        this._multaconexion.updateCobro(this.multaconexionCobrar).subscribe(res => {
          
          if (res) {
            this.dialogRef.close(true);
          }
        });
        
      } else {

        // pago con saldo

        let saldo = parseFloat(this.multaconexionCobrar.saldo_mul) - parseFloat(this.valorrecibido);
        this.multaconexionCobrar.saldo_mul = saldo;
        this.multaconexionCobrar.fechapago = this.fecha;
        this.multaconexionCobrar.cancelada_mul = 'NO';
        this.multaconexionCobrar.valorpagado_mul = this.valorrecibido;

        this._multaconexion.updateCobro(this.multaconexionCobrar).subscribe(res=>{
          
          if(res){
            this.dialogRef.close(true);
          }

        });

      }
    }
  }

}
