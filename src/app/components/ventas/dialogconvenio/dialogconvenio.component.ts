import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ItemsprefacturaI } from 'src/app/models/prefactura/itemsprefactura.interface';
import { PrefacturaI } from 'src/app/models/prefatura.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialogconvenio',
  templateUrl: './dialogconvenio.component.html',
  styleUrls: ['./dialogconvenio.component.css']
})
export class DialogconvenioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogconvenioComponent>, @Inject(MAT_DIALOG_DATA)
  public prefacturaConvenio: any,
    private toastr: ToastrService,
    private _prefactura: PrefacturaService) { }

  // para crear la fecha actual en php a mysql
  //   $date = date('Y-m-d H:i:s');
  // mysql_query("INSERT INTO `table` (`dateposted`) VALUES ('$date')");

  cliente: ClienteI;

  pagos: string = "0";

  medidorNuevo: ProsernuevoI;

  numeroPagos: number = 0;

  valorCuota: string = '0';
  valorinicial: string = '';

  valorfactura: any;
  fondosocial: any;

  prefacturavalorinicial: PrefacturaI;
  itemsprefactura: ItemsprefacturaI[];

  fechaactual: any;

  ngOnInit(): void {

    this.prefacturavalorinicial = {
      id_prefac: '',
      id_cli: '',
      id_usuario: '',
      servicios_prefac: '',
      impuesto_prefac: '',
      fondosocial_prefac: '',
      interes_prefac: '',
      neto_prefac: '',
      total_prefac: '',
      metodo_prefac: '',
      convenio: '',
      mesesatraso_prefac: '',
      fechapago_prefac: '',
      facturagenerada_prefac: '',
      monto_con: '',
      numerospagos_con: '',
      valorpagos_con: '',
      cuotasporpagar_con: '',
      fechaultimopago_con: '',
      fechacreacion_con: ''
    }

    this.itemsprefactura = [{
      cantidad_proser: 1,
      cantidadfinal_proser: 1,
      categoria_proser: 'SERVICIO AGUA',
      codigo_proser: 'SERV',
      descripcion_proser: '',
      nombre_proser: '',
      precio_proser: ''
    }];

    this.fechaactual = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    if (this.prefacturaConvenio == null) {
      this.dialogRef.close();
    } else {
      this.valorfactura = this.prefacturaConvenio.total_prefac;
      this.fondosocial = this.prefacturaConvenio.mesesatraso_prefac * 0.5;

    }
  }

  capturar() {

    let calculo = 0;

    if (this.pagos == '' || this.pagos == '0') {
      this.valorCuota = '0';
      this.numeroPagos = 0;
    } else if (this.pagos == '1') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac);
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 1;
    } else if (this.pagos == '2') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 2;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 2;

    } else if (this.pagos == '3') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 3;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 3;

    } else if (this.pagos == '4') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 4;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 4;

    } else if (this.pagos == '5') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 5;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 5;

    } else if (this.pagos == '6') {
      calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 6;
      this.valorCuota = calculo.toFixed(2);
      this.numeroPagos = 6;
    }
  }

  registrarConvenio() {
    if (this.pagos == '' || this.pagos == '0') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe Seleccionar el número de pagos del convenio para continuar'
      });
    } else {
      // mensaje de confirmacion al realizar un registro, actualizar o elimniar

      if (this.valorinicial == '' || this.valorinicial == undefined) {
        console.log("sin valor incial");

        // si NO tiene un valor inicial se procede a se actualiza la prefactura existente 
        // el fondo social acumulado se cobra en esta prefactura (total)

        let calculo = 0;

        if (this.pagos == '' || this.pagos == '0') {
          this.valorCuota = '0';
          this.numeroPagos = 0;
        } else if (this.pagos == '1') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac);
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 1;
        } else if (this.pagos == '2') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 2;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 2;

        } else if (this.pagos == '3') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 3;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 3;

        } else if (this.pagos == '4') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 4;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 4;

        } else if (this.pagos == '5') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 5;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 5;

        } else if (this.pagos == '6') {
          calculo = parseFloat(this.prefacturaConvenio.total_prefac) / 6;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 6;
        }

        this.prefacturaConvenio.convenio = '1';
        this.prefacturaConvenio.cuotasporpagar_con = (this.numeroPagos).toFixed(0);
        this.prefacturaConvenio.monto_con = this.prefacturaConvenio.total_prefac;
        this.prefacturaConvenio.fechacreacion_con = this.fechaactual;
        this.prefacturaConvenio.numerospagos_con = (this.numeroPagos).toFixed(0);
        this.prefacturaConvenio.servicios_prefac = JSON.stringify(this.itemsprefactura);
        this.prefacturaConvenio.valorpagos_con = this.valorCuota;
        this.prefacturaConvenio.create_at = this.fechaactual;
        
        this._prefactura.updatePrefacturaConvenio(this.prefacturaConvenio).subscribe(res => {
          if (res) {
            this.toastSuccess("Hemos registrado exitosamente el convenio de pago.");
            this.dialogRef.close(true);
          }
        });

      } else {

        // si tiene un valor inicial se procede a crear una nueva prefactura con el valor inicial 
        // se actualiza la prefactura existente con el saldo de la factura
        // el fondo social acumulado se cobra en esta prefactura (total)

        let aux = 0;

        aux = this.valorfactura - parseFloat(this.valorinicial);

        let calculo = 0;

        if (this.pagos == '' || this.pagos == '0') {
          this.valorCuota = '0';
          this.numeroPagos = 0;
        } else if (this.pagos == '1') {
          calculo = aux;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 1;
        } else if (this.pagos == '2') {
          calculo = aux / 2;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 2;

        } else if (this.pagos == '3') {
          calculo = aux / 3;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 3;

        } else if (this.pagos == '4') {
          calculo = aux / 4;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 4;

        } else if (this.pagos == '5') {
          calculo = aux / 5;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 5;

        } else if (this.pagos == '6') {
          calculo = aux / 6;
          this.valorCuota = calculo.toFixed(2);
          this.numeroPagos = 6;
        }

        this.itemsprefactura[0].descripcion_proser = 'VALOR INICIAL, CONVENIO DE PAGO';
        // prefactura para crear
        this.prefacturavalorinicial.id_cli = this.prefacturaConvenio.id_cli;
        this.prefacturavalorinicial.id_usuario = '0';
        this.prefacturavalorinicial.interes_prefac = '0';
        this.prefacturavalorinicial.fondosocial_prefac = this.fondosocial;
        this.prefacturavalorinicial.neto_prefac = (parseFloat(this.valorinicial) - this.fondosocial).toFixed(2);
        this.prefacturavalorinicial.total_prefac = this.valorinicial;
        this.prefacturavalorinicial.metodo_prefac = 'EFECTIVO';
        this.prefacturavalorinicial.mesesatraso_prefac = '0';
        this.prefacturavalorinicial.facturagenerada_prefac = 'S';
        this.prefacturavalorinicial.convenio = '0';
        this.prefacturavalorinicial.fechacreacion_con = this.fechaactual;
        this.prefacturavalorinicial.monto_con = (aux).toFixed(2);
        this.prefacturavalorinicial.impuesto_prefac = '0';
        this.prefacturavalorinicial.cuotasporpagar_con = (this.numeroPagos).toFixed(0);
        this.prefacturavalorinicial.servicios_prefac = JSON.stringify(this.itemsprefactura);
        this.prefacturavalorinicial.fechapago_prefac = this.fechaactual;

        // Prefactura para actualizar
        this.prefacturaConvenio.convenio = '1';
        this.prefacturaConvenio.cuotasporpagar_con = (this.numeroPagos).toFixed(0);
        this.prefacturaConvenio.monto_con = (aux).toFixed(2);
        this.prefacturaConvenio.fechacreacion_con = this.fechaactual;
        this.prefacturaConvenio.numerospagos_con = (this.numeroPagos).toFixed(0);
        this.prefacturaConvenio.servicios_prefac = JSON.stringify(this.itemsprefactura);
        this.prefacturaConvenio.valorpagos_con = this.valorCuota;
        this.prefacturaConvenio.neto_prefac = '0';
        this.prefacturaConvenio.total_prefac = (aux).toFixed(2);
        this.prefacturaConvenio.interes_prefac = this.prefacturaConvenio.interes_prefac;
        
        this._prefactura.createPrefacturaValorInicial(this.prefacturavalorinicial).subscribe(res => {
          if (res) {
            this._prefactura.updatePrefacturaConvenio(this.prefacturaConvenio).subscribe(res => {
              if (res) {
                this.toastSuccessValor("Hemos registrado exitosamente el convenio de pago, Revisa las facturas cobradas para imprimir el valor inicial.");
                this.dialogRef.close(true);
              }
            });
          }
        });

      }


    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3500,
    });
  }

  toastSuccessValor(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 5500,
    });
  }
}
