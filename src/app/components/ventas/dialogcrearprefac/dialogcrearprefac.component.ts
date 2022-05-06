import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LecturaI } from 'src/app/models/lecturas/lecturas.interface';
import { ItemsprefacturaI } from 'src/app/models/prefactura/itemsprefactura.interface';
import { PrefacturaI } from 'src/app/models/prefactura/prefactura.interface';
import { LecturaService } from 'src/app/services/lecturas/lectura.service';
import { MultaService } from 'src/app/services/multa/multa.service';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import { DialogconfirmacionComponent } from '../../mensajes/dialogconfirmacion/dialogconfirmacion.component';

@Component({
  selector: 'app-dialogcrearprefac',
  templateUrl: './dialogcrearprefac.component.html',
  styleUrls: ['./dialogcrearprefac.component.css']
})
export class DialogcrearprefacComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'facturado', 'fondo', 'fechapago', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  socio: any;

  // variables para capturar datos
  numerosocio: string = '';
  lecturaactual: any;
  lecturanueva: LecturaI;
  mesactual: string;
  consumo: any;
  excedente: any = '0';
  id_prefactura: any;
  valormesactual: any;
  fechaactual: string = '';
  valoratraso: string = '0.00';
  valorinteres: string = '0.00';
  valormultas: string = '0.00';
  totalapagar: string = '0.00';
  interes: string = '0';
  fondosocial: any = '0';
  totalsinfondosocialatraso: number = 0;

  // variables para ocutlar campos
  show: boolean = false;
  showimpresion: boolean = false;
  showinfocliente: boolean = false;
  showvalores: boolean = false;
  showbtnimprimir: boolean = false;
  showimg: boolean;

  // valores cargados
  lecturas: any[];
  multas: any[];
  listaservicios: any[];
  itemprefacturanueva: ItemsprefacturaI;
  arregloitemprefactura: ItemsprefacturaI[];

  // variables para insertar 
  prefacturaactualizar: PrefacturaI;
  prefacturanueva: PrefacturaI;


  // socio
  nombre: any = '';
  barrio: any = '';
  cedula: any = '';
  listaguardados: any[];
  interesprefac: string = '';
  totalprefac: string = '';
  // variables para mostrar campos
  showbtncalcular: boolean;
  showdatoscliente: boolean;
  showvalorprefac: boolean;

  // fecha actual
  fecha: any = '';
  mesprefac: any = '0';

  constructor(private toastr: ToastrService,
    private _lecturas: LecturaService,
    private _prefactura: PrefacturaService,
    private _multas: MultaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.showbtncalcular = true;
    this.showdatoscliente = false;
    this.showvalorprefac = true;
    this.showimg = true;

    this.mesactual = new Date().toLocaleString('es', { month: 'long' }).toLocaleUpperCase();
    this.fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

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

    this.arregloitemprefactura = [{
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      categoria_proser: '',
      codigo_proser: '',
      descripcion_proser: '',
      nombre_proser: '',
      precio_proser: ''
    }];

    this.itemprefacturanueva = {
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      categoria_proser: '',
      codigo_proser: '',
      descripcion_proser: '',
      nombre_proser: '',
      precio_proser: ''
    };

    this.prefacturaactualizar = {
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
      facturagenerada_prefac: '',
      fechapago_prefac: '',
      create_at: '',
      monto_con: '',
      numerospagos_con: '',
      valorpagos_con: '',
      cuotasporpagar_con: '',
      fechaultimopago_con: '',
      fechacreacion_con: ''
    };

    this.prefacturanueva = {
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
      convenio: '0',
      mesesatraso_prefac: '',
      facturagenerada_prefac: '',
      fechapago_prefac: '',
      create_at: '',
      monto_con: '0',
      numerospagos_con: '0',
      valorpagos_con: '0',
      cuotasporpagar_con: '0',
      fechaultimopago_con: '0',
      fechacreacion_con: '0'
    };


  }

  buscarSocio() {

    this.show = true;

    if (this.numerosocio == '') {
      this.toastError("Debe ingresar el numero de socio para continuar");

      this.show = false;
      this.showinfocliente = false;
      this.showvalores = false;
      this.valormultas = '0.00';
      this.interes = '0.00';
      this.valoratraso = '0.00';
      this.valorinteres = '0.00';
      this.lecturaactual = '';
      this.nombre = '';
      this.barrio = '';
      this.cedula = '';
      this.totalapagar = '0.00';
      this.valormesactual = '0.00';

      this.cancelar();

    } else {

      this._lecturas.getLectura(this.numerosocio).subscribe(async res => {

        if (res.length) {
          this.lecturaactual = '';
          this.lecturas = res;
          this.nombre = res[0].nombres_cli + ' ' + res[0].apellidos_cli;
          this.barrio = res[0].direccion_cli;
          this.cedula = res[0].ciruc_cli;
          this.totalapagar = '0.00';
          this.valormesactual = '0.00';
          this.showvalores = false;
          this.showdatoscliente = true;
          this.showbtncalcular = true;
          this.showimg = false;

        } else {

          this.toastError("EL número de socio no esta activo");

          this.show = false;
          this.showinfocliente = false;
          this.showvalores = false;
          this.valormultas = '0.00';
          this.interes = '0.00';
          this.valoratraso = '0.00';
          this.valorinteres = '0.00';
          this.lecturaactual = '';
          this.nombre = '';
          this.barrio = '';
          this.cedula = '';
          this.totalapagar = '0.00';
          this.valormesactual = '0.00';
          this.cancelar();
        }

      });

      this._multas.getMultas(this.numerosocio).subscribe(res => {

        if (res.length) {
          for (let i = 0; i < res.length; i++) {
            this.valormultas = (parseFloat(this.valormultas) + parseFloat(res[i].saldo_mul)).toFixed(2);
          }
        } else {
          this.valormultas = '0';
        }
      });

      this._prefactura.getFacturaAtrasada(this.numerosocio).subscribe(res => {

        // console.log(res);

        if (res.length) {

          this.showvalorprefac = true;
          this.prefacturaactualizar = res[0];
          this.interesprefac = res[0].interes_prefac;
          this.totalprefac = res[0].total_prefac;
          this.id_prefactura = res[0].id_prefac;
          this.listaservicios = JSON.parse(res[0].servicios_prefac);

          // this.listaguardados = JSON.parse(res[0].servicios_prefac);
          this.dataSource = new MatTableDataSource(this.listaservicios);
          this.dataSource.paginator = this.paginator;

          let totalatraso = 0;
          this.totalsinfondosocialatraso = 0;

          for (let i = 0; i < this.listaservicios.length; i++) {
            totalatraso = totalatraso + parseFloat(this.listaservicios[i].precio_proser);
          }

          this.valoratraso = (totalatraso).toFixed(2);

          this.valorinteres = ((parseFloat(this.valoratraso) * 10) / 100).toFixed(2);

          this.fondosocial = (this.listaservicios.length * 0.5).toFixed(2);

        } else {
          this.interes = '0.00';
          this.valoratraso = '0.00';
          this.valorinteres = '0.00';
          this.fondosocial = '0.00';
          this.listaservicios = [];

          this.dataSource = new MatTableDataSource(this.listaservicios);
          this.dataSource.paginator = this.paginator;
        }

      });
    }
  }


  calcularvalores() {

    if (this.mesprefac == '0') {

      this.toastError("Debe seleccionar el mes para crear la factura");

    } else if (this.lecturaactual >= '0') {

      this.showbtncalcular = false;
      this.showvalores = true;
      this.showvalorprefac = false;

      // console.log(this.lecturaactual);
      

      if (parseInt(this.lecturaactual) >= 0 && parseInt(this.lecturaactual) <= 17) {

        console.log(this.lecturaactual, this.listaservicios.length);
        

        if (this.listaservicios.length) {
          console.log('siempre va a entrar aqui');
          
          // consumo sin excendentes paga lo basico 
          // cuando tiene facturas vencidas se actualiza el la factura creada con el interes y se añade el valor del mes actual
          // console.log("tiene facturas vencidas");
          this.valormesactual = '3.15';
          this.excedente = '0';

          this.itemprefacturanueva.descripcion_proser = 'SERVICIO DE AGUA MES ' + this.mesprefac;
          this.itemprefacturanueva.precio_proser = this.valormesactual;
          this.listaservicios.push(this.itemprefacturanueva);

          this.fondosocial = (parseFloat(this.fondosocial) + 0.5).toFixed(2);
          this.totalapagar = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormultas) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);

          this.prefacturaactualizar.servicios_prefac = JSON.stringify(this.listaservicios);
          this.prefacturaactualizar.fondosocial_prefac = this.fondosocial;
          this.prefacturaactualizar.interes_prefac = this.valorinteres;
          this.prefacturaactualizar.mesesatraso_prefac = this.listaservicios.length.toString();
          this.prefacturaactualizar.neto_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valormesactual)).toFixed(2);
          this.prefacturaactualizar.total_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);
          this.prefacturaactualizar.create_at = this.fecha;

          this.dataSource = new MatTableDataSource(this.listaservicios);
          this.dataSource.paginator = this.paginator;

        } else if (parseInt(this.lecturaactual) < 17) {
          console.log('posible entra aqui');
          
          // consumo sin excendentes paga lo basico 
          // cuando no tiene facturas vencidad solo se crea la factura del mes actual
          // console.log("no tiene facturas vencidas");
          this.valormesactual = '3.15';
          this.fondosocial = '0.5'
          this.excedente = '0';
          this.totalapagar = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormultas) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);

          // añado la descrion de los items en la prefactura
          this.arregloitemprefactura[0].descripcion_proser = 'SERVICIO DE AGUA MES ' + this.mesprefac;
          this.arregloitemprefactura[0].precio_proser = this.valormesactual;

          this.prefacturanueva.id_cli = this.numerosocio;
          this.prefacturanueva.id_usuario = '0';
          this.prefacturanueva.interes_prefac = '0';
          this.prefacturanueva.fondosocial_prefac = this.fondosocial;
          this.prefacturanueva.neto_prefac = this.valormesactual;
          this.prefacturanueva.total_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);
          this.prefacturanueva.metodo_prefac = 'EFECTIVO';
          this.prefacturanueva.mesesatraso_prefac = '0';
          this.prefacturanueva.facturagenerada_prefac = 'N';
          this.prefacturanueva.servicios_prefac = JSON.stringify(this.arregloitemprefactura);

          this.dataSource = new MatTableDataSource(this.arregloitemprefactura);
          this.dataSource.paginator = this.paginator;

        }

      } else {
        console.log('entra a mayores ', this.excedente);
        
        let totalexcedente = 0;
        this.excedente = this.lecturaactual - 17;
        // console.log(this.excedente);

        if (this.excedente <= 30) {
          console.log('entra en excedente menor a 30');
          
          totalexcedente = (this.excedente * 0.22) + 3.15;
          
        } else if (this.excedente >= 31 && this.excedente <= 60) {
          console.log('entra en excedente entre');
          
          totalexcedente = (this.excedente * 0.25) + 3.25;
          
        } else if (this.excedente > 60) {
          console.log('entra en excedente mayor');

          totalexcedente = (this.excedente * 0.3) + 3.5;

        }

        this.valormesactual = (totalexcedente).toFixed(2);

        if (this.listaservicios.length) {

          // consumo con excendentes 
          // cuando tiene facturas vencidas se actualiza el la factura creada con el interes y se añade el valor del mes actual ya calculado el excendete correspondiente
          // console.log("tiene facturas vencidas");

          this.itemprefacturanueva.descripcion_proser = 'SERVICIO DE AGUA MES ' + this.mesprefac;
          this.itemprefacturanueva.precio_proser = this.valormesactual;
          this.listaservicios.push(this.itemprefacturanueva);

          this.fondosocial = (parseFloat(this.fondosocial) + 0.5).toFixed(2);
          this.totalapagar = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormultas) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);

          this.prefacturaactualizar.servicios_prefac = JSON.stringify(this.listaservicios);
          this.prefacturaactualizar.fondosocial_prefac = this.fondosocial;
          this.prefacturaactualizar.interes_prefac = this.valorinteres;
          this.prefacturaactualizar.mesesatraso_prefac = this.listaservicios.length.toString();
          this.prefacturaactualizar.neto_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valormesactual)).toFixed(2);
          this.prefacturaactualizar.total_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);
          this.prefacturaactualizar.create_at = this.fecha;

          this.dataSource = new MatTableDataSource(this.listaservicios);
          this.dataSource.paginator = this.paginator;

        } else {

          // consumo con excedentes
          // cuando no tiene facturas vencidas se crea la prefactura sumando el excendete
          // console.log("No tiene facturas vencidas");

          this.fondosocial = '0.5';
          this.totalapagar = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormultas) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);

          // añado la descrion de los items en la prefactura
          this.arregloitemprefactura[0].descripcion_proser = 'SERVICIO DE AGUA MES ' + this.mesprefac;
          this.arregloitemprefactura[0].precio_proser = this.valormesactual;

          this.prefacturanueva.id_cli = this.numerosocio;
          this.prefacturanueva.id_usuario = '0';
          this.prefacturanueva.interes_prefac = '0';
          this.prefacturanueva.fondosocial_prefac = this.fondosocial;
          this.prefacturanueva.neto_prefac = this.valormesactual;
          this.prefacturanueva.total_prefac = (parseFloat(this.valoratraso) + parseFloat(this.valorinteres) + parseFloat(this.valormesactual) + parseFloat(this.fondosocial)).toFixed(2);
          this.prefacturanueva.metodo_prefac = 'EFECTIVO';
          this.prefacturanueva.mesesatraso_prefac = '0';
          this.prefacturanueva.facturagenerada_prefac = 'N';
          this.prefacturanueva.servicios_prefac = JSON.stringify(this.arregloitemprefactura);


          this.dataSource = new MatTableDataSource(this.arregloitemprefactura);
          this.dataSource.paginator = this.paginator;

        }

      }


    } else {
      this.toastError("Debe ingresar el consumo para continuar");
    }

  }

  savePrefactura() {

    // console.log("Actualizar: ", this.prefacturaactualizar);
    // console.log("nueva: ", this.prefacturanueva);


    if (this.prefacturaactualizar.servicios_prefac != '') {

      this._prefactura.updatePrefactura(this.prefacturaactualizar).subscribe(res => {

        if (res) {
          this.cancelar();
          this.toastSuccess("Prefactura creada con exito, revisa facturas por cobrar");
        }

      });

    } else if (this.prefacturanueva.servicios_prefac != '') {
      // console.log("crear nueva prefactura");

      this._prefactura.createPrefactura(this.prefacturanueva).subscribe(res => {

        if (res) {
          this.cancelar();
          this.toastSuccess("Prefactura creada con exito, revisa facturas por cobrar");
        }

      });

    }
  }

  deleteDetalle(element) {

    if (this.listaservicios.length == 1) {
      this.toastWarning("Por favor borre la prefactura en su totalidad con el boton 'Borrar Prefactura' e ingrese nuevamente los valores");
    } else if (this.listaservicios.length >= 1) {


      const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
        width: '500px',
        data: 'Eliminar'
      }
      );

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          for (let i = 0; i < this.listaservicios.length; i++) {

            if (this.listaservicios[i].descripcion_proser == element.descripcion_proser &&
              this.listaservicios[i].precio_proser == element.precio_proser) {
              // console.log("aqui borra");

              this.listaservicios.splice(i, 1);

              this.prefacturaactualizar.servicios_prefac = JSON.stringify(this.listaservicios);

              let totalatraso = 0;
              let ultimo = 0;
              let ultimopago = 0;

              for (let i = 0; i < this.listaservicios.length; i++) {
                totalatraso = totalatraso + parseFloat(this.listaservicios[i].precio_proser);
              }

              if (this.listaservicios.length == 1) {

                this.prefacturaactualizar.interes_prefac = '0.00';
                this.prefacturaactualizar.fondosocial_prefac = '0.5';
                this.prefacturaactualizar.neto_prefac = totalatraso.toString();
                this.prefacturaactualizar.mesesatraso_prefac = this.listaservicios.length.toString();
                this.prefacturaactualizar.total_prefac = (totalatraso + parseFloat('0.5')).toFixed(2);

              } else if (this.listaservicios.length > 1) {

                ultimo = this.listaservicios.length - 1;
                ultimopago = parseFloat(this.listaservicios[ultimo].precio_proser);

                totalatraso = totalatraso - ultimopago;

                this.valorinteres = ((totalatraso * 10) / 100).toFixed(2);

                this.fondosocial = (this.listaservicios.length * 0.5).toFixed(2);

                this.prefacturaactualizar.total_prefac = (totalatraso + ultimopago + parseFloat(this.valorinteres) + parseFloat(this.fondosocial)).toFixed(2);
                this.prefacturaactualizar.interes_prefac = this.valorinteres;
                this.prefacturaactualizar.fondosocial_prefac = this.fondosocial;
                this.prefacturaactualizar.neto_prefac = (totalatraso + ultimopago).toFixed(2);
                this.prefacturaactualizar.mesesatraso_prefac = this.listaservicios.length.toString();

              }

              // console.log(this.prefacturaactualizar);

              this._prefactura.updatePrefactura(this.prefacturaactualizar).subscribe(res => {

                if (res) {
                  this.cancelar();
                  this.toastSuccess("Hemos actualizado los detalles de la prefactura");
                  this.cancelar();
                }

              });

              break;
            }

          }
        }
      });
    }
  }

  deleteprefactura() {
    if (!this.listaservicios.length) {
      this.toastWarning("Aun no has creado la prefactura para este socio, no podemos borrar la prefactura");

    } else {

      const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
        width: '500px',
        data: 'Eliminar'
      }
      );

      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this._prefactura.deletePrefactura(this.id_prefactura).subscribe(res => {
            if (res) {
              this.toastSuccess("Hemos borrado la prefactura, no te olvides de registrar la nueva prefactrura");
              this.cancelar();
            }
          });
        }
      });
    }

  }

  cancelar() {
    this.prefacturaactualizar = {
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
      facturagenerada_prefac: '',
      fechapago_prefac: '',
      create_at: '',
      monto_con: '',
      numerospagos_con: '',
      valorpagos_con: '',
      cuotasporpagar_con: '',
      fechaultimopago_con: '',
      fechacreacion_con: ''
    };

    this.prefacturanueva = {
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
      convenio: '0',
      mesesatraso_prefac: '',
      facturagenerada_prefac: '',
      fechapago_prefac: '',
      create_at: '',
      monto_con: '0',
      numerospagos_con: '0',
      valorpagos_con: '0',
      cuotasporpagar_con: '0',
      fechaultimopago_con: '0',
      fechacreacion_con: '0'
    }

    this.nombre = '';
    this.barrio = '';
    this.cedula = '';
    this.lecturaactual = '';
    this.interes = '0.00';
    this.valoratraso = '0.00';
    this.valorinteres = '0.00';
    this.fondosocial = '0.00';
    this.valormesactual = '0.00';
    this.totalapagar = '0.00';
    this.showimg = true;

    this.showdatoscliente = false;

    this.arregloitemprefactura = [];
    this.dataSource = new MatTableDataSource(this.arregloitemprefactura);
    this.dataSource.paginator = this.paginator;

    this.arregloitemprefactura = [{
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      categoria_proser: '',
      codigo_proser: '',
      descripcion_proser: '',
      nombre_proser: '',
      precio_proser: ''
    }];
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 6000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4500,
    });
  }


}