import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioesmeService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(){
    this.resultado = this.http.get(`${this.baseUrl}/esmeraldas/get_inventario.php`);
    return this.resultado;
  }

}