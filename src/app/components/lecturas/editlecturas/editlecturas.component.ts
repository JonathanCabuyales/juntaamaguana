import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editlecturas',
  templateUrl: './editlecturas.component.html',
  styleUrls: ['./editlecturas.component.css']
})
export class EditlecturasComponent implements OnInit {
  corregir: string = '';
  constructor(
    private _dialog: MatDialog, 
    private _refDialog: MatDialogRef<EditlecturasComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {

    console.log(this.data);

    console.log(JSON.parse(this.data.servicios_prefac));
    
    
  }

  cerrarDialog(cerrar: boolean){

    if(cerrar){
      let enviarData = {
        id_lec: this.data.id_lec,
        lecturaNueva: this.corregir,
        cerrar
      }
      this._refDialog.close(enviarData);
    }else{
      
      this._refDialog.close(cerrar);
    }

  }

  modificarLectura(){
    if(this.corregir.length === 0){
      this.mensajeError('Debe llenar el campo nueva lectura');
      return;
    }

    // this.mensajeSuccess('Se ha modificado correctamente');
    this.modificarTotalPagar();
    // this.cerrarDialog(true);

    
    
  }

  cancelar(){
    this.cerrarDialog(false);
  }


  mensajeSuccess(mensaje: string){
    this._toastr.success(mensaje, 'Modificacion de Lectura', {
      progressAnimation: 'increasing',
      progressBar: true,
      easeTime: '700',
      easing: 'ease-in-out'
    });
  }

  mensajeError(mensaje: string){
    this._toastr.error(mensaje, 'Error', {
      progressAnimation: 'increasing',
      progressBar: true,
      easeTime: '1000',
      easing: 'ease-in-out'
    });
  }

  modificarTotalPagar(){

    console.log(JSON.parse(this.data.servicios_prefac));
    
    if (parseInt(this.corregir) >= 0 && parseInt(this.corregir) <= 17) {

      
      

      /* if (this.listaservicios.length) {
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

      } */

    }
  }

}
