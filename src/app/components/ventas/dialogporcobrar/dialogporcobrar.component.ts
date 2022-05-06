import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import { DialogconvenioComponent } from 'src/app/components/ventas/dialogconvenio/dialogconvenio.component';
import Swal from 'sweetalert2';
import { PrefacturaI } from 'src/app/models/prefatura.interface';
import { FacturaelectronicaService } from 'src/app/services/facturaelectronica/facturaelectronica.service';
import { DialogconfirmacionComponent } from '../../dialogs/dialogconfirmacion/dialogconfirmacion.component';
import { CookieService } from 'ngx-cookie-service';
// import { validarRuc } from '../validarRuc';
// import { validarCedula } from '../validar-cedula';

declare const obtenerComprobanteFirmado_sri: any;
@Component({
  selector: 'app-dialogporcobrar',
  templateUrl: './dialogporcobrar.component.html',
  styleUrls: ['./dialogporcobrar.component.css']
})
export class DialogporcobrarComponent implements OnInit {

  enviarFacturaInsert:any = {};

  displayedColumns: string[] = ['socio', 'nombres', 'ciruc', 'deuda', 'cantidad', 'precio', 'convenio', 'pagos', 'cuota'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedConvenio: string[] = ['socio', 'nombres', 'ciruc', 'deuda', 'cantidad', 'precio', 'convenio', 'pagos', 'cuota'];
  dataconvenio: MatTableDataSource<any>;
  socio = '';
  listasocio: any[];
  prefacturanueva: PrefacturaI;

  // variables para el convenio de pago
  listaitems: any[];

  showtableconvenio: boolean;
  showtable: boolean;
  showimg: boolean;
  token: any;

  constructor(private _prefactura: PrefacturaService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _factura: FacturaelectronicaService,
    private _token: CookieService) { }

  ngOnInit(): void {
    this.token = this._token.get('token');
    this.showtableconvenio = false;
    this.showtable = false;
    this.showimg = true;

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
      convenio: '',
      mesesatraso_prefac: '',
      facturagenerada_prefac: '',
      monto_con: '',
      numerospagos_con: '',
      valorpagos_con: '',
      cuotasporpagar_con: '',
    }

  }

