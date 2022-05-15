import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { PrefacturaService } from 'src/app/services/prefactura.service';
import * as XLSX from 'xlsx';

import { FacturaelectronicaService } from '../../services/facturaelectronica/facturaelectronica.service';

declare var obtenerComprobanteFirmado_sri: any;

@Component({
  selector: 'app-generar-facturas',
  templateUrl: './generar-facturas.component.html',
  styleUrls: ['./generar-facturas.component.css']
})
export class GenerarFacturasComponent implements OnInit {

  
  displayedColumns: string[] = ['id_prefac', 'Idcliente', 'cedula', 'nombre', 'valor', 'Acciones'];
  dataSource: MatTableDataSource<any[]>;

  mostrarTrabla: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  file: File;
  arrayBuffer: any;
  fileList: any;

  arregloFacturas: any[] = [];
  subirPrefacArr: any[] =[];

  fechaDesde: any = '';
  fechaHasta: any = '';
  enviarFacturaInsert: any = {};

  valorChecked: any;

  constructor(
    private _prefactura: PrefacturaService,
    private _felectronica: FacturaelectronicaService,
  ) {}

  ngOnInit(): void {}

  traerFacturasGeneradas(){
    this.mostrarTrabla = true;
    this._prefactura.getReportePrefactura(this.fechaDesde, this.fechaHasta)
    .subscribe((resp) =>{ 
      console.log(resp);
      this.arregloFacturas = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator
    });

    
    
  }

  cambioArchivo(evento: any){
    this.file = evento.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) =>{
      this.arrayBuffer = fileReader.result;
      let data = new Uint8Array(this.arrayBuffer);
      let arr = new Array();
      for(let i=0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join("");
      let workbook = XLSX.read(bstr, {type: 'binary'});
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet, {raw: true}));
      let arralist =  XLSX.utils.sheet_to_json(worksheet, {raw: true});
      this.fileList = arralist;
      
      
      
    }
    
    
  }

  cambioValor(prefactura: any, ){
    console.log(prefactura);
    // this.arregloFacturas.push(prefactura);
  }

  seleccionar(filas: any){

    this._felectronica.getFacturaGenerada()
    .subscribe((respXML) =>{
      this.enviarFacturaInsert = {};
        console.log(respXML);
        
        this.enviarFacturaInsert = {
          ...filas,
          servicios_prefac: JSON.stringify(filas.servicios_prefac),
          estado: 'PENDIENTE',
          generada_prefac: "0",
          secuencial: (respXML.data.length === 0) ? 1000 : parseInt(respXML.data[0].secuencial) + 1
        };

        if((filas.ciruc_cli) === '1700000000'){
           this.enviarFacturaInsert.tipoIdentificacionComprador = '07';
           this.enviarFacturaInsert.ciruc_cliente = '9999999999';
           this.enviarFacturaInsert.cliente_tipo = 'CONSUMIDOR FINAL'
         }else if(parseInt(filas.ciruc_cli).toString().length === 10){
           this.enviarFacturaInsert.tipoIdentificacionComprador = '05';
           this.enviarFacturaInsert.cliente = filas.nombres_cli + " " + filas.apellidos_cli;
           this.enviarFacturaInsert.ciruc_cliente = filas.ciruc_cli;
           this.enviarFacturaInsert.cliente_tipo = filas.nombres_cli + " " + filas.apellidos_cli;
           
           
         }else{
           this.enviarFacturaInsert.tipoIdentificacionComprador = '04';
           this.enviarFacturaInsert.cliente = filas.nombres_cli + " " + filas.apellidos_cli;
           this.enviarFacturaInsert.ciruc_cliente = filas.ciruc_cli;
           this.enviarFacturaInsert.cliente_tipo = filas.nombres_cli + " " + filas.apellidos_cli;
           
         }
 
         if(filas.email_cli == '1@hotmail.com'){
           this.enviarFacturaInsert.email_cli = 'jaapsa17@hotmail.com';
 
         }else{
           this.enviarFacturaInsert.email_cli = filas.email_cli;
         }
          this._felectronica.createFactura(this.enviarFacturaInsert)
          .subscribe((resp) =>{
            console.log(resp);
            this.enviarFacturaInsert.claveacceso = resp.claveacceso;
            this._felectronica.insertFactura(this.enviarFacturaInsert)
            .subscribe((respSQL) =>{
              console.log(respSQL);
              
                let ruta_certificado = "http://localhost/libreria_2021/JOSE GERARDO GUALOTUNA LLUMIQUINGA 270422083105.p12";
                // let pwd_p12 = "Caizad2021";
                let pwd_p12 = "junta123";
                let ruta_respuesta = "http://localhost/libreria_2021/example.php";
                let ruta_factura = "http://localhost/libreria_2021/xmlgenerados/"+resp.claveacceso+".xml";
                let secuencial = (respXML.data.length === 0) ? 1000 : parseInt(respXML.data[0].secuencial) + 1;  
                obtenerComprobanteFirmado_sri(ruta_certificado, pwd_p12, ruta_respuesta, ruta_factura, resp.claveacceso, secuencial, filas.id_prefac);
                this._felectronica.updateFactura(resp.claveacceso, filas.id_prefac)
                .subscribe((respuestUpdated) =>{
                  console.log(respuestUpdated);
                  this.traerFacturasGeneradas();
                });
            });
            
          });
          
          
          
          console.log(this.enviarFacturaInsert);
          
          
        
      })

  }

}
