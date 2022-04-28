import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ClienteserService } from 'src/app/services/clienteser.service';

@Component({
  selector: 'app-dialogclientesreporte',
  templateUrl: './dialogclientesreporte.component.html',
  styleUrls: ['./dialogclientesreporte.component.css']
})
export class DialogclientesreporteComponent implements OnInit {

  constructor(private _clientes: ClienteserService) { }

  ngOnInit(): void {
  }

  pdfClienet(barrio: string){

    this._clientes.getclientebarrios(barrio).subscribe(res=>{
      const pdf = new PdfMakeWrapper();

          pdf.info({
            title: 'Socios '
          });

          // titulo del reporte
          pdf.add(new Table([
            [{ text: 'REPORTE SOCIOS ', fillColor: '#1d1d24', color: '#fff' }]
          ]).layout('noBorders').alignment('center').fontSize(14).widths(['100%']).end);

          pdf.add(new Txt('\n').end);

          pdf.add(new Table([
            [{ text: '#', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Socio', fillColor: '#1d1d24', color: '#fff' },
            { text: 'Barrio', fillColor: '#1d1d24', color: '#fff' },
            { text: '', fillColor: '#1d1d24', color: '#fff' }]
          ]).bold().alignment('center').fontSize(10).widths(['20%', '40%', '20%', '20%']).end);

          for (let i = 0; i < res.length; i++) {
            
            pdf.add(new Table([
              [{ text: res[i].id_cli, fillColor: '#fff', color: '#1d1d24' },
              { text: res[i].nombres_cli + ' ' + res[i].apellidos_cli, fillColor: '#fff', color: '#1d1d24' },
              { text: res[i].direccion_cli, fillColor: '#fff', color: '#1d1d24' },
              { text: '', fillColor: '#fff', color: '#1d1d24' }]
            ]).bold().alignment('center').fontSize(10).widths(['20%', '40%', '20%', '20%']).end);

          }

          pdf.add(new Txt('\n').end);

          pdf.add(new Table([
            [{ text: 'Total Socios', fillColor: '#1d1d24', color: '#fff' },
            { text: res.length, fillColor: '#fff', color: '#1d1d24' }]
          ]).bold().alignment('center').fontSize(10).widths(['50%', '50%']).end);

          pdf.create().open();

    });
    
  }

}