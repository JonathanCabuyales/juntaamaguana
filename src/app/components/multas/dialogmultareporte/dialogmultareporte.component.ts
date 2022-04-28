import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { MultaService } from 'src/app/services/multa/multa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogmultareporte',
  templateUrl: './dialogmultareporte.component.html',
  styleUrls: ['./dialogmultareporte.component.css']
})
export class DialogmultareporteComponent implements OnInit {

  fechaDesde: any = '';
  fechaHasta: any = '';

  constructor(private toastr: ToastrService,
    private _multa: MultaService) { }

  ngOnInit(): void {
  }

  reportePDF() {
    if (this.fechaDesde == '' || this.fechaHasta == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un rango de fechas para continuar'
      });

    } else {
      this._multa.getreportefecha(this.fechaDesde, this.fechaHasta).subscribe(res => {
        
        if (res.length) {
          const pdf = new PdfMakeWrapper();

          pdf.info({
            title: 'REPORTE Desde ' + this.fechaDesde + '  Hasta ' + this.fechaHasta
          });

          // titulo del reporte
          pdf.add(new Table([
            [{ text: 'REPORTE    Desde ' + this.fechaDesde + '  Hasta ' + this.fechaHasta, fillColor: '#1d1d24', color: '#fff' }]
          ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);

          pdf.add(new Txt('\n').end);

          // cuerpo del reporte
          pdf.add(new Table([
            [{ text: 'Socio', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Nombres', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Barrio', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Descripción', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Cancelada', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Total', fillColor: '#1d1d24', color: '#fff' }]
          ]).bold().alignment('center').fontSize(10).widths(['11%', '40%', '14%', '14%', '11%', '10%']).end);

          let subtotal = '0';
          let total = '0';
          let totalmultas = '0';
          let totalmaterial = '0';
          let totalconexion = '0';
          let totalmedidornuevo = '0';
          let totaltraspaso = '0';

          for (let i = 0; i < res.length; i++) {
            subtotal = (parseFloat(subtotal) + parseFloat(res[i].neto_prefac)).toFixed(2);
            total = (parseFloat(total) + parseFloat(res[i].valorpagado_mul)).toFixed(2);

            if (res[i].tipo_mul == 'MULTA') {
              totalmultas = (parseFloat(totalmultas) + parseFloat(res[i].valorpagado_mul)).toFixed(2);
            } else if (res[i].tipo_mul == 'CONEXION') {
              totalconexion = (parseFloat(totalconexion) + parseFloat(res[i].valorpagado_mul)).toFixed(2);
            } else if (res[i].tipo_mul == 'MATERIAL') {
              totalmaterial = (parseFloat(totalmaterial) + parseFloat(res[i].valorpagado_mul)).toFixed(2);
            } else if (res[i].tipo_mul == 'MEDIDOR NUEVO') {
              totalmedidornuevo = (parseFloat(totalmedidornuevo) + parseFloat(res[i].valorpagado_mul)).toFixed(2);
            }else if(res[i].tipo_mul == 'TRASPASO'){
              totaltraspaso = (parseFloat(totaltraspaso) + parseFloat(res[i].valorpagado_mul)).toFixed(2);

            }

            pdf.add(new Table([
              [res[i].id_cli,
              { text: res[i].nombres_cli + ' ' + res[i].apellidos_cli },
              { text: res[i].direccion_cli },
              { text: res[i].descripcion_mul },
              { text: res[i].cancelada_mul },
              { text: res[i].valorpagado_mul + ' $' }]
            ]).bold().alignment('center').fontSize(9).widths(['11%', '40%', '14%', '14%', '11%', '10%']).end);
          }

          pdf.add(new Txt('\n\n').end);

          pdf.add(new Table([
            [{ text: 'Valor recaudado en multas', fillColor: '#1d1d24', color: '#fff' },
            { text: totalmultas + ' $' }],
            [{ text: 'Valor recaudado en conexiones nuevas', fillColor: '#1d1d24', color: '#fff' },
            { text: totalconexion + ' $' }],
            [{ text: 'Valor recaudado en materiales', fillColor: '#1d1d24', color: '#fff' },
            { text: totalmaterial + ' $' }],
            [{ text: 'Valor recaudado en traspasos', fillColor: '#1d1d24', color: '#fff' },
            { text: totaltraspaso + ' $' }],
            [{ text: 'Valor recaudado en medidor nuevo', fillColor: '#1d1d24', color: '#fff' },
            { text: totalmedidornuevo + ' $' }],
          ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

          // valores del reporte
          pdf.add(new Txt('\n\n').end);
          pdf.add(new Table([
            [{ text: 'Facturas Generadas', fillColor: '#1d1d24', color: '#fff' },
            { text: res.length, fillColor: '#4EB222' }],
            [{ text: 'Total Recaudado', fillColor: '#1d1d24', color: '#fff' },
            { text: total + ' $' , fillColor: '#4EB222'}],
          ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

          // [ { text: 'Valor sin Fondo Social', fillColor: '#1d1d24', color: '#fff'},
          //     { text: subtotal + ' $'} ],
          //   [ { text: 'Fondo Social', fillColor: '#1d1d24', color: '#fff'},
          //     { text: (parseFloat(total) - parseFloat(subtotal)).toFixed(2) + ' $'} ],

          // Fin de la factura
          pdf.create().open();

        } else {
          this.toastWarning("No hemos podido encontrar registros para la fecha seleccionada, por favor verifique e intentelo nuevamente");
        }

      });
    }

  }

  valorespendientes(){
    this._multa.getmultapediente().subscribe(res=>{
      
      if (res.length) {
        const pdf = new PdfMakeWrapper();

        pdf.info({
          title: 'REPORTE Valores Pendientes '
        });

        // titulo del reporte
        pdf.add(new Table([
          [{ text: 'REPORTE    Desde ' + this.fechaDesde + '  Hasta ' + this.fechaHasta, fillColor: '#1d1d24', color: '#fff' }]
        ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);

        pdf.add(new Txt('\n').end);

        // cuerpo del reporte
        pdf.add(new Table([
          [{ text: 'Socio', fillColor: '#1d1d24', color: '#fff' },
          { text: 'Nombres', fillColor: '#1d1d24', color: '#fff' },
          { text: 'Barrio', fillColor: '#1d1d24', color: '#fff' },
          { text: 'Descripción', fillColor: '#1d1d24', color: '#fff' },
          { text: 'Cancelada', fillColor: '#1d1d24', color: '#fff' },
          { text: 'Total', fillColor: '#1d1d24', color: '#fff' }]
        ]).bold().alignment('center').fontSize(10).widths(['11%', '40%', '14%', '14%', '11%', '10%']).end);

        let total = '0';
        let totalmultas = '0';
        let totalmaterial = '0';
        let totalconexion = '0';
        let totalmedidornuevo = '0';

        for (let i = 0; i < res.length; i++) {
          total = (parseFloat(total) + parseFloat(res[i].saldo_mul)).toFixed(2);

          if (res[i].tipo_mul == 'MULTA') {
            totalmultas = (parseFloat(totalmultas) + parseFloat(res[i].saldo_mul)).toFixed(2);
          } else if (res[i].tipo_mul == 'CONEXION') {
            totalconexion = (parseFloat(totalconexion) + parseFloat(res[i].saldo_mul)).toFixed(2);
          } else if (res[i].tipo_mul == 'MATERIAL') {
            totalmaterial = (parseFloat(totalmaterial) + parseFloat(res[i].saldo_mul)).toFixed(2);
          } else if (res[i].tipo_mul == 'MEDIDOR NUEVO') {
            totalmedidornuevo = (parseFloat(totalmedidornuevo) + parseFloat(res[i].saldo_mul)).toFixed(2);
          }

          pdf.add(new Table([
            [res[i].id_cli,
            { text: res[i].nombres_cli + ' ' + res[i].apellidos_cli },
            { text: res[i].direccion_cli },
            { text: res[i].descripcion_mul },
            { text: res[i].cancelada_mul },
            { text: res[i].saldo_mul + ' $' }]
          ]).bold().alignment('center').fontSize(9).widths(['11%', '40%', '14%', '14%', '11%', '10%']).end);
        }

        pdf.add(new Txt('\n\n').end);

        pdf.add(new Table([
          [{ text: 'Valor por cobrar en multas', fillColor: '#1d1d24', color: '#fff' },
          { text: totalmultas + ' $' }],
          [{ text: 'Valor por cobrar en conexiones nuevas', fillColor: '#1d1d24', color: '#fff' },
          { text: totalconexion + ' $' }],
          [{ text: 'Valor por cobrar en materiales', fillColor: '#1d1d24', color: '#fff' },
          { text: totalmaterial + ' $' }],
          [{ text: 'Valor por cobrar en medidor nuevo', fillColor: '#1d1d24', color: '#fff' },
          { text: totalmedidornuevo + ' $' }],
        ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

        // valores del reporte
        pdf.add(new Txt('\n\n').end);
        pdf.add(new Table([
          [{ text: 'Total Deudores', fillColor: '#1d1d24', color: '#fff' },
          { text: res.length, fillColor: '#DA1717' }],
          [{ text: 'Total Por Recaudar', fillColor: '#1d1d24', color: '#fff' },
          { text: total + ' $' , fillColor: '#DA1717'}],
        ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

        // [ { text: 'Valor sin Fondo Social', fillColor: '#1d1d24', color: '#fff'},
        //     { text: subtotal + ' $'} ],
        //   [ { text: 'Fondo Social', fillColor: '#1d1d24', color: '#fff'},
        //     { text: (parseFloat(total) - parseFloat(subtotal)).toFixed(2) + ' $'} ],

        // Fin de la factura
        pdf.create().open();

      } else {
        this.toastWarning("No hemos podido encontrar registros para la fecha seleccionada, por favor verifique e intentelo nuevamente");
      }
      
    });
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
