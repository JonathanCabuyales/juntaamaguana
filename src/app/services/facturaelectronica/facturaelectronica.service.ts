import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

// Variable para llamar a la funcion;
declare var obtenerComprobanteFirmado_sri: any;

@Injectable({
  providedIn: 'root'
})
export class FacturaelectronicaService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  // la ruta es distinta para la facturacion electronica o la puedes cambiar moviendo la carpeta libreria_2021
  
  createFactura(prefactura: any){
    // console.log(id_prefactura);
    
    this.resultado = this.http.post(`http://localhost/libreria_2021/generar_xml.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  createXML(prefactura: any){
    this.resultado = this.http.post(`http://localhost/libreria_2021/generar_factura_xml.php`, JSON.stringify(prefactura));
    return this.resultado;
  }


  insertFactura(prefactura: any){
    this.resultado = this.http.post(`${this.baseUrl}/factura/factura_insert.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  updateFactura(claveacceso: any, id_prefac: any){
    this.resultado = this.http.get(`${this.baseUrl}/factura/factura_update_clave.php?claveacceso=${claveacceso}&id=${id_prefac}`);
    return this.resultado;
  }

  getFacturaGenerada(){
    this.resultado = this.http.get(`${this.baseUrl}/factura/get_factura.php`);
    return this.resultado;
  }

}
