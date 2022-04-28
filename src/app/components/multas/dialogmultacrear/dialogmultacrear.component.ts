import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MultaconexionI } from 'src/app/models/multasconexion/multaconexion.interface';
import { MultaService } from 'src/app/services/multa/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmultacrear',
  templateUrl: './dialogmultacrear.component.html',
  styleUrls: ['./dialogmultacrear.component.css']
})
export class DialogmultacrearComponent implements OnInit {

  multaconexionnueva: MultaconexionI;

  constructor(public dialogRef: MatDialogRef<DialogmultacrearComponent>, @Inject(MAT_DIALOG_DATA)
  private _multaco: MultaService) {
  }

  ngOnInit(): void {
    
    this.multaconexionnueva = {
      id_cli: '',
      tipo_mul: '0',
      descripcion_mul: '',
      valor_mul: '',
      saldo_mul: '',
      cancelada_mul: '',
      fechapago: '',
      valorpagado_mul: ''
    }
  }

  guardar() {

    if(this.multaconexionnueva.id_cli == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de socio para continuar'
      });
    }else if(this.multaconexionnueva.descripcion_mul == ''){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la descripción del registro para continuar'
      });
    }else if(this.multaconexionnueva.valor_mul == ''){

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el valor'
      });

    }else if(this.multaconexionnueva.valor_mul <= '0'){

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El valor del registro no puede ser 0 o menor a este.'
      });

    }else if(this.multaconexionnueva.tipo_mul == '0'){
      
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar el tipo de registro para continuar'
      });

    }else{

      this.multaconexionnueva.fechapago = '';
      this.multaconexionnueva.cancelada_mul = 'NO';
      this.multaconexionnueva.saldo_mul = this.multaconexionnueva.valor_mul;
      this.multaconexionnueva.valorpagado_mul = '0';

      this.dialogRef.close(this.multaconexionnueva);

    }

  }

}
