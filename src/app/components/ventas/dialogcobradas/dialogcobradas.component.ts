import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Columns, Img, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { LecturaService } from 'src/app/services/lecturas/lectura.service';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcobradas',
  templateUrl: './dialogcobradas.component.html',
  styleUrls: ['./dialogcobradas.component.css']
})
export class DialogcobradasComponent implements OnInit {

  displayedColumns: string[] = ['socio', 'nombres', 'ciruc', 'barrio', 'facturado', 'fechapago', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  socio = '';
  listasocio: any[];
  fondoSocial: number = 0.50;

  listapre: any[];

  constructor(private _prefactura: PrefacturaService,
    private toastr: ToastrService,
    private _lectura: LecturaService,
    private db: BdemapaService) { }

  ngOnInit(): void {
  }

  excel() {
    this._prefactura.getExcel().subscribe(res => {
      this.listapre = res;
      this.db.exportToExcel(this.listapre, "prefacturas");
    });
  }

  buscarSocio() {

    if (this.socio == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de socio para continuar'
      });
    } else {

      this._prefactura.getPrefacturaAprobada(this.socio).subscribe(res => {
        if (res) {
          this.listasocio = res;

          for (let i = 0; i < this.listasocio.length; i++) {
            this.listasocio[i].servicios_prefac = JSON.parse(this.listasocio[i].servicios_prefac);
          }
          
          this.dataSource = new MatTableDataSource(this.listasocio);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toastError('El socio no registra valores pagos');
        }
      });
    }
  }

  async factura(prefactura) {

    // cambiale cuando se guarda el dato para añadir las lecturas y consumo....

    this._lectura.getLectura(prefactura.id_cli).subscribe(async res => {
      
      if (res.length) {
        // let items = JSON.parse(prefactura.servicios_prefac);
        let items = prefactura.servicios_prefac;

        let totalItems = [];
        for (let i = 0; i < items.length; i++) {
          totalItems[i] = items[i];
        }
        const pdf = new PdfMakeWrapper();

        pdf.info({
          title: 'FACTURA_ELECTRONICA' + prefactura.nombres_cli + ' ' + prefactura.apellidos_cli
        });

        // orientacion pdf
        pdf.pageOrientation('landscape');

        // margen del PDF
        // izquierda, arriba, derecha, abajo
        pdf.pageMargins([10, 20, 10, 0]);

        pdf.add((await new Img('../../../assets/img/sin_imagen.png').relativePosition(90, 130).height('130').width('130').build()));
        pdf.add(new Columns(['', new Txt('PREFACTURA 000000000000000\n\n').fontSize(16).color('red').width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('NUMERO DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('00000000000000000000000000000\n\n').bold().fontSize(9).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('FECHA Y HORA DE AUTORIZACION').bold().fontSize(10).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('' + '\n').bold().fontSize(9).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('AMBIENTE: ' + 'Produccion').fontSize(9).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('EMISION: ' + 'Normal\n\n').fontSize(9).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('CLAVE DE ACCESO: ').bold().fontSize(9).width('40%').end]).end);
        pdf.add(new Columns(['', new Txt('0000000000000000000000000000000000000000000000').fontSize(9).width('40%').end]).end);
        pdf.add(new Txt('\n').end);
        pdf.add(new Columns(['', new Txt('JUNTA ADMINISTRADORA DE AGUA POTABLE Y SANEAMIENTO DE SAN JUAN DE AMAGUAÑA\n\n').alignment('center').bold().fontSize(11).width('50%').end]).end);
        pdf.add(new Columns(['', new Txt('Dirección: San Juan de la Cruz Ricardo Alvarez S3-51 Y Nela Martínez').alignment('center').fontSize(9).width('50%').end]).end);
        pdf.add(new Columns(['', new Txt('Tel: Oficina: 0992155576 operador: 0962871530 / 3821791').alignment('center').fontSize(9).width('50%').end]).end);
        pdf.add(new Columns(['', new Txt('\nQUITO - AMAGUAÑA - ECUADOR ').alignment('center').fontSize(9).width('50%').end]).end);
        pdf.add(new Txt('\n').end);

        pdf.add(new Table([
          ['', '', new Columns(
            ['\nRazon Social: ' + prefactura.nombres_cli + ' ' + prefactura.apellidos_cli + "\n\n" +
              'email: ' + prefactura.email_cli + '\n\n',

            '\nCI / RUC: ' + prefactura.ciruc_cli + "\n\n" + "Telefono: " + prefactura.telefono_cli + '\n\n',

            '\nDirección: ' + prefactura.direccion_cli + "\n\n" + "Fecha Pago: " + prefactura.fechapago_prefac]).end]
        ]).bold().alignment('center').layout('noBorders').widths(['25%', '25%', '50%']).fontSize(10).end);

        pdf.add(new Columns(['',
          [new Table([
            [{ text: 'Cantidad', fillColor: '#1d1d24', color: '#fff' }, 
            { text: 'Descripción', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Precio U', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Consumo', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Desct', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Subtotal', fillColor: '#1d1d24', color: '#fff' }]
          ]).widths(['12%', '43%', '11%', '12%', '11%', '11%']).alignment('center').layout('lightHorizontalLines').fontSize(9).end]
        ]).bold().alignment('center').width('50%').fontSize(10).end);

        for (let i = 0; i < items.length; i++) {

          pdf.add(new Columns(['',
            [new Table([
              [{text: 1}, 
              { text: items[i].categoria_proser + " " + items[i].descripcion_proser },
              { text: items[i].precio_proser },
              { text: 0 },
              { text: 0},
              { text: (parseFloat(prefactura.neto_prefac)) }]
            ]).widths(['12%', '43%', '11%', '12%', '11%', '11%']).fontSize(9).end]
          ]).bold().alignment('center').width('50%').fontSize(10).end);

        }
        
        let subtotal = 0;
        for (let i = 0; i < items.length; i++) {
          subtotal += parseFloat(items[i].precio_proser);
        }

        pdf.add(new Columns(['', new Table([
          [new Columns(['', '\n\nMedidor Número' + "\n" +
            "Lectura Pasada" + "\n" +
            "Lectura Actual" + "\n" +
            "Consumo m3" + "\n" +
            "Meses Deuda" + "\n" +
            "Total Factura",
            '\n\n171231234' + '\n' +
            res[0].lecturaant_lec + '\n' +
            res[0].lecturaact_lec + '\n' +
            res[0].consumo_lec + '\n' +
            '0' + '\n' +
            (parseFloat(prefactura.neto_prefac) + parseFloat(prefactura.fondosocial_prefac) + 
            parseFloat(prefactura.interes_prefac)).toFixed(2), '']).alignment('left').end,
          new Txt('\nSub 12%' + "\n" +
            'Sub 0%' + "\n\n" +
            'IVA 12%' + "\n\n" +
            'Interes' + "\n\n" +
            'Fondo Social' + "\n\n" +
            'Total Factura').bold().end, '\n0.00' + "\n" +
            prefactura.neto_prefac + "\n\n" +
            '0.00' + "\n\n" +
            prefactura.interes_prefac + "\n\n" +
            (prefactura.fondosocial_prefac) + "\n\n" +
          (parseFloat(prefactura.neto_prefac) + parseFloat(prefactura.fondosocial_prefac) + 
          parseFloat(prefactura.interes_prefac)).toFixed(2)]
        ]).alignment('center').fontSize(10).end]).fontSize(9).width('50%').end);

        // .widths(['35%', '12%', '5%'])


        // Fin de la factura
        pdf.create().open();
      } else {
        this.toastWarning("No hemos podido crear la factura por favor intetalo más tarde");
      }
    });
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
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