  buscarSocio() {
    if (this.socio == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de socio para continuar'
      });
      this.showimg = true;
      this.showtable = false;

    } else {
      this._prefactura.getPrefactura(this.socio).subscribe(res => {

        if (res.length) {
          this.showtable = true;
          this.showimg = false;

          this.listasocio = res;

          for (let i = 0; i < this.listasocio.length; i++) {
            this.listasocio[i].servicios_prefac = JSON.parse(this.listasocio[i].servicios_prefac);
          }

          this.dataSource = new MatTableDataSource(this.listasocio);
          this.dataSource.paginator = this.paginator;

          // if(res[0].convenio == '1'){
          //   this.showtableconvenio = true;
          //   this.showtable = false;

          //   this.listasocio = res;
          //   this.dataconvenio = new MatTableDataSource(this.listasocio);
          //   this.dataconvenio.paginator = this.paginator;
          // }else{
          //   this.showtableconvenio = false;
          //   this.showtable = true;
          //   this.listasocio = res;
          //   this.dataSource = new MatTableDataSource(this.listasocio);
          //   this.dataSource.paginator = this.paginator;
          // }

        } else {
          this.toastError('El socio no registra valores pendientes');
          this.listasocio = [];
          this.dataSource = new MatTableDataSource(this.listasocio);
          this.dataSource.paginator = this.paginator;
          this.showtableconvenio = false;
          this.showtable = false;
          this.showimg = true;

        }
      });

    }

  }

  cobrar(prefactura) {

    // para validar convenio 1 equivale a verdad 0 falso para los convenios

    console.log(prefactura);
    // let enviarFactura: any = {};

    let fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    prefactura.fechapago_prefac = fecha;

    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px',
      data: 'realizar el cobro de'
    }
    );

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);

      
      
      if(res){
        
        this.enviarFacturaInsert = prefactura;
        this._factura.getFacturaGenerada(this.token)
        .subscribe((respGetId) =>{
          
          // this.enviarFacturaInsert = {};
          console.log(respGetId, prefactura.ciruc_cli.length);
          
          
          if(respGetId.data.length === 0){
            if((prefactura.ciruc_cli) === '1700000000'){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '07';
              this.enviarFacturaInsert.ciruc_cliente = '9999999999';
              this.enviarFacturaInsert.cliente_tipo = 'CONSUMIDOR FINAL'
            }else if((prefactura.ciruc_cli).length === 10){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '05';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              
              
            }else{
              this.enviarFacturaInsert.tipoIdentificacionComprador = '04';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              
            }
  
            if(prefactura.email === '1@hotmail.com'){
              this.enviarFacturaInsert.email_cli = 'jaapsa17@hotmail.com';
  
            }else{
              this.enviarFacturaInsert.email_cli = prefactura.email_cli;
            }
            

            this.enviarFacturaInsert = {
              ...prefactura,
              servicios_prefac: JSON.stringify(prefactura.servicios_prefac),
              estado: 'PENDIENTE',
              generada_prefac: "0",
              secuencial: 1
            };

            console.log(this.enviarFacturaInsert);

            // this._factura.createFactura(this.enviarFacturaInsert)
            // .subscribe((respXML) =>{
            //   console.log(respXML);

              this.enviarFacturaInsert.claveacceso = '';
              this._factura.insertFactura(this.enviarFacturaInsert).
              subscribe((respInsert) =>{
                console.log('se inserto correctamente', respInsert);

                let ruta_certificado = "https://contable.jaapssa.com/libreria_2021/JOSE GERARDO GUALOTUNA LLUMIQUINGA 270422083105.p12";
                // let pwd_p12 = "Caizad2021";
                let pwd_p12 = "junta123";
                let ruta_respuesta = "https://contable.jaapssa.com/libreria_2021/example.php";
                // let ruta_factura = "https://contable.jaapssa.com/libreria_2021/xmlgenerados/"+respXML.claveacceso+".xml";
                // obtenerComprobanteFirmado_sri(ruta_certificado, pwd_p12, ruta_respuesta, ruta_factura, respXML.claveacceso);
                this._prefactura.cobrarPrefactura(prefactura)
                .subscribe((respPrefactura) =>{
                  console.log('prefactura ', respPrefactura);
                  this.listasocio = [];
                  this.dataSource = new MatTableDataSource(this.listasocio);
                  this.dataSource.paginator = this.paginator;
                  this.showimg = true;
                  this.showtableconvenio = false;
                  this.showtable = false;
                  /* if(respXML.claveacceso.length > 2){
                  } */
                  
                });
                
              });
              
            // });
            
            

            // console.log(this.enviarFacturaInsert);
            
            /* this._factura.insertFactura(this.enviarFacturaInsert)
              .subscribe((respFactura) =>{
                console.log(respFactura);
                
               this._factura.createFactura(respFactura.json.id_prefac)
                .subscribe(resp=>{
                  console.log(resp);
        
                  
        
                  // console.log(resp);
        
                  
        
        
                  
                });
              }); */
          }else{
            if((prefactura.ciruc_cli) === '1700000000'){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '07';
              this.enviarFacturaInsert.ciruc_cliente = '9999999999';
              this.enviarFacturaInsert.cliente_tipo = 'CONSUMIDOR FINAL'
            }else if((prefactura.ciruc_cli).length === 10){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '05';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              
              
            }else{
              this.enviarFacturaInsert.tipoIdentificacionComprador = '04';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              
            }
  
            if(prefactura.email === '1@hotmail.com'){
              this.enviarFacturaInsert.email_cli = 'jaapsa17@hotmail.com';
  
            }else{
              this.enviarFacturaInsert.email_cli = prefactura.email_cli;
            }
            this.enviarFacturaInsert = {
              ...prefactura,
              servicios_prefac: JSON.stringify(prefactura.servicios_prefac),
              estado: 'PENDIENTE',
              generada_prefac: "0",
              secuencial: parseInt(respGetId.data[0].secuencial) + 1
            };
            /* if((prefactura.ciruc_cli) === '1700000000'){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '07';
              this.enviarFacturaInsert.ciruc_cliente = '9999999999';
              this.enviarFacturaInsert.cliente_tipo = 'CONSUMIDOR FINAL';
            }else if(parseInt(prefactura.ciruc_cli).toString().length === 10){
              this.enviarFacturaInsert.tipoIdentificacionComprador = '05';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              
            }else{
              this.enviarFacturaInsert.tipoIdentificacionComprador = '04';
              this.enviarFacturaInsert.cliente = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
              this.enviarFacturaInsert.ciruc_cliente = prefactura.ciruc_cli;
              this.enviarFacturaInsert.cliente_tipo = prefactura.nombres_cli + " " + prefactura.apellidos_cli;
            }
  
            if(prefactura.email === '1@hotmail.com'){
              this.enviarFacturaInsert.email_cli = 'jaapsa17@hotmail.com';
  
            }else{
              this.enviarFacturaInsert.email_cli = prefactura.email_cli;
            } */

            console.log(this.enviarFacturaInsert);

            // this._factura.createFactura(this.enviarFacturaInsert)
            // .subscribe((respXML) =>{
            //   console.log('enviar xml', respXML);

              this.enviarFacturaInsert.claveacceso = '';
              this._factura.insertFactura(this.enviarFacturaInsert)
              .subscribe((respFactura) =>{
                console.log('respuesta Factura ', respFactura);
                let ruta_certificado = "https://contable.jaapssa.com/libreria_2021/JOSE GERARDO GUALOTUNA LLUMIQUINGA 270422083105.p12";
                // let pwd_p12 = "Caizad2021";
                let pwd_p12 = "junta123";
                let ruta_respuesta = "https://contable.jaapssa.com/libreria_2021/example.php";
                // let ruta_factura = "https://contable.jaapssa.com/libreria_2021/xmlgenerados/"+respXML.claveacceso+".xml";
                // obtenerComprobanteFirmado_sri(ruta_certificado, pwd_p12, ruta_respuesta, ruta_factura, respXML.claveacceso);
                
                this._prefactura.cobrarPrefactura(prefactura)
                .subscribe((respPrefactura) =>{
                  console.log('prefactura cobrada', respPrefactura);
                  this.listasocio = [];
                  this.dataSource = new MatTableDataSource(this.listasocio);
                  this.dataSource.paginator = this.paginator;
                  this.showimg = true;
                  this.showtableconvenio = false;
                  this.showtable = false;
                  /* if(respXML.claveacceso.length > 2){
                  } */
                  
                });
                
              });
              
            // });
            
           /*  this.enviarFacturaInsert = {
              ...prefactura,
              servicios_prefac: JSON.stringify(prefactura.servicios_prefac),
              estado: 'PENDIENTE',
              generada_prefac: "0",
              secuencial: respGetId.data[0].secuencial
            };

            console.log(this.enviarFacturaInsert);

            this._factura.insertFactura(this.enviarFacturaInsert)
            .subscribe((respInsert) =>{
                console.log(respInsert);
                this._factura.createFactura(this.enviarFacturaInsert)
                .subscribe((respCreateXML) =>{
                  console.log(respCreateXML);
                  
                })
                
            });*/
            
          }
          

        });

      }
      /* if (res) {

        this._prefactura.cobrarPrefactura(prefactura).subscribe(res => {

          if (res) {

            console.log(prefactura);
            

            this.toastSuccess("Registro guardado con exito, revisa la sección facturas cobradas.");
            
            this.listasocio = [];
            this.dataSource = new MatTableDataSource(this.listasocio);
            this.dataSource.paginator = this.paginator;
            this.showimg = true;
            this.showtableconvenio = false;
            this.showtable = false;

          } else {

            this.toastError("No hemos podido realizar el cobro por favor intentalo más tarde");
            this.showimg = true;

          }

        });

        // console.log(prefactura);

        // console.log(prefactura.servicios_prefac.length);

        // 1700000000
        // 1@hotmail.com

        // en el front solo voy a verificar si tiene correo y cedula para facturar con datos
        // caso contrario enviamos como consumidor final el valor que este pendiente sin exceder
        // los 200 dolares

        // if (prefactura.email_cli == '1@hotmail.com' || prefactura.ciruc_cli == '1700000000') {
        //   console.log("consumidor final");

        //   if (prefactura.servicios_prefac.length == 1) {
        //     console.log("sin meses atrasados");
        //     // envio la prefactura como consumidor final 
        //     // recuerda no sumar el fondo social en el total

      

        //   } else if (prefactura.servicios_prefac.length > 1) {

        //     // recuerda no sumar el fondo social en el total

        //     prefactura.servicios_prefac[0].precio_proser = (parseFloat(prefactura.servicios_prefac[0].precio_proser) + parseFloat(prefactura.interes_prefac)).toFixed(2);

        //     console.log(prefactura);

        //     this._factura.createFactura(prefactura).subscribe(res=>{
        //       console.log(res);
              
        //     });


        //   }

        // } else {
        //   console.log("con datos la factura");

        //   if (prefactura.ciruc_cli.length == 10) {

        //     if (validarCedula(prefactura.ciruc_cli)) {

        //       console.log("cedula valida");

        //       // recuerda no sumar el fondo social en el total
        //       prefactura.servicios_prefac[0].precio_proser = (parseFloat(prefactura.servicios_prefac[0].precio_proser) + parseFloat(prefactura.interes_prefac)).toFixed(2);
        //       prefactura.neto_prefac = (parseFloat(prefactura.neto_prefac) + parseFloat(prefactura.interes_prefac)).toFixed(2);
        //       console.log(prefactura);

        //       this._factura.createFactura(prefactura).subscribe(res=>{
        //         console.log(res);
                
        //       });

        //     } else {

        //       console.log("la cedula no es correcta");

        //     }

        //   } else if (prefactura.ciruc_cli.length == 13) {

        //     if (validarRuc(prefactura.ciruc_cli)) {

        //       console.log('RUC válido');
        //       prefactura.servicios_prefac[0].precio_proser = (parseFloat(prefactura.servicios_prefac[0].precio_proser) + parseFloat(prefactura.interes_prefac)).toFixed(2);

        //       console.log(prefactura);

        //       this._factura.createFactura(prefactura).subscribe(res=>{
        //         console.log(res);
                
        //       });

        //     } else {

        //       console.log('RUC inválido');

        //     }

        //   } else {
        //     console.log("el numero de cedula No tiene 10 o 13 digitos por favor verifique");

        //   }

        // }
        

        

      } */

    });


    // if (prefactura.convenio == 0) {

    //   let fecha = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' +
    //     new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();

    //   prefactura.fechapago_prefac = fecha;

    //   this._prefactura.cobrarPrefactura(prefactura).subscribe(res => {

    //     if (res) {

    //       this.toastSuccess("Registro guardado con exito, revisa la sección facturas cobradas.");
    //       this.listasocio = [];
    //       this.dataSource = new MatTableDataSource(this.listasocio);
    //       this.dataSource.paginator = this.paginator;

    //     } else {

    //       this.toastError("No hemos podido realizar el cobro por favor intentalo más tarde");

    //     }

    //   });

    // } else {

    //   console.log("si tiene convenio comienza a validar todo eso perra ajajja");

    //   // aqui pagará el total de la factura con el valor restante que le queda del convenio.
    //   // aqui vamos a crear una nueva prefactura con el total a cancelar.
    //   // creada la nueva prefactura debemos borrar la prefactura padre o inicial y dejar solo la de los convenios

    //   // total a pagar del convenio
    //   let totalcuotas = (parseInt(prefactura.cuotasporpagar_con) * parseFloat(prefactura.valorpagos_con));

    //   // prefactura nueva a insertar con los valores nuevos

    //   this.prefacturanueva.convenio = '';
    //   this.prefacturanueva.cuotasporpagar_con = '';
    //   this.prefacturanueva.facturagenerada_prefac = 'S';
    //   this.prefacturanueva.fechaultimopago_con = '';
    //   this.prefacturanueva.fondosocial_prefac = '0.00';
    //   this.prefacturanueva.id_cli = prefactura.id_cli;
    //   this.prefacturanueva.id_prefac = '';
    //   this.prefacturanueva.id_usuario = '0';
    //   this.prefacturanueva.impuesto_prefac = '0.00';
    //   this.prefacturanueva.interes_prefac = '0.00';
    //   this.prefacturanueva.mesesatraso_prefac = '';
    //   this.prefacturanueva.metodo_prefac = 'EFECTIVO';
    //   this.prefacturanueva.monto_con = '';
    //   this.prefacturanueva.neto_prefac = '';
    //   this.prefacturanueva.numerospagos_con = '';
    //   this.prefacturanueva.servicios_prefac = 'Ingresar el objeto transformado';
    //   this.prefacturanueva.total_prefac = (totalcuotas).toFixed(2);
    //   this.prefacturanueva.valorpagos_con = '';

    //   console.log(this.prefacturanueva);

    //   console.log((totalcuotas).toFixed(2));

    // }

  }

  cargarDeudores() {
    this._prefactura.getPrefacturaPorCobrar().subscribe(res => {
      this.listasocio = res;
      this.dataSource = new MatTableDataSource(this.listasocio);
      this.dataSource.paginator = this.paginator;
    });
  }

  // seccion para crear convenio de pagos
  convenio(element) {

    const dialogRef = this.dialog.open(DialogconvenioComponent, {
      width: '500px',
      data: element
    }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.cargarDeudores();
      } else {
        this.cargarDeudores();
      }
    });

  }

  cobrocuota(prefactura) {

    console.log(prefactura);

    // aqui se cobrara cada letra del convenio
    // para ello creamos primero una nueva prefactura con el valor de la cuota llenado los campos necesarios
    // es decir el valor de la cuota y la descripcion de pago de convenio con el numero de pago en los productos
    // posterior a ello se llenara sin fondo social por que ya esta incluido, y solo se cobrara el valor de la cuota
    // 
    // 
    // para la ultima cuota debemos eliminar la prefactura padre o inicial y dejar solo las prefactuas de las cuotas
    // 
    // 



  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
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