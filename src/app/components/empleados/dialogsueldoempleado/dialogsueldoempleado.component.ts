import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SueldosI } from 'src/app/models/sueldos/sueldos.interface';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { SueldosService } from 'src/app/services/sueldos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialogsueldoempleado',
  templateUrl: './dialogsueldoempleado.component.html',
  styleUrls: ['./dialogsueldoempleado.component.css']
})
export class DialogsueldoempleadoComponent implements OnInit {

  // varibales para los botones
  showSueldo: boolean = false;
  showCalcular: boolean = false;
  showValores: boolean = false;
  showHoras: boolean = false;

  // varibales para el calculo del sueldo
  sueldo: SueldosI;
  sueldodiastrabajados: any;
  decimotercer: any;
  decimocuarto: any;
  horasextras: string = '0';
  horassuplementarias: any;
  horascomplementarias: any;
  valorhora: any;
  dias: any;
  dias2: any;
  complementarias: any;
  suplementarias: any;

  constructor(public dialogRef: MatDialogRef<DialogsueldoempleadoComponent>, @Inject(MAT_DIALOG_DATA)
    public empleadoSueldo: UsuarioI,
    private _sueldo: SueldosService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sueldo = {
      id_usuario: 0,
      sueldo: '',
      diastrabajados: '',
      horasextras: '0',
      calculo_horas: '0',
      tipohoras: '',
      bonostransporte: '0',
      bonosalimentacion: '0',
      otrosingresos: '0',
      decimotercer: '0',
      decimocuarto: '0',
      totalingresos: '0.00',
      iessindividual: '0.00',
      iesspatronal: '0',
      iesstotal: '0',
      anticipos: '0',
      prestamos_oficina: '0',
      prestamo_hipotecario: '0',
      prestamo_quirografario: '0',
      otrosegresos: '0',
      total_egresos: '0.00',
      neto_recibir: '0.00',
      contrato: '',
      aprobado: 'NO',
      actafiniquito: ''
    };
  }


  verificardias(dias) {

    this.dias2 = parseInt(dias);

    if (this.dias2 <= 0 || this.dias2 >= 31) {
      // Swal.fire({
      //   icon: 'warning',
      //   confirmButtonColor: '#1d1d24',
      //   text: 'Los días laborados no pueden ser menor a 0 o mayor a 30'
      // });

      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();


    } else if (dias == "") {
      this.toastError("Los días laborados no pueden ser 0 o mayor a 30");
      this.showValores = false;
      this.showCalcular = false;
      this.cancelar();

    }
    else {

      this.sueldo.diastrabajados = dias;

      this.showValores = true;
      this.showCalcular = true;
    }
  }

  combohoras() {
    if (this.horasextras == 'S') {
      this.showHoras = true;
    } if (this.horasextras == 'C') {
      this.showHoras = true;
    }
  }

  calcularSueldo() {

    this.valorhora = (parseFloat(this.empleadoSueldo.sueldo) / 240);

    if (this.sueldo.horasextras > '0') {
      if (this.horasextras == '0') {
        Swal.fire({
          icon: 'warning',
          confirmButtonColor: '#1d1d24',
          text: 'Debe seleccionar el tipo de horas extras para el calculo'
        });
      } else if (this.horasextras == 'C') {
        this.complementarias = this.valorhora * 2;

        this.sueldo.calculo_horas = (parseFloat(this.sueldo.horasextras) * this.complementarias).toFixed(2);
        this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
        this.sueldo.tipohoras = 'C';

        this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
        this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

        this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
        this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
        this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
        this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
        // (400/12)/30
        this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

        this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

        this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);

        this.sueldo.sueldo = this.empleadoSueldo.sueldo;

        this.showCalcular = false;
        this.showSueldo = true;

      } else if (this.horasextras == 'S') {

        this.suplementarias = this.valorhora * 1.5;
        this.sueldo.calculo_horas = (parseFloat(this.sueldo.horasextras) * this.suplementarias).toFixed(2);
        this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
        this.sueldo.tipohoras = 'S';

        this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
        this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos) + parseFloat(this.sueldo.calculo_horas)).toFixed(2);

