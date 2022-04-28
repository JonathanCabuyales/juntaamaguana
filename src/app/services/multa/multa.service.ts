import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MultaService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(){
    this.resultado = this.http.get(`${this.baseUrl}/multas/multa_general_get.php`);
    return this.resultado;
  }

  getmultaconexion(socio: any){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_get.php`, JSON.stringify(socio));
    return this.resultado;
  }

  createMultaconexion(multaconexion: any){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_insert.php`, JSON.stringify(multaconexion));
    return this.resultado;
  }

  createMulta(multaconexion){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_insert.php`, JSON.stringify(multaconexion));
    return this.resultado;
  }

  updateMultaConexion(socio: any){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_update_campos.php`, JSON.stringify(socio));
    return this.resultado;
  }

  updateCobro(socio: any){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_update.php`, JSON.stringify(socio));
    return this.resultado;
  }

  getreportefecha(fechadesde: any, fechahasta: any){
    this.resultado = this.http.get(`${this.baseUrl}/multas/multa_fecha_get.php?fechadesde=${fechadesde}&fechahasta=${fechahasta}`);
    return this.resultado;
  }

  getmultapediente(){
    this.resultado = this.http.get(`${this.baseUrl}/multas/multa_pendiente_get.php`);
    return this.resultado;
  }

  getMultas(numerosocio: any){
    this.resultado = this.http.post(`${this.baseUrl}/multas/multa_get.php`, JSON.stringify(numerosocio));
    return this.resultado;
  }

}
