import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioI } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioserService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAllEmpleados(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_get.php?token=${token}`);
    return this.resultado;
  }

  getEmpeladosValidos(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_validos_get.php?token=${token}`);
    return this.resultado;
  }

  getVerificarDocumentos(id_usuario: any){
    this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_verificar_documentos.php?id_usuario=${id_usuario}`);
    return this.resultado;
  }

  createEmpleado(usuario: UsuarioI){
    this.resultado = this.http.post(`${this.baseUrl}/empleados/empleados_insert.php`, usuario);
    return this.resultado;
  }

  deleteEmpleado(id: number){
    this.resultado = this.http.get(`${this.baseUrl}/empleados/empleados_delete.php?id_usuario=${id}`);
    return this.resultado;
  }

  updateEmpleado(usuario: UsuarioI){
    this.resultado = this.http.put(`${this.baseUrl}/empleados/empleados_update.php`, JSON.stringify(usuario));
    return this.resultado;
  }
}
