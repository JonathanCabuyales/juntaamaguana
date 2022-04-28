import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteI } from 'src/app/models/cliente.interface';
import Swal from 'sweetalert2';
import { DialogProSerComponent } from '../../productosservicios/dialog-pro-ser/dialog-pro-ser.component';

@Component({
  selector: 'app-dialogclientes',
  templateUrl: './dialogclientes.component.html',
  styleUrls: ['./dialogclientes.component.css']
})
export class DialogclientesComponent implements OnInit {

  cliente: ClienteI;

  // variable para verificar cedula ecuatoriana
  public validador: boolean = true;

  constructor(public dialogRef: MatDialogRef<DialogProSerComponent>, @Inject(MAT_DIALOG_DATA)
  public clienteUpdate: ClienteI) { }

  ngOnInit() {
    this.cliente = {
      id_cli: 0,
      nombres_cli: '',
      apellidos_cli: '',
      ciruc_cli: '',
      direccion_cli: '0',
      telefono_cli: '',
      email_cli: '',
      created_at: new Date()
    }

    if (this.clienteUpdate == null) {
      this.clienteUpdate = {
        id_cli: 0,
        nombres_cli: '',
        apellidos_cli: '',
        ciruc_cli: '',
        direccion_cli: '',
        telefono_cli: '',
        email_cli: '',
        created_at: new Date()
      }
    } else {
      this.cliente = this.clienteUpdate;
    }

  }

  validadorDeCedula(cedula: String) {
    let cedulaCorrecta = false;
    if (cedula.length == 10) {
      let tercerDigito = parseInt(cedula.substring(2, 3));
      if (tercerDigito < 6) {
        // El ultimo digito se lo considera dígito verificador
        let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let verificador = parseInt(cedula.substring(9, 10));
        let suma: number = 0;
        let digito: number = 0;
        for (let i = 0; i < (cedula.length - 1); i++) {
          digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
          suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
          //      console.log(suma+" suma"+coefValCedula[i]); 
        }
        suma = Math.round(suma);
        //  console.log(verificador);
        //  console.log(suma);
        //  console.log(digito);
        if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
          cedulaCorrecta = true;
        } else if ((10 - (Math.round(suma % 10))) == verificador) {
          cedulaCorrecta = true;
        } else {
          cedulaCorrecta = false;
        }
      } else {
        cedulaCorrecta = false;
      }
    } else {
      cedulaCorrecta = false;
    }
    this.validador = cedulaCorrecta;
    return this.validador;

  }


  guardar() {

    if (this.cliente.nombres_cli == '' || this.cliente.nombres_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar los nombres del cliente'
      });
    } else if (this.cliente.apellidos_cli == '' || this.cliente.apellidos_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar los apellidos del cliente'
      });
    } else if (this.cliente.ciruc_cli == '' || this.cliente.ciruc_cli == null) {

      // let cedula = this.cliente.ciruc.toString();
      // this.validadorDeCedula(cedula);

      // validar el numero de cedula... para que imprimas el resultado true o false
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El número de cédula es incorrecto'
      });
    } else if (this.cliente.direccion_cli == '0' || this.cliente.direccion_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la dirección del cliente'
      });
    } else if (this.cliente.telefono_cli == '' || this.cliente.telefono_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un número de teléfono'
      });
    } else if (this.cliente.email_cli == '' || this.cliente.email_cli == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un email'
      });
    } else {
      if (this.clienteUpdate == null) {
        delete this.cliente.id_cli;
        delete this.cliente.created_at;
        this.dialogRef.close(this.cliente);
      } else {
        delete this.cliente.created_at;
        this.dialogRef.close(this.cliente);
      }

    }

  }

  cancelar() {
    this.dialogRef.close();
  }

}
