import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getLectura(id_med: any){
    this.resultado = this.http.post(`${this.baseUrl}/lecturas/lectura_get.php`, JSON.stringify(id_med));
    return this.resultado;
  }

  
  getLecturasCliente(id_med: any){
    this.resultado = this.http.post(`${this.baseUrl}/lecturas/lecturas_cliente_get.php`, JSON.stringify(id_med));
    return this.resultado;
  }

  actualizarLectura(data: any){
    this.resultado = this.http.post(`${this.baseUrl}/lecturas/lectura_edit.php`, JSON.stringify(data));
    return this.resultado;
  }

  getLecturasMensuales() {
    this.resultado = this.http.get(`${this.baseUrl}/lecturas/lectura_mensual_get.php`);
    return this.resultado;
  }

  createLectura(lectura){
    this.resultado = this.http.post(`${this.baseUrl}/lecturas/lectura_insert.php`, JSON.stringify(lectura));
    return this.resultado;
  }

}
