import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ExcelService } from 'src/app/services/excel.service';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogreportes',
  templateUrl: './dialogreportes.component.html',
  styleUrls: ['./dialogreportes.component.css']
})
export class DialogreportesComponent implements OnInit {

  fechaDesde: string = '';
  fechaHasta: string = '';

  constructor(private _prefactura: PrefacturaService,
    private toastr: ToastrService,
    private _excel: ExcelService) { }

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
      this._prefactura.getReportePrefactura(this.fechaDesde, this.fechaHasta).subscribe(res => {

        console.log(res);


        if (res.length) {
          const pdf = new PdfMakeWrapper();

          // margen del PDF
          // izquierda, arriba, derecha, abajo
          pdf.pageMargins([10, 20, 10, 10]);

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
            { text: 'Fondo S.', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Interes', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Subtotal', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Total', fillColor: '#1d1d24', color: '#fff' }]
          ]).bold().alignment('center').fontSize(10).widths(['9%', '40%', '12%', '12%', '7%' ,'10%', '10%']).end);

          let subtotal = '0';
          let total = '0';
          let fondosocial = '0.00';
          let interes  = '0.00';

          for (let i = 0; i < res.length; i++) {
            subtotal = (parseFloat(subtotal) + parseFloat(res[i].neto_prefac)).toFixed(2);
            total = (parseFloat(total) + parseFloat(res[i].total_prefac)).toFixed(2);
            fondosocial = (parseFloat(fondosocial) + parseFloat(res[i].fondosocial_prefac)).toFixed(2);
            interes = (parseFloat(interes) + parseFloat(res[i].interes_prefac)).toFixed(2);

            pdf.add(new Table([
              [res[i].id_cli,
              { text: res[i].nombres_cli + ' ' + res[i].apellidos_cli },
              { text: res[i].direccion_cli },
              { text: res[i].fondosocial_prefac },
              { text: res[i].interes_prefac + ' $' },
              { text: res[i].neto_prefac + ' $' },
              { text: res[i].total_prefac  + ' $' }]
            ]).bold().alignment('center').fontSize(9).widths(['9%', '40%', '12%', '12%', '7%' ,'10%', '10%']).end);
          }

          // valores del reporte
          pdf.add(new Txt('\n\n').end);
          pdf.add(new Table([
            [{ text: 'Facturas Generadas', fillColor: '#1d1d24', color: '#fff' },
            { text: res.length }],
            [{ text: 'Valor sin Fondo Social', fillColor: '#1d1d24', color: '#fff' },
            { text: subtotal + ' $' }],
            [{ text: 'Fondo Social', fillColor: '#1d1d24', color: '#fff' },
            { text: fondosocial + ' $' }],
            [{ text: 'Intereses Cobrados', fillColor: '#1d1d24', color: '#fff' },
            { text: interes + ' $' }],
            [{ text: 'Total Recaudado', fillColor: '#1d1d24', color: '#fff' },
            { text: total + ' $' }],
          ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

          // Fin de la factura
          pdf.create().open();

        } else {
          this.toastWarning("No hemos podido encontrar registros para la fecha seleccionada, por favor verifique e intentelo nuevamente");
        }

      });
    }
  }

  reporteExcel(){

    if (this.fechaDesde == '' || this.fechaHasta == '') {

      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar un rango de fechas para continuar'
      });

    } else {
      this._prefactura.getReportePrefactura(this.fechaDesde, this.fechaHasta).subscribe(res => {

        console.log(res);

        this._excel.exportToExcel(res, 'ventas_' + this.fechaHasta);
      });
    }
  }

  reporteExcelAtrasados(){
    this._prefactura.getAll().subscribe(res => {

      console.log(res);

      // this._excel.exportToExcel(res, 'Atrasos_' + this.fechaHasta);

      const pdf = new PdfMakeWrapper();

          // margen del PDF
          // izquierda, arriba, derecha, abajo
          pdf.pageMargins([10, 20, 10, 10]);

          pdf.info({
            title: 'SOCIOS ATRASADOS'
          });

          // titulo del reporte
          pdf.add(new Table([
            [{ text: 'SOCIOS ATRASADOS', fillColor: '#C82722', color: '#fff' }]
          ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);

          pdf.add(new Txt('\n').end);

          // cuerpo del reporte
          pdf.add(new Table([
            [{ text: 'Socio', fillColor: '#C82722', color: '#fff' },
            { text: 'Nombres', fillColor: '#C82722', color: '#fff' },
            { text: 'Barrio', fillColor: '#C82722', color: '#fff' },
            { text: 'Atraso', fillColor: '#C82722', color: '#fff' },
            { text: 'F.S.', fillColor: '#C82722', color: '#fff' },
            { text: 'Interes', fillColor: '#C82722', color: '#fff' },
            { text: 'Subtotal', fillColor: '#C82722', color: '#fff' },
            { text: 'Total', fillColor: '#C82722', color: '#fff' }]
          ]).bold().alignment('center').fontSize(10).widths(['9%', '40%', '12%', '6%', '6%', '7%' ,'10%', '10%']).end);

          let subtotal = '0';
          let total = '0';
          let fondosocial = '0.00';
          let interes  = '0.00';

          for (let i = 0; i < res.length; i++) {
            subtotal = (parseFloat(subtotal) + parseFloat(res[i].neto_prefac)).toFixed(2);
            total = (parseFloat(total) + parseFloat(res[i].total_prefac)).toFixed(2);
            fondosocial = (parseFloat(fondosocial) + parseFloat(res[i].fondosocial_prefac)).toFixed(2);
            interes = (parseFloat(interes) + parseFloat(res[i].interes_prefac)).toFixed(2);

            pdf.add(new Table([
              [res[i].id_cli,
              { text: res[i].nombres_cli + ' ' + res[i].apellidos_cli },
              { text: res[i].direccion_cli },
              { text: res[i].mesesatraso_prefac },
              { text: parseFloat(res[i].fondosocial_prefac).toFixed(2) + ' $'},
              { text: res[i].interes_prefac + ' $' },
              { text: res[i].neto_prefac + ' $' },
              { text: res[i].total_prefac  + ' $' }]
            ]).bold().alignment('center').fontSize(9).widths(['9%', '40%', '12%', '6%','6%', '7%' ,'10%', '10%']).end);
          }

          // valores del reporte
          pdf.add(new Txt('\n\n').end);
          pdf.add(new Table([
            [{ text: 'Facturas Por Reacudar', fillColor: '#C82722', color: '#fff' },
            { text: res.length }],
            // [{ text: 'Valor sin Fondo Social', fillColor: '#C82722', color: '#fff' },
            // { text: subtotal + ' $' }],
            [{ text: 'Fondo Social', fillColor: '#C82722', color: '#fff' },
            { text: fondosocial + ' $' }],
            // [{ text: 'Intereses Por Recaudar', fillColor: '#C82722', color: '#fff' },
            // { text: interes + ' $' }],
            [{ text: 'Total Por Recaudar', fillColor: '#C82722', color: '#fff' },
            { text: total + ' $' }],
          ]).bold().alignment('center').fontSize(12).widths(['50%', '50%']).end);

          // Fin de la factura
          pdf.create().open();

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

  facturasGeneradas(){
    console.log('generar facturas');
    
  }

}