        this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
        this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
        this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
        this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
        // (400/12)/30
        this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);

        this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);

        this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);

        this.sueldo.sueldo = this.empleadoSueldo.sueldo;

        this.showCalcular = false;
        this.showSueldo = true;
      }


    } else {

      this.sueldo.id_usuario = this.empleadoSueldo.id_usuario;
      this.sueldo.tipohoras = '';
      this.sueldodiastrabajados = (parseFloat(this.sueldo.diastrabajados) / 30) * parseFloat(this.empleadoSueldo.sueldo);
      this.sueldo.totalingresos = (parseFloat(this.sueldodiastrabajados) + parseFloat(this.sueldo.bonostransporte) + parseFloat(this.sueldo.bonosalimentacion) + parseFloat(this.sueldo.otrosingresos)).toFixed(2);
      this.sueldo.iessindividual = ((parseFloat(this.sueldodiastrabajados) * 9.45) / 100).toFixed(2);
      this.sueldo.iesspatronal = ((parseFloat(this.sueldodiastrabajados) * 11.15) / 100).toFixed(2);
      this.sueldo.iesstotal = (parseFloat(this.sueldo.iessindividual) + parseFloat(this.sueldo.iesspatronal)).toFixed(2);
      this.sueldo.decimotercer = (parseFloat(this.sueldodiastrabajados) / 12).toFixed(2);
      this.sueldo.horasextras = '0';
      this.sueldo.calculo_horas = '0';
      this.sueldo.decimocuarto = (((400 / 12) / 30) * parseFloat(this.sueldo.diastrabajados)).toFixed(2);
      this.sueldo.total_egresos = (parseFloat(this.sueldo.anticipos) + parseFloat(this.sueldo.prestamos_oficina) + parseFloat(this.sueldo.prestamo_hipotecario) + parseFloat(this.sueldo.prestamo_quirografario) + parseFloat(this.sueldo.otrosegresos) + parseFloat(this.sueldo.iessindividual)).toFixed(2);
      this.sueldo.neto_recibir = (parseFloat(this.sueldo.totalingresos) - parseFloat(this.sueldo.total_egresos)).toFixed(2);
      this.sueldo.sueldo = this.empleadoSueldo.sueldo;

      this.showCalcular = false;
      this.showSueldo = true;
    }

  }

  registrarSueldo() {

    this.dialogRef.close();

    if (this.sueldo.diastrabajados == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Los días laborados no pueden ser menor a 0 o mayor a 30'
      });
    }

    this.showSueldo = false;

    this._sueldo.createSueldo(this.sueldo).subscribe(res => {
      if (res == true) {
        this.cancelar();
        this.toastSuccess("grabado");

      } else {
        this.toastError("ERROR AL REGISTRAR");
      }
    });
  }

  cancelar() {
    this.showSueldo = false;
    this.showCalcular = false;
    this.showValores = false;
    this.horasextras = '0';
    this.showHoras = false;
    this.sueldo = {
      id_usuario: 0,
      sueldo: '',
      diastrabajados: '',
      horasextras: '0',
      calculo_horas: '0',
      tipohoras: '',
      bonostransporte: '0',
      bonosalimentacion: '0',
      otrosingresos: '0',
      decimotercer: '0',
      decimocuarto: '0',
      totalingresos: '0.00',
      iessindividual: '0.00',
      iesspatronal: '0',
      iesstotal: '0',
      anticipos: '0',
      prestamos_oficina: '0',
      prestamo_hipotecario: '0',
      prestamo_quirografario: '0',
      otrosegresos: '0',
      total_egresos: '0.00',
      neto_recibir: '0.00',
      contrato: '',
      aprobado: 'NO',
      actafiniquito: ''
    };
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
