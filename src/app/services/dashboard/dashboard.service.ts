import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getDashboardCobros(){
    this.resultado = this.http.get(`${this.baseUrl}/dashboard/dashboard_cobros.php`);
    return this.resultado;
  }

  getConsumoAgua(){
    this.resultado = this.http.get(`${this.baseUrl}/dashboard/dashboard_agua.php`);
    return this.resultado;
  }

}
