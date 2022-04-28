import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrefacturaI } from '../models/prefatura.interface';

@Injectable({
  providedIn: 'root'
})
export class PrefacturaService {
  
  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_get.php`);
    return this.resultado;
  }

  createPrefactura(prefactura: PrefacturaI){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_insert.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  createPrefacturaValorInicial(prefactura: PrefacturaI){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_app_insert.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  getPrefactura(id_cliente){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_get_one.php`, JSON.stringify(id_cliente));
    return this.resultado;
  }

  cobrarPrefactura(prefactura){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_aprobar.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  getPrefacturaAprobada(id_cliente){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_aprovada_getone.php`, JSON.stringify(id_cliente));
    return this.resultado;
  }

  getReportePrefactura(fechadesde: any, fechahasta: any){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_reportefecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}`);
    return this.resultado;
  }

  getReporteSociosAtrasados(){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_reporteatrasos_get.php`);
    return this.resultado;
  }

  getPrefacturaPorCobrar(){
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_get.php?`);
    return this.resultado;
  }

  getExcel() {
    this.resultado = this.http.get(`${this.baseUrl}/prefactura/prefactura_excel.php?`);
    return this.resultado;
  }


  updatePrefactura(prefactura){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_app_update.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  getFacturaAtrasada(numerosocio: any){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_appatraso_get.php`, JSON.stringify(numerosocio));
    return this.resultado;
  }

  deletePrefactura(id_prefac: any){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_delete.php`, JSON.stringify(id_prefac));
    return this.resultado;
  }

  updatePrefacturaConvenio(prefactura){
    this.resultado = this.http.post(`${this.baseUrl}/prefactura/prefactura_convenio_create.php`, JSON.stringify(prefactura));
    return this.resultado;
  }

  
}