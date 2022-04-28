import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MultaService } from 'src/app/services/multa/multa.service';
import { DialogmultacobrarComponent } from '../dialogmultacobrar/dialogmultacobrar.component';
import { DialogmultaeditarComponent } from '../dialogmultaeditar/dialogmultaeditar.component';
import Swal from 'sweetalert2';
import { Columns, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { DialogmultacrearComponent } from '../dialogmultacrear/dialogmultacrear.component';

@Component({
  selector: 'app-dialogmultas',
  templateUrl: './dialogmultas.component.html',
  styleUrls: ['./dialogmultas.component.css']
})
export class DialogmultasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'tiponovedad', 'lectura', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  socio: string = '';
  listasocio: any[];

  constructor(private _multaConexiones: MultaService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  loadMultas() {
    this._multaConexiones.getAll().subscribe(res => {
      this.listasocio = res;
      this.dataSource = new MatTableDataSource(this.listasocio);
      this.dataSource.paginator = this.paginator;
    });
  }

  buscarSocio() {
    if (this.socio == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de socio para continuar'
      });

      this.listasocio = [];
      this.dataSource = new MatTableDataSource(this.listasocio);
      this.dataSource.paginator = this.paginator;

    } else {
      this._multaConexiones.getmultaconexion(this.socio).subscribe(res => {
        if (res.length) {

          this.listasocio = res;
          this.dataSource = new MatTableDataSource(this.listasocio);
          this.dataSource.paginator = this.paginator;

        } else {

          this.toastError("El socio no registra valores pendientes");

          this.listasocio = [];
          this.dataSource = new MatTableDataSource(this.listasocio);
          this.dataSource.paginator = this.paginator;

        }
      });
    }
  }

  crear() {

    const dialogRef = this.dialog.open(DialogmultacrearComponent, {
      width: '500px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      // console.log(res);
      
      if(res != undefined){
        this._multaConexiones.createMulta(res).subscribe(insert => {
          if (insert) {
            this.toastSuccess("Hemos grabado exitosamente tu registro")
          } else {
            this.toastError("Tenemos problemas para guardar tu registro por favor intentalo más tarde");
          }
  
        });
      }
    });
  }

  editar(multaconexion) {

    const dialogRef = this.dialog.open(DialogmultaeditarComponent, {
      width: '500px',
      data: multaconexion
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.toastSuccess("Hemos actualizado correctamente la información");
        this.buscarSocio();
      } else {
        this.toastError("Tenemos problemas para actualizar la información por favor intentalo nuevamente más tarde");
      }
    });

  }

  cobrar(multaconexion) {

    const dialogRef = this.dialog.open(DialogmultacobrarComponent, {
      width: '500px',
      data: multaconexion
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        this.toastSuccess("Hemos actualizado correctamente la información");
        this.buscarSocio();
      } else {
        this.toastError("Tenemos problemas para actualizar la información por favor intentalo nuevamente más tarde");
      }
    });
  }

  pdf(multaconexion) {

    console.log(multaconexion);

    let detalles;

    if (multaconexion.detalles_mul == '') {
      detalles = '';
    } else {
      detalles = JSON.parse(multaconexion.detalles_mul);
    }

    console.log(detalles);


    if (multaconexion.valor_mul == multaconexion.saldo_mul) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe realizar primero el cobro para continuar, por favor verifique esto e intentelo nuevamente'
      });
    } else {
      const pdf = new PdfMakeWrapper();

      // margen del PDF
      // izquierda, arriba, derecha, abajo
      pdf.pageMargins([30, 20, 30, 0]);

      pdf.info({
        title: 'Pago ' + multaconexion.nombres_cli + ' ' + multaconexion.apellidos_cli
      });

      pdf.add(new Table([
        ['', 'JUNTA ADMINISTRADORA DE AGUA POTABLE Y SANEAMIENTO DE SAN JUAN DE AMAGUAÑA']
      ]).bold().layout('noBorders').alignment('center').fontSize(10).widths(['40%', '60%']).end);

      pdf.add(new Table([
        ['', 'Dirección: San Juan de la Cruz Ricardo Alvarez S3-51 Y Nela Martínez'],
        ['', 'Tel: Oficina: 0992155576 operador: 0962871530 / 3821791'],
        ['', 'AMAGUAÑA - ECUADOR']
      ]).layout('noBorders').alignment('center').fontSize(9).widths(['40%', '60%']).end);

      pdf.add(new Txt('\n').end);

      pdf.add(new Table([
        [new Columns(['\nRazon Social: ' + multaconexion.nombres_cli + ' ' + multaconexion.apellidos_cli + "\n\n" +
          'email: ' + '' + '\n\n',

        '\nCI / RUC: ' + multaconexion.ciruc_cli + "\n\n" + "Telefono: " + '' + '\n\n',

        '\nDirección: ' + multaconexion.direccion_cli + "\n\n" + "Fecha Pago: " + multaconexion.fechapago]).end]
      ]).bold().alignment('center').fontSize(10).widths(['100%']).end);
      pdf.add(new Txt('\n\n').end);
      pdf.add(new Table([
        [{ text: 'Cantidad', fillColor: '#1d1d24', color: '#fff' },
        { text: 'Descripción', fillColor: '#1d1d24', color: '#fff' },
        { text: 'Valor', fillColor: '#1d1d24', color: '#fff' },
        { text: 'Cancelada', fillColor: '#1d1d24', color: '#fff' },
        { text: 'Saldo', fillColor: '#1d1d24', color: '#fff' },
        { text: 'Subtotal', fillColor: '#1d1d24', color: '#fff' }]
      ]).bold().alignment('center').fontSize(10).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);

      let subtotal0 = '0';
      let subtotal12 = '0';
      let totalFactura = '0';
      let iva = '0';

      if (multaconexion.saldo_mul == '0') {


        // validacion para ver si tiene palores con iva 
        // la primera validacion se ejecut si existen valores con iva
        // la segunda validacion se ejecuta con la variable detalles en vacio
        if (detalles != '') {

          for (let i = 0; i < detalles.length; i++) {

            if(detalles[i].IVA_proser == '12'){
              pdf.add(new Table([
                [{ text: multaconexion.length },
                { text: detalles[i].descripcion_proser },
                { text: detalles[i].subtotal12 },
                { text: multaconexion.cancelada_mul },
                { text: multaconexion.saldo_mul },
                { text: detalles[i].subtotal12 }]
              ]).bold().alignment('center').fontSize(10).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
            }else{
              pdf.add(new Table([
                [{ text: multaconexion.length },
                { text: detalles[i].descripcion_proser },
                { text: detalles[i].subtotal0 },
                { text: multaconexion.cancelada_mul },
                { text: multaconexion.saldo_mul },
                { text: detalles[i].subtotal0 }]
              ]).bold().alignment('center').fontSize(10).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
            }
           
          }      

          for (let i = 0; i < detalles.length; i++) {
            subtotal12 = (parseFloat(subtotal12) + parseFloat(detalles[i].subtotal12)).toFixed(2);

            console.log(parseFloat(subtotal12) + parseFloat(detalles[i].subtotal12));
            
            subtotal0 = (parseFloat(subtotal0) + parseFloat(detalles[i].subtotal0)).toFixed(2);
            iva = (parseFloat(iva) + parseFloat(detalles[i].iva12)).toFixed(2);
          }
          
          totalFactura = (parseFloat(subtotal12) + parseFloat(subtotal0) + parseFloat(iva)).toFixed(2);


          pdf.add(new Table([
            [new Columns(['', '', '']).alignment('left').end,
            new Txt(
              '\nSubtotal 12%' + "\n\n" +
              'Subtotal 0%' + "\n\n" +
              'IVA 12%' + "\n\n" +
              'Fondo Social' + "\n\n" +
              'Total Factura').bold().end,

            '\n' + (parseFloat(subtotal12)).toFixed(2) + ' $' + "\n\n" +
            (parseFloat(subtotal0)).toFixed(2) + ' $' + "\n\n" +
            (parseFloat(iva)).toFixed(2) + ' $' + "\n\n" +
            '0.00' + ' $' + "\n\n" +
            (parseFloat(totalFactura)).toFixed(2) + ' $']
          ]).bold().alignment('center').fontSize(11).widths(['70%', '20%', '10%']).end);

        }else{

          pdf.add(new Table([
            [{ text: multaconexion.length },
            { text: multaconexion.descripcion_mul },
            { text: multaconexion.valor_mul },
            { text: multaconexion.cancelada_mul },
            { text: multaconexion.saldo_mul },
            { text: multaconexion.valorpagado_mul }]
          ]).bold().alignment('center').fontSize(10).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);
        
          pdf.add(new Table([
            [new Columns(['', '', '']).alignment('left').end,
            new Txt(
              '\nSubtotal 12%' + "\n\n" +
              'Subtotal 0%' + "\n\n" +
              'IVA 12%' + "\n\n" +
              'Fondo Social' + "\n\n" +
              'Total Factura').bold().end,

            '\n0.00' + ' $' + "\n\n" +
            (parseFloat(multaconexion.valorpagado_mul)).toFixed(2) + ' $' + "\n\n" +
            '0.00' + ' $' + "\n\n" +
            '0.00' + ' $' + "\n\n" +
            (parseFloat(multaconexion.valorpagado_mul)).toFixed(2) + ' $']
          ]).bold().alignment('center').fontSize(11).widths(['70%', '20%', '10%']).end);

        }


      } else {

        pdf.add(new Table([
          [{ text: multaconexion.length },
          { text: multaconexion.descripcion_mul },
          { text: multaconexion.valor_mul },
          { text: multaconexion.cancelada_mul },
          { text: multaconexion.saldo_mul },
          { text: multaconexion.valor_mul }]
        ]).bold().alignment('center').fontSize(10).widths(['11%', '48%', '10%', '10%', '11%', '10%']).end);

        pdf.add(new Table([
          [new Columns(['', '', '']).alignment('left').end,
          new Txt(
            '\nSubtotal 12%' + "\n\n" +
            'Subtotal 0%' + "\n\n" +
            'IVA 12%' + "\n\n" +
            'Fondo Social' + "\n\n" +
            'Total Factura').bold().end,

          '\n0.00' + ' $' + "\n\n" +
          (parseFloat(multaconexion.valorpagado_mul)) + ' $' + "\n\n" +
          '0.00' + ' $' + "\n\n" +
          '0.00' + ' $' + "\n\n" +
          (parseFloat(multaconexion.valorpagado_mul)) + ' $']
        ]).bold().alignment('center').fontSize(11).widths(['70%', '20%', '10%']).end);

      }

      // Fin de la factura
      pdf.create().open();
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
