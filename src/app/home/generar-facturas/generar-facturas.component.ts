import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-generar-facturas',
  templateUrl: './generar-facturas.component.html',
  styleUrls: ['./generar-facturas.component.css']
})
export class GenerarFacturasComponent implements OnInit {

  file: File;
  arrayBuffer: any;
  fileList: any;

  constructor() { }

  ngOnInit(): void {
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

}
